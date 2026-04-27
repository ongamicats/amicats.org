import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, test } from 'vitest'
import { LanguageSelect } from '@/components/layout/ui/language-select'

describe('LanguageSelect (unit)', () => {
  afterEach(() => {
    cleanup()
    // cookie cleared globally in src/test/setup.ts afterEach
  })

  test('renders a button showing current locale and opens menu with PT and ENG options, persists selection', async () => {
    // LanguageSelect relies on useNavigate from TanStack Router. The test
    // setup provides a lightweight useNavigate mock that updates window.history
    // so the component can call navigate({ to }). Render and exercise the
    // accessible menu contract.
    render(<LanguageSelect />)

    // The component should render a button that exposes the language selector
    const btn = screen.getByRole('button', { name: /Language select/i })
    expect(btn).toBeInTheDocument()

    const user = userEvent.setup()
    await user.click(btn)

    // The accessible contract exposes the options as menuitems
    const items = screen.queryAllByRole('menuitem')
    const labels = items.map((n) => n.textContent?.trim())
    expect(labels).toEqual(expect.arrayContaining(['PT', 'ENG']))

    // select the other language and assert cookie-based persistence
    const current = (btn.textContent || '').trim()
    const other = items.find((it) => (it.textContent || '').trim() !== current)
    if (other) {
      await user.click(other)
      await waitFor(() => expect(document.cookie).toMatch(/locale=/))
    }
  })

  test('shows ENG label when cookie locale is en', async () => {
    // set cookie before render so resolveLocale reads it as initial locale
    document.cookie = 'locale=en; Path=/;'
    render(<LanguageSelect />)

    const btn = screen.getByRole('button', { name: /Language select/i })
    // visible label next to sr-only should reflect current locale
    const visible = btn.querySelector('span.font-medium')
    expect(visible?.textContent?.trim()).toBe('ENG')
  })
})

export {}
