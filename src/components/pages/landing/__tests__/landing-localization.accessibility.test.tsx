import { render, screen } from '@testing-library/react';
import { describe, test } from 'vitest';
import React from 'react';

import { LanguageSelect } from '@/components/layout/ui/language-select';
import { LinguiProvider } from '@/integrations/lingui/provider';
import ptCatalog from '@/locales/pt-BR/messages.json';

describe('LanguageSelect accessibility labels', () => {
  test('aria-label comes from Lingui catalog (Selecionar idioma)', () => {
    const catalog = (ptCatalog as any).default ?? ptCatalog;
    render(
      <LinguiProvider locale={'pt-BR'} catalog={catalog}>
        <LanguageSelect />
      </LinguiProvider>,
    );

    const btn = screen.getByRole('button', {
      name: /Selecionar idioma|Language select/i,
    });
    expect(btn).toBeInTheDocument();
  });
});

export {};
