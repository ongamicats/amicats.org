import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, test } from 'vitest';
import { i18n } from '@lingui/core';
import { Footer } from './index';

describe('Footer (unit) — focused contract checks', () => {
  beforeEach(() => {
    // deterministic locale for resolveLocale
    window.history.pushState({}, '', '/pt-BR/');
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

  test("'Institucional' includes 'Seja um parceiro' and 'Como Ajudar' points to /quero-ajudar/", () => {
    render(<Footer />);

    // Section title
    expect(screen.getByText(/Institucional/i)).toBeInTheDocument();

    // 'Seja um parceiro' link should be present and have `to` or `href` attr
    // that includes the localized partner path. Use role-based query to
    // ensure we pick up the accessible link even when multiple anchors exist.
    const parceiro = screen.getByRole('link', { name: /Seja um parceiro/i });
    expect(parceiro).toBeInTheDocument();
    const parceiroAttr = parceiro.getAttribute('to') || parceiro.getAttribute('href') || '';
    expect(parceiroAttr).toMatch(/\/pt-BR\/seja-um-parceiro\//);

    // 'Como Ajudar' points to localized /quero-ajudar/
    const comoAjudar = screen.getByRole('link', { name: /Como Ajudar/i });
    expect(comoAjudar).toBeInTheDocument();
    expect(comoAjudar.getAttribute('to') || '').toMatch(
      /\/pt-BR\/quero-ajudar\//,
    );
  });

  test('contact email uses mailto:amicatsong@gmail.com and privacy/terms are present but hidden', () => {
    render(<Footer />);

    const mail = document.querySelector('a[href^="mailto:"]');
    expect(mail).toBeTruthy();
    if (mail) {
      expect((mail as HTMLAnchorElement).href).toContain(
        'mailto:amicatsong@gmail.com',
      );
    }

    // Privacidade and Termos exist but are hidden (have class 'hidden')
    const priv = screen.getByText(/Privacidade/i);
    const termos = screen.getByText(/Termos/i);
    expect(priv).toBeInTheDocument();
    expect(termos).toBeInTheDocument();
    expect(priv.className).toMatch(/\bhidden\b/);
    expect(termos.className).toMatch(/\bhidden\b/);
  });
});

export {};
