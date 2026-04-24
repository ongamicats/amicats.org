import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from '@/routes/landing/-components/navbar'

describe('LandingNavbar (unit) — scroll-threshold behavior', () => {
  const originalScrollYDesc = Object.getOwnPropertyDescriptor(window, 'scrollY')

  afterEach(() => {
    cleanup()
    // remove any test hero element
    const el = document.getElementById('introducao')
    if (el && el.parentNode) el.parentNode.removeChild(el)
    // reset any scroll padding
    document.documentElement.style.scrollPaddingTop = ''
    // restore scrollY descriptor if we stubbed it
    if (originalScrollYDesc)
      Object.defineProperty(window, 'scrollY', originalScrollYDesc)
  })

  function setScrollY(y: number) {
    // Some JSDOM environments don't allow direct assignment to scrollY
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
  }

  test('1) navbar is hidden at initial load when hero is visible', async () => {
    // create a hero element and make it visible via bounding rect
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

    render(<Navbar />)

    // Navbar element is rendered but should be hidden (aria-hidden="true") while hero is visible
    await waitFor(() => {
      const navRoot = screen.getByRole('navigation', {
        hidden: true,
        name: /Main landing navigation/i,
      })
      expect(navRoot).toBeInTheDocument()
      // parent wrapper uses aria-hidden
      const wrapper = navRoot.closest('div')
      expect(wrapper).toHaveAttribute('aria-hidden', 'true')
    })
  })

  test('2) navbar becomes visible when window.scrollY >= 24 and shows new UI elements', async () => {
    // create a hero element that starts visible
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

    render(<Navbar />)

    // ensure navbar root is present but hidden initially
    await waitFor(() => {
      const navRoot = screen.getByRole('navigation', {
        hidden: true,
        name: /Main landing navigation/i,
      })
      expect(navRoot).toBeInTheDocument()
      const wrapper = navRoot.closest('div')
      expect(wrapper).toHaveAttribute('aria-hidden', 'true')
    })

    // Scroll past the threshold
    setScrollY(24)

    // Now navbar should appear and expose the updated UI
    await waitFor(async () => {
      // Now the wrapper should be aria-hidden=false
      const navRoot = screen.getByRole('navigation', {
        name: /Main landing navigation/i,
      })
      const wrapper = navRoot.closest('div')
      expect(wrapper).toHaveAttribute('aria-hidden', 'false')

      // Brand avatar (round) should be present — prefer semantic query by alt text containing 'Amicats'
      expect(screen.getByRole('img', { name: /Amicats/i })).toBeInTheDocument()

      // Nav center links should be present and rendered as links (Link is mocked to <a> and forwards props)
      const centerLinkLabels = [
        'Quem Somos',
        'O Abrigo',
        'Voluntários',
        'Adote',
        'Certificados',
      ]

      // mapping from visible label -> expected hash prop forwarded by the mocked Link
      const expectedHashes: Record<string, string> = {
        'Quem Somos': 'quem-somos',
        'O Abrigo': 'o-abrigo',
        Voluntários: 'voluntarios-section',
        Adote: 'adote',
        Certificados: 'certificados',
      }

      centerLinkLabels.forEach((label) => {
        const link = screen.getByRole('link', {
          name: new RegExp(`^${label}$`, 'i'),
        })
        expect(link).toBeInTheDocument()
        // The Link mock in src/test/setup.ts forwards props to the <a>, so assert on the
        // forwarded attributes rather than the generated href. React will place the
        // `to` and `hash` props as DOM attributes on the mocked anchor.
        expect(link.getAttribute('hash')).toBe(expectedHashes[label])
      })

      // CTA exact label must be present on the right side — mocked Link forwards `to` and `hash` props
      const cta = screen.getByRole('link', { name: 'Comece sua Jornada' })
      expect(cta).toBeInTheDocument()
      expect(cta.getAttribute('to')).toBe('/')
      expect(cta.getAttribute('hash')).toBe('adote')

      // Language toggle must be present as a custom accessible control (button that opens a menu)
      // Because the navbar is now visible, the LanguageSelect button should be queryable normally.
      const navbarRoot = screen.getByRole('navigation', {
        name: /Main landing navigation/i,
      })
      const langButton = within(navbarRoot).getByRole('button', {
        name: /Language select/i,
      })
      expect(langButton).toBeInTheDocument()

      // Clicking the button should open a menu containing both PT and ENG options
      const user = userEvent.setup()
      await user.click(langButton)

      // After opening, the accessible menu must expose menuitems for PT and ENG
      const menuItems = screen.queryAllByRole('menuitem')
      const texts = menuItems.map((n) => n.textContent?.trim())
      expect(texts).toEqual(expect.arrayContaining(['PT', 'ENG']))

      // Selecting the other language should update localStorage
      const other = menuItems.find(
        (n) => n.textContent?.trim() !== (langButton.textContent || '').trim(),
      )
      if (other) {
        await user.click(other)
        await waitFor(() => expect(localStorage.getItem('locale')).toBeTruthy())
      }

      // CTA should be the element immediately left of the language toggle within the right-side container
      const rightSideContainer = cta.parentElement
      expect(rightSideContainer).toBeTruthy()
      const next = cta.nextElementSibling
      expect(next).toBeTruthy()
      // the next sibling (the language toggle wrapper) should contain the language button
      const langBtnInNav = within(next as Element).queryByRole('button', {
        name: /Language select/i,
        hidden: true,
      })
      expect(langBtnInNav).toBeTruthy()
    })
  })

  test('3) navbar hides again when scrolling back to top (window.scrollY = 0)', async () => {
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

    render(<Navbar />)

    // show navbar first
    setScrollY(24)

    await waitFor(() => {
      const navRoot = screen.getByRole('navigation', {
        name: /Main landing navigation/i,
      })
      const wrapper = navRoot.closest('div')
      expect(wrapper).toHaveAttribute('aria-hidden', 'false')
    })

    // scroll back to top
    setScrollY(0)

    await waitFor(() => {
      const navRoot = screen.getByRole('navigation', {
        hidden: true,
        name: /Main landing navigation/i,
      })
      const wrapper = navRoot.closest('div')
      expect(wrapper).toHaveAttribute('aria-hidden', 'true')
    })
  })
})

export {}
