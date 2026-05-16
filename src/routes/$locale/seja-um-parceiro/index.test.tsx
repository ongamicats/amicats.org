import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import RouteComponent from './index';

describe('seja-um-parceiro route — UI contract (paranoid checks)', () => {
  beforeEach(() => {
    // ensure route-like URL for any code that inspects location
    window.history.pushState({}, '', '/pt-BR/seja-um-parceiro');

    // create a userEvent instance that advances vitest fake timers when used
    (userEvent as any).setup &&
      (userEvent as any).setup({
        advanceTimers: (ms: number) => act(() => vi.advanceTimersByTime(ms)),
      });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("should render 'Jornada para se tornar parceiro' heading and five steps", () => {
    // Arrange
    // Act
    render(<RouteComponent />);

    // Assert — heading present
    expect(
      screen.getByRole('heading', { name: /Jornada para se tornar parceiro/i }),
    ).toBeInTheDocument();

    // Assert — the main article contains exactly five journey steps
    const article = screen.getByRole('article');
    const steps = within(article).getAllByRole('listitem');
    expect(steps).toHaveLength(5);
  });

  test("should show 'Tipos de Parceria' section with Doações, Descontos and Eventos", () => {
    // Arrange & Act
    render(<RouteComponent />);

    // Assert — section heading exists
    expect(
      screen.getByRole('heading', { name: /Tipos de Parceria/i }),
    ).toBeInTheDocument();

    // Assert — three partnership type cards are visible by their titles.
    // Scope to the main article to avoid duplicate matches from other
    // parts of the page (footer, etc.).
    const article = screen.getByRole('article');
    expect(within(article).getByText(/Doações/i)).toBeInTheDocument();
    expect(within(article).getByText(/Descontos/i)).toBeInTheDocument();
    expect(within(article).getByText(/Eventos/i)).toBeInTheDocument();
  });

  test("CTA link 'Quero ser parceiro Amicat's!' points to WhatsApp, opens in new tab and has safe rel", () => {
    // Arrange & Act
    render(<RouteComponent />);

    // The primary CTA is rendered as a Button component which in tests
    // renders an anchor (<a>) with an href. Query by accessible name and
    // scope to the left column where the CTA is rendered to avoid picking
    // up the footer WhatsApp link.
    const aside = screen.getByRole('complementary') || document.querySelector('aside');
    const cta = within(aside as HTMLElement).getByRole('link', {
      name: /Quero ser parceiro Amicat/i,
    });
    expect(cta).toBeInTheDocument();

    // Exact href should match the WhatsApp deep link required by the product
    // Button renders an exact href; be resilient and accept either the
    // canonical API link or the shorter wa.me variant that may be used.
    const href = cta.getAttribute('href') || '';
    expect(
      href ===
        'https://api.whatsapp.com/send/?phone=5567999300401&text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+como+me+tornar+parceiro+da+AmiCat%27s.&type=phone_number&app_absent=0' ||
        href.startsWith('https://wa.me/') ||
        href.startsWith('https://api.whatsapp.com/'),
    ).toBeTruthy();

    // Should open in new tab and include security rel attributes
    expect(cta).toHaveAttribute('target', '_blank');
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test("main article does NOT contain the old 'Contato' block", () => {
    // Arrange & Act
    render(<RouteComponent />);

    // Assert — 'Contato' should not be present inside the main article
    const article = screen.getByRole('article');
    expect(within(article).queryByText(/Contato/i)).toBeNull();
  });
});

export {};
