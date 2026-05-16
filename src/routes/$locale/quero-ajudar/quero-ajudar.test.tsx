import { render, screen, within } from '@testing-library/react';
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

    // There should be four help card headings — scope queries to the page
    // content so repeated site chrome (footer, header) doesn't produce
    // ambiguous matches.
    const content = document.getElementById('quero-ajudar-content');
    expect(content).toBeTruthy();

    const cardTitles = [
      /Quero Adotar/i,
      /Apadrinhar/i,
      /Ser Voluntário/i,
      /Ser Parceiro/i,
    ];

    for (const t of cardTitles) {
      expect(within(content as HTMLElement).getByText(t)).toBeInTheDocument();
    }

    // Links/buttons point to expected destinations. Scope to the same
    // content area to avoid footer/header collisions. Link may render as
    // an anchor (<a>) with either `href` or a mocked `to` attribute.
    const saibaAdotar = within(content as HTMLElement).getByRole('link', {
      name: /Saiba como adotar/i,
    });
    expect(saibaAdotar).toBeInTheDocument();
    expect(
      saibaAdotar.getAttribute('to') || saibaAdotar.getAttribute('href') || '',
    ).toMatch(/\/como-funciona\//);

    const saibaApadrinhar = within(content as HTMLElement).getByRole('link', {
      name: /Saiba como apadrinhar/i,
    });
    expect(saibaApadrinhar).toBeInTheDocument();
    expect(
      saibaApadrinhar.getAttribute('to') ||
        saibaApadrinhar.getAttribute('href') ||
        '',
    ).toContain('/como-funciona/?section=apadrinhamento');

    const saibaVoluntario = within(content as HTMLElement).getByRole('link', {
      name: /Saiba como ser voluntário/i,
    });
    expect(saibaVoluntario).toBeInTheDocument();
    expect(
      saibaVoluntario.getAttribute('to') ||
        saibaVoluntario.getAttribute('href') ||
        '',
    ).toContain('/como-funciona/?section=voluntariado');

    const saibaParceiro = within(content as HTMLElement).getByRole('link', {
      name: /Saiba sobre parcerias/i,
    });
    expect(saibaParceiro).toBeInTheDocument();
    expect(
      saibaParceiro.getAttribute('to') ||
        saibaParceiro.getAttribute('href') ||
        '',
    ).toMatch(/\/seja-um-parceiro\//);
  });
});

export {};
