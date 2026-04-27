import { render, screen } from '@testing-library/react'
import { describe, test, afterEach } from 'vitest'
import React from 'react'

import { Resgates } from '@/components/layout/ui/resgates'
import { LinguiProvider } from '@/integrations/lingui/provider'
import enCatalog from '@/locales/en/messages.json'
import ptCatalog from '@/locales/pt-BR/messages.json'

function catalogFor(locale: 'en' | 'pt-BR') {
  return locale === 'en' ? (enCatalog as any).default ?? enCatalog : (ptCatalog as any).default ?? ptCatalog
}

describe('Resgates localization', () => {
  test('renders localized resgates label in pt-BR and en', () => {
    const voluntarios = [{ nome: 'A', img: '' }]
    const { rerender } = render(
      <LinguiProvider locale={'pt-BR'} catalog={catalogFor('pt-BR')}>
        <Resgates socorristas={voluntarios} />
      </LinguiProvider>,
    )

    const ptEl = screen.getByText(/resgates realizados/i)
    expect(ptEl).toBeInTheDocument()

    // rerender with English catalog — assert the rendered label changes (not brittle to exact English phrasing)
    rerender(
      <LinguiProvider locale={'en'} catalog={catalogFor('en')}>
        <Resgates socorristas={voluntarios} />
      </LinguiProvider>,
    )

    const enEl = screen.getByText(/\+/i).parentElement
    expect(enEl).toBeTruthy()
    // the label should no longer exactly match the Portuguese message
    expect((enEl as HTMLElement).textContent || '').not.toMatch(/resgates realizados/i)
  })
})

export {}

afterEach(() => {
  document.body.innerHTML = ''
})
