import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, test } from 'vitest'
import { IntroducaoSection } from '@/routes/landing/-components/introducao'

describe('IntroducaoSection (unit) — hero overlay and CTA', () => {
  const originalScrollYDesc = Object.getOwnPropertyDescriptor(window, 'scrollY')

  afterEach(() => {
    cleanup()
    if (originalScrollYDesc)
      Object.defineProperty(window, 'scrollY', originalScrollYDesc)
  })

  function setScrollY(y: number) {
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
    act(() => window.dispatchEvent(new Event('scroll')))
  }

  test('renders intro inner, shows language toggle before scroll and CTA with correct href', async () => {
    render(<IntroducaoSection />)

    // element with id intro-inner must exist — query via container methods instead of getByTestId
    const inner =
      document.getElementById('intro-inner') ||
      document.querySelector('#intro-inner')
    expect(inner).toBeTruthy()

    // LandingLanguageToggle has been replaced by a custom LanguageSelect — assert by button with locale label
    const toggleBtn =
      document.querySelector('button[aria-label="Language select"]') ||
      document.querySelector('button[aria-label="language select"]')
    expect(toggleBtn).toBeTruthy()

    // CTA exact label and href
    const cta = screen.getByRole('link', { name: 'Comece sua Jornada' })
    expect(cta).toBeInTheDocument()
    // Link is mocked to <a> and renders a normal anchor — assert href points to the target fragment
    expect(cta.getAttribute('href')).toBe('#adote')
  })

  test('hides language toggle after scrolling past threshold', async () => {
    render(<IntroducaoSection />)

    // ensure toggle starts visible via direct DOM query (button)
    const before =
      document.querySelector('button[aria-label="Language select"]') ||
      document.querySelector('button[aria-label="language select"]')
    expect(before).toBeTruthy()

    // scroll past threshold
    setScrollY(24)

    await waitFor(() => {
      // After scrolling, the toggle should be removed from DOM (showToggle false)
      const maybeToggle =
        document.querySelector('button[aria-label="Language select"]') ||
        document.querySelector('button[aria-label="language select"]')
      expect(maybeToggle === null).toBeTruthy()
    })
  })
})

export {}
