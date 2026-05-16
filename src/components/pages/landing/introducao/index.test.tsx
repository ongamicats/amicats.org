import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { afterEach, describe, test } from 'vitest';
import { IntroducaoSection } from '@/routes/landing/-components/introducao';

describe('IntroducaoSection (unit) — hero overlay and CTA', () => {
  const originalScrollYDesc = Object.getOwnPropertyDescriptor(
    window,
    'scrollY',
  );

  afterEach(() => {
    cleanup();
    if (originalScrollYDesc)
      Object.defineProperty(window, 'scrollY', originalScrollYDesc);
  });

  function setScrollY(y: number) {
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
    act(() => window.dispatchEvent(new Event('scroll')));
  }

  test('renders intro inner, shows language toggle before scroll and CTA with correct href', async () => {
    render(<IntroducaoSection />);

    // element with id intro-inner must exist — query via container methods instead of getByTestId
    const inner =
      document.getElementById('intro-inner') ||
      document.querySelector('#intro-inner');
    expect(inner).toBeTruthy();

    // LandingLanguageToggle has been replaced by a custom LanguageSelect —
    // the component renders a button with an aria-label. The test setup
    // normalizes aria-labels; assert presence via a case-insensitive
    // attribute query to avoid fragility.
    const toggleBtn =
      document.querySelector('button[aria-label="Language select"]') ||
      document.querySelector('button[aria-label="language select"]') ||
      // fallback: any button whose aria-label contains 'language' (case-insensitive)
      Array.from(document.querySelectorAll('button')).find((b) =>
        (b.getAttribute('aria-label') || '').toLowerCase().includes('language'),
      );
    expect(toggleBtn).toBeTruthy();

    // CTA exact label and href
    // accept either Portuguese or English label depending on active catalog
    // CTA text can vary depending on catalog shape; prefer matching the
    // visible button label used in the current implementation which is
    // "Quero Ajudar" (Portuguese) or an English equivalent. Accept any
    // of these to keep tests robust.
    // Prefer scoped query inside #intro-inner to avoid collisions with footer links.
    const innerScope =
      document.getElementById('intro-inner') ||
      document.querySelector('#intro-inner');
    expect(innerScope).toBeTruthy();

    let cta: HTMLElement | null = null;
    try {
      cta = within(innerScope as HTMLElement).getByRole('link', {
        name: /(Comece sua Jornada|Start your journey|Quero Ajudar|I want to help)/i,
      });
    } catch (err) {
      // fallback: find visible text and climb to anchor
      const textNode = within(innerScope as HTMLElement).queryByText(
        /Comece sua Jornada|Start your journey|Quero Ajudar|I want to help/i,
      );
      expect(textNode).toBeTruthy();
      cta = textNode
        ? ((textNode as Element).closest('a') as HTMLElement | null)
        : null;
    }

    expect(cta).toBeTruthy();
    const href = cta!.getAttribute('href') || cta!.getAttribute('to') || '';
    // Accept either localized path (/pt-BR/quero-ajudar/) or non-localized (/quero-ajudar/)
    expect(href).toMatch(
      /(^\/quero-ajudar\/|\/(?:[a-z]{2}(?:-[A-Z]{2})?)\/quero-ajudar\/)/,
    );
  });

  test('hides language toggle after scrolling past threshold', async () => {
    render(<IntroducaoSection />);

    // ensure toggle starts visible via direct DOM query (button)
    const before =
      document.querySelector('button[aria-label="Language select"]') ||
      document.querySelector('button[aria-label="language select"]');
    expect(before).toBeTruthy();

    // scroll past threshold
    setScrollY(24);

    await waitFor(() => {
      // After scrolling, the toggle should be removed from DOM (showToggle false)
      const maybeToggle =
        document.querySelector('button[aria-label="Language select"]') ||
        document.querySelector('button[aria-label="language select"]');
      expect(maybeToggle === null).toBeTruthy();
    });
  });
});

export {};
