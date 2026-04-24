import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navbar } from '@/components/layout/ui/navbar'

describe('Navbar (unit) — sticky + language switcher', () => {
  beforeEach(() => {
    // ensure cookie cleared instead of localStorage during migration
    document.cookie = 'locale=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  })

  afterEach(() => {
    cleanup()
  })

  test('should render navbar in the app layout', () => {
    render(<Navbar />)
    expect(screen.getByText(/Amicats App/i)).toBeInTheDocument()
  })

  test("should expose brand/app link that points to '/app/home'", () => {
    render(<Navbar />)
    const brandLink = screen.getByRole('link', { name: /Amicats App/i })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink.getAttribute('to')).toBe('/app/home')
  })

  test("should contain existing navigation link 'Landing' that points to '/'", () => {
    render(<Navbar />)
    const landing = screen.getByText(/Landing/i)
    const landingAnchor = landing.closest('a')
    expect(landing).toBeInTheDocument()
    expect(landingAnchor).not.toBeNull()
    expect(landingAnchor?.getAttribute('to')).toBe('/')
  })

  test("should have sticky behavior contract: root element contains 'sticky' and 'top-0' classes", () => {
    const { container } = render(<Navbar />)
    const root = container.querySelector('.navbar')
    expect(root).not.toBeNull()
    expect(root?.classList.contains('sticky')).toBe(true)
    expect(root?.classList.contains('top-0')).toBe(true)
  })

  test("language switcher control has accessible name 'Language' and options for 'en' and 'pt-BR'", () => {
    render(<Navbar />)
    const select = screen.getByLabelText('Language')
    expect(select).toBeInTheDocument()

    // Use Testing Library queries on the select element
    const enOption = within(select).getByRole('option', { name: 'English' })
    const ptOption = within(select).getByRole('option', {
      name: 'Português (Brasil)',
    })
    expect(enOption).toBeInTheDocument()
    expect(ptOption).toBeInTheDocument()
  })

  test("selecting a language updates the visible selected state and persists to localStorage (select 'en')", async () => {
    render(<Navbar />)
    const select = screen.getByLabelText('Language')
    const user = userEvent.setup()

    expect(select.value).toBe('pt-BR')

    await user.selectOptions(select, 'en')

    expect(select.value).toBe('en')

    await waitFor(() => {
      const cookieOk = /locale=en/.test(document.cookie)
      const lsOk = localStorage.getItem('locale') === 'en'
      expect(cookieOk || lsOk).toBeTruthy()
    })
  })
})

export {}
