import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, test } from 'vitest';
import { i18n } from '@lingui/core';
import RouteComponent from './index';

describe('Route: /quero-ajudar/ — basic UI contract', () => {
  beforeEach(() => {
    // make locale deterministic for resolveLocale used by the route
    window.history.pushState({}, '', '/pt-BR/quero-ajudar/');
    try {
      document.cookie = 'locale=pt-BR';
    } catch {}
    try {
      i18n.activate('pt-BR');
    } catch {}
  });

  afterEach(() => {
    try {
      document.cookie =
        'locale=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
    } catch {}
  });

  test('renders hero heading and four help cards with expected links', () => {
    render(<RouteComponent />);

    // Hero heading
    const heading = screen.getByRole('heading', {
      name: /Como Ajudar|How to help/i,
    });
    expect(heading).toBeInTheDocument();

    // There should be four help card headings
    const cardTitles = [
      /Quero Adotar|Quero Adotar/i,
      /Apadrinhar|Apadrinhar/i,
      /Ser Voluntário|Ser Voluntário/i,
      /Ser Parceiro|Ser Parceiro/i,
    ];

    for (const t of cardTitles) {
      expect(screen.getByText(t)).toBeInTheDocument();
    }

    // Links/buttons point to expected destinations. Link is mocked to <a> so
    // its `to` prop appears as attribute; assert href/to contains expected paths.
    const saibaAdotar = screen.getByRole('link', {
      name: /Saiba como adotar|Saiba como adotar/i,
    });
    expect(saibaAdotar).toBeInTheDocument();
    expect(saibaAdotar.getAttribute('to') || '').toMatch(/\/como-funciona\//);

    const saibaApadrinhar = screen.getByRole('link', {
      name: /Saiba como apadrinhar/i,
    });
    expect(saibaApadrinhar).toBeInTheDocument();
    expect(saibaApadrinhar.getAttribute('to') || '').toContain(
      '/como-funciona/?section=apadrinhamento',
    );

    const saibaVoluntario = screen.getByRole('link', {
      name: /Saiba como ser voluntário|Saiba como ser voluntário/i,
    });
    expect(saibaVoluntario).toBeInTheDocument();
    expect(saibaVoluntario.getAttribute('to') || '').toContain(
      '/como-funciona/?section=voluntariado',
    );

    const saibaParceiro = screen.getByRole('link', {
      name: /Saiba sobre parcerias|Saiba sobre parcerias/i,
    });
    expect(saibaParceiro).toBeInTheDocument();
    expect(saibaParceiro.getAttribute('to') || '').toMatch(
      /\/seja-um-parceiro\//,
    );
  });
});

export {};
