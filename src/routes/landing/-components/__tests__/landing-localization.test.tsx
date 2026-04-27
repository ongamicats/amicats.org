import { render, screen } from '@testing-library/react'
import { describe, test } from 'vitest'
import React from 'react'

import { IntroducaoSection } from '@/routes/landing/-components/introducao'
import { LinguiProvider } from '@/integrations/lingui/provider'
import enCatalog from '@/locales/en/messages.json'
import ptCatalog from '@/locales/pt-BR/messages.json'
import { afterEach } from 'vitest'

afterEach(() => {
  // ensure cleanup of any leftover DOM between renders
  document.body.innerHTML = ''
})

function renderWithLocale(ui: React.ReactElement, locale: 'en' | 'pt-BR') {
  const catalog = locale === 'en' ? (enCatalog as any).default ?? enCatalog : (ptCatalog as any).default ?? ptCatalog
  return render(<LinguiProvider locale={locale} catalog={catalog}>{ui}</LinguiProvider>)
}

describe('Landing localization (smoke)', () => {
  test('Introducao shows Portuguese copy by default and English when wrapped with en catalog', async () => {
    // Portuguese default
    renderWithLocale(<IntroducaoSection />, 'pt-BR')
    // CTA in pt-BR comes from key k1nKn9 -> "Comece sua Jornada"
    expect(screen.getByRole('link', { name: 'Comece sua Jornada' })).toBeInTheDocument()

    // render again with English catalog
    document.body.innerHTML = ''
    renderWithLocale(<IntroducaoSection />, 'en')
    // English translation should be present
    expect(screen.getByRole('link', { name: 'Start your journey' })).toBeInTheDocument()
  })
})

export {}
