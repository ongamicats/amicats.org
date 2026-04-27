import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import React from 'react'

import useLandingLocale, {
  __resetLandingLocaleForTests,
} from '@/hooks/use-landing-locale'

function TestComponent() {
  const [locale, setLocale] = useLandingLocale()
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <button onClick={() => setLocale(locale === 'pt-BR' ? 'en' : 'pt-BR')}>
        toggle
      </button>
    </div>
  )
}

describe('useLandingLocale (migration smoke)', () => {
  beforeEach(() => {
    try {
      __resetLandingLocaleForTests()
    } catch (e) {}
    document.cookie = 'locale=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  })

  afterEach(() => {
    try {
      __resetLandingLocaleForTests()
    } catch (e) {}
  })

  test('should expose default locale and toggle', async () => {
    render(<TestComponent />)
    const label = screen.getByTestId('locale')
    expect(label.textContent).toBe('pt-BR')

    const btn = screen.getByRole('button', { name: /toggle/i })
    await userEvent.click(btn)
    expect(label.textContent).toBe('en')
  })
})

export {}
