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

    // select the other language and assert localStorage updated
    const current = (btn.textContent || '').trim()
    const other = items.find((it) => (it.textContent || '').trim() !== current)
    if (other) {
      await user.click(other)
      await waitFor(() => expect(document.cookie).toMatch(/locale=/))
    }
  })
})

export {}
