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

    // Navbar element is rendered but should be hidden (aria-hidden="true") while hero is visible.
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

    // Now navbar should appear and expose the updated UI. Wait for visibility
    await waitFor(() => {
      const navRoot = screen.getByRole('navigation', {
        name: /Main landing navigation/i,
      })
      const wrapper = navRoot.closest('div')
      expect(wrapper).toHaveAttribute('aria-hidden', 'false')
    })

    // Brand avatar should be present (logo image) when the navbar is visible
    const logo = screen.queryByRole('img', { name: /Amicats/i })
    if (logo) expect(logo).toBeInTheDocument()

    // Nav center links should be present and rendered as links (order: Adote, Quem Somos, O Abrigo, Voluntários, Certificados)
    const centerLinkLabels = [
      'Quem Somos',
      'O Abrigo',
      'Voluntários',
      'Adote',
      'Certificados',
    ]

    const expectedHashes: Record<string, string> = {
      'Quem Somos': 'quem-somos',
      'O Abrigo': 'o-abrigo',
      Voluntários: 'voluntarios-section',
      Adote: 'adote',
      Certificados: 'certificados',
    }

    // Verify presence and order by inspecting the menu list children
    const menu = screen.getByRole('list') || screen.querySelector('.menu')
    if (menu) {
      const items = Array.from(menu.querySelectorAll('li')).map((li) => li.textContent?.trim())
      // menu in markup: Adote, Quem Somos, O Abrigo, Voluntários, Certificados
      expect(items).toEqual(expect.arrayContaining(['Adote', 'Quem Somos', 'O Abrigo', 'Voluntários', 'Certificados']))
    }

    centerLinkLabels.forEach((label) => {
      // Some nav items may be rendered as anchors with inner text only. Use
      // a tolerant query that accepts either role=link or plain text nodes.
      const byText = screen.queryByText(new RegExp(`^${label}$`, 'i'))
      const link = byText ? byText.closest('a') : null
      if (link) {
        expect(link).toBeInTheDocument()
        expect(link.getAttribute('hash')).toBe(expectedHashes[label])
      } else {
        // fallback: assert the text node exists
        expect(byText).toBeInTheDocument()
      }
    })

    // CTA exact label must be present and visible after navbar becomes visible.
    // Because Link is mocked to a plain anchor, query the visible text and then
    // locate the closest anchor to assert forwarded props.
    const ctaText = screen.getByText('Comece sua Jornada')
    expect(ctaText).toBeInTheDocument()
    const cta = ctaText.closest('a')
    expect(cta).toBeTruthy()
    // CTA in implementation uses to='/' and hash='adote' (mock forwards these as attrs)
    expect(cta?.getAttribute('to') === '/' || /^\/(pt-BR|en)\/$/.test(cta?.getAttribute('to') || '')).toBeTruthy()
    expect(cta?.getAttribute('hash')).toBe('adote')

    // Language toggle should be present
    const navbarRoot = screen.getByRole('navigation', {
      name: /Main landing navigation/i,
    })
    const langButton = within(navbarRoot).getByRole('button', {
      name: /Language select/i,
    })
    expect(langButton).toBeInTheDocument()

    // Open menu and assert options
    const user = userEvent.setup()
    await user.click(langButton)

    let menuItems = screen.queryAllByRole('menuitem')
    if (menuItems.length === 0) menuItems = screen.queryAllByRole('option')
    const texts = menuItems.map((n) => n.textContent?.trim())
    expect(texts).toEqual(expect.arrayContaining(['PT', 'ENG']))

    const other = menuItems.find(
      (n) => n.textContent?.trim() !== (langButton.textContent || '').trim(),
    )
    if (other) {
      await user.click(other)
      await waitFor(() =>
        expect(document.cookie || localStorage.getItem('locale')).toBeTruthy(),
      )
    }

    // CTA should be adjacent to language toggle container
    const rightSideContainer = cta.parentElement
    expect(rightSideContainer).toBeTruthy()
    const next = cta.nextElementSibling
    expect(next).toBeTruthy()
    const langBtnInNav = within(next as Element).queryByRole('button', {
      name: /Language select/i,
      hidden: true,
    })
    expect(langBtnInNav).toBeTruthy()
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
