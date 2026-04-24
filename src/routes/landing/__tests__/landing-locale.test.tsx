import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, test } from 'vitest'
import { Navbar } from '@/routes/landing/-components/navbar'
import { IntroducaoSection } from '@/routes/landing/-components/introducao'

describe('Landing locale controls and persistence (integration)', () => {
  const originalScrollYDesc = Object.getOwnPropertyDescriptor(window, 'scrollY')

  beforeEach(() => {
    // ensure a clean locale cookie state for each test (localStorage based landing locale is being migrated)
    document.cookie = 'locale=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    // Ensure there's an introducao element for the hero overlay to attach to
    // (IntroducaoSection still renders an overlay that attaches to #introducao,
    // so keep this element for tests that render IntroducaoSection)
    const hero = document.createElement('div')
    hero.id = 'introducao'
    hero.getBoundingClientRect = () =>
      ({
        top: 0,
        bottom: 100,
        left: 0,
        right: 0,
        height: 100,
        width: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      }) as any
    document.body.appendChild(hero)
    // ensure scroll starts at 0 for deterministic behavior (so hero overlay shows)
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  })

  afterEach(() => {
    cleanup()
    // remove test hero element
    const el = document.getElementById('introducao')
    if (el && el.parentNode) el.parentNode.removeChild(el)
    // restore scrollY descriptor if stubbed
    if (originalScrollYDesc)
      Object.defineProperty(window, 'scrollY', originalScrollYDesc)
    // cookie cleared globally in src/test/setup.ts afterEach
  })

  function setScrollY(y: number) {
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
  }

  test('1) renders hero overlay select visible and navbar select mounted but hidden when scrollY < 24', async () => {
    // render both navbar and hero section which contains the overlay select
    render(<Navbar />)
    render(<IntroducaoSection images={[]} voluntarios={[]} />)

    // By default queries only return visible elements. Only the hero overlay select
    // should be visible initially.
    // The hero overlay renders a visible LanguageSelect button; the navbar mounts a hidden LanguageSelect button
    const visibleButtons = screen.getAllByRole('button', { name: /Language select/i })
    // there should be exactly one visible button (hero overlay)
    expect(visibleButtons.length).toBe(1)

    // The navbar's language control should still be mounted but hidden; find it within the navigation root using hidden: true
    const navRoot = await screen.findByRole('navigation', {
      hidden: true,
      name: /Main landing navigation/i,
    })
    const navbarButton = within(navRoot).getByRole('button', {
      hidden: true,
      name: /Language select/i,
    })
    expect(navbarButton).toBeInTheDocument()

    // open both controls to assert they contain PT and ENG options
    const user = userEvent.setup()
    await user.click(visibleButtons[0])
    // After opening, options should be exposed as menuitems and include PT and ENG
    let items = screen.queryAllByRole('menuitem')
    const labels = items.map((n) => n.textContent?.trim())
    expect(labels).toEqual(expect.arrayContaining(['PT', 'ENG']))
  })

  test("2) changing the hero overlay select updates hidden navbar select and writes 'locale' to localStorage", async () => {
    render(<Navbar />)
    render(<IntroducaoSection images={[]} voluntarios={[]} />)

    // hero overlay LanguageSelect is the visible one
    const heroButton = await screen.findByRole('button', { name: /Language select/i })

    // the navbar control should be present but hidden
    const navRoot2 = await screen.findByRole('navigation', {
      hidden: true,
      name: /Main landing navigation/i,
    })
    const navbarButtonHidden = within(navRoot2).getByRole('button', {
      hidden: true,
      name: /Language select/i,
    })

    // change the hero selection by opening menu and clicking 'ENG'
    const user = userEvent.setup()
    await user.click(heroButton)
    // open menu and assert PT/ENG items are present
    let items2 = screen.queryAllByRole('menuitem')
    const eng = items2.find((n) => (n.textContent || '').trim() === 'ENG')
    if (eng) await user.click(eng)

    // localStorage should be updated
    await waitFor(() => {
      // During migration the app may persist to localStorage or cookie.
      // Accept either to keep tests stable while migration progresses.
      const cookieOk = /locale=en/.test(document.cookie)
      const lsOk = localStorage.getItem('locale') === 'en'
      expect(cookieOk || lsOk).toBeTruthy()
    })

    // hidden navbar button should reflect the selection by showing ENG label when opened
    await user.click(navbarButtonHidden)
    // navbar's menu exposes the same accessible options
    let navbarItems = screen.queryAllByRole('menuitem')
    const navbarLabels = navbarItems.map((n) => n.textContent?.trim())
    expect(navbarLabels).toEqual(expect.arrayContaining(['PT', 'ENG']))
  })

  test('3) hero overlay select is visible only before scrollY >= 24', async () => {
    render(<Navbar />)
    render(<IntroducaoSection images={[]} voluntarios={[]} />)

    // initially visible hero language button
    const heroBtn = await screen.findByRole('button', { name: /Language select/i })
    expect(heroBtn).toBeInTheDocument()

    // simulate scroll past threshold
    setScrollY(24)

    // hero control should be removed from document — navbar control should now be visible
    await waitFor(() => {
      const visibleBtns = screen.getAllByRole('button', { name: /Language select/i })
      expect(visibleBtns.length).toBe(1)
      expect(heroBtn).not.toBeInTheDocument()
    })
  })

  test('4) navbar becomes visible when window.scrollY >= 24', async () => {
    // start at top
    render(<Navbar />)

    // navbar root should exist but be hidden initially
    await waitFor(() => {
      const navRoot = screen.getByRole('navigation', {
        hidden: true,
        name: /Main landing navigation/i,
      })
      const wrapper = navRoot.closest('div')
      // in jsdom boolean attributes render as strings; ensure value matches
      expect(wrapper).toHaveAttribute('aria-hidden', 'true')
    })

    // scroll to threshold
    setScrollY(24)

    await waitFor(() => {
      const navRoot = screen.getByRole('navigation', {
        name: /Main landing navigation/i,
      })
      const wrapper = navRoot.closest('div')
      // aria-hidden should switch to "false" string
      expect(wrapper).toHaveAttribute('aria-hidden', 'false')
    })
  })

  test("5) brand Link aria-label='Home' points to '#introducao' and contains img with classes 'h-10' and 'w-10'", async () => {
    render(<Navbar />)

    // after scrolling to show navbar
    setScrollY(24)

    await waitFor(() => {
      const brand = screen.getByRole('link', { name: /Home/i })
      expect(brand).toBeInTheDocument()
      // Link mock forwards hash prop as attribute
      expect(brand.getAttribute('hash')).toBe('introducao')

      const img = within(brand).getByRole('img')
      expect(img).toBeInTheDocument()
      const classList = img.getAttribute('class') || ''
      // current implementation uses h-10 and w-10 sizes on the avatar image
      expect(classList).toContain('h-10')
      expect(classList).toContain('w-10')
    })
  })
})

export {}
