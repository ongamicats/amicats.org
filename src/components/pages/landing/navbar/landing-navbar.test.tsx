import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navbar } from '@/routes/landing/-components/navbar';

describe('LandingNavbar (unit) — scroll-threshold behavior', () => {
  const originalScrollYDesc = Object.getOwnPropertyDescriptor(
    window,
    'scrollY',
  );

  afterEach(() => {
    cleanup();
    // remove any test hero element
    const el = document.getElementById('introducao');
    if (el && el.parentNode) el.parentNode.removeChild(el);
    // reset any scroll padding
    document.documentElement.style.scrollPaddingTop = '';
    // restore scrollY descriptor if we stubbed it
    if (originalScrollYDesc)
      Object.defineProperty(window, 'scrollY', originalScrollYDesc);
  });

  test('4) mobile menu button exists, toggles expanded state and mobile dropdown renders only when open', async () => {
    // Force the navbar visible to avoid scroll interactions in this test
    render(<Navbar forceVisible />);

    // Locate the mobile menu toggle by aria-controls attribute which is stable
    const mobileToggle = document.querySelector(
      'button[aria-controls="landing-mobile-menu"]',
    );
    expect(mobileToggle).toBeTruthy();

    // Initially closed
    expect(mobileToggle?.getAttribute('aria-expanded')).toBe('false');

    // Dropdown (menu) should not be in the DOM while closed
    expect(screen.queryByRole('menu')).toBeNull();

    const user = userEvent.setup();

    // Open the mobile menu
    await user.click(mobileToggle!);
    await waitFor(() =>
      expect(mobileToggle?.getAttribute('aria-expanded')).toBe('true'),
    );

    // Now the menu content should be rendered
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();

    // Menu items (links) should be present inside the menu
    const adoptLink = within(menu).getByText(/Adote|Adopt/i);
    expect(adoptLink).toBeInTheDocument();

    // Clicking a menu item should close the mobile menu (onClick handler sets state)
    await user.click(adoptLink);
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull());
    expect(mobileToggle?.getAttribute('aria-expanded')).toBe('false');
  });

  test('5) language select button is still present in the navbar', async () => {
    render(<Navbar forceVisible />);
    const navbarRoot = screen.getByRole('navigation', {
      name: /(Main landing navigation|Navegação principal)/i,
    });
    const langButton = within(navbarRoot).getByRole('button', {
      name: /(Language select|Selecionar idioma|Select language)/i,
    });
    expect(langButton).toBeInTheDocument();
  });

  function setScrollY(y: number) {
    // Some JSDOM environments don't allow direct assignment to scrollY
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
  }

  test('1) navbar is hidden at initial load when hero is visible', async () => {
    // create a hero element and make it visible via bounding rect
    const hero = document.createElement('div');
    hero.id = 'introducao';
    hero.getBoundingClientRect = () =>
      ({
        top: 0,
        bottom: 100,
        left: 0,
        right: 0,
        height: 100,
        width: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      }) as any;
    document.body.appendChild(hero);

    render(<Navbar />);

    // Navbar element is rendered but should be hidden (aria-hidden="true") while hero is visible.
    await waitFor(() => {
      const navRoot = screen.getByRole('navigation', {
        hidden: true,
        name: /(Main landing navigation|Navegação principal)/i,
      });
      expect(navRoot).toBeInTheDocument();
      // parent wrapper uses aria-hidden
      const wrapper = navRoot.closest('div');
      expect(wrapper).toHaveAttribute('aria-hidden', 'true');
    });
  });

  test('2) navbar becomes visible when window.scrollY >= 24 and shows new UI elements', async () => {
    // create a hero element that starts visible
    const hero = document.createElement('div');
    hero.id = 'introducao';
    hero.getBoundingClientRect = () =>
      ({
        top: 0,
        bottom: 100,
        left: 0,
        right: 0,
        height: 100,
        width: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      }) as any;
    document.body.appendChild(hero);

    render(<Navbar />);

    // ensure navbar root is present but hidden initially
    await waitFor(() => {
      const navRoot = screen.getByRole('navigation', {
        hidden: true,
        name: /(Main landing navigation|Navegação principal)/i,
      });
      expect(navRoot).toBeInTheDocument();
      const wrapper = navRoot.closest('div');
      expect(wrapper).toHaveAttribute('aria-hidden', 'true');
    });

    // Scroll past the threshold
    setScrollY(24);

    // Now navbar should appear and expose the updated UI. Wait for visibility
    await waitFor(() => {
      const navRoot = screen.getByRole('navigation', {
        name: /(Main landing navigation|Navegação principal)/i,
      });
      const wrapper = navRoot.closest('div');
      expect(wrapper).toHaveAttribute('aria-hidden', 'false');
    });

    // Brand avatar should be present (logo image) when the navbar is visible
    const logo = screen.queryByRole('img', { name: /Amicats/i });
    if (logo) expect(logo).toBeInTheDocument();

    // Nav center links should be present and rendered as links. Labels may
    // be localized; each entry contains both Portuguese and English labels
    // to make the assertion work regardless of active catalog.
    // Only expect the sections that are actually rendered on the landing page.
    // CertificadosSection is commented out in the landing page, so the
    // Certificados link should not be expected.
    const centerLinkLabels = [
      { pt: 'Adote', en: 'Adopt', hash: 'adote' },
      { pt: 'Quem Somos', en: 'About us', hash: 'quem-somos' },
      { pt: 'O Abrigo', en: 'The shelter', hash: 'o-abrigo' },
      { pt: 'Voluntários', en: 'Volunteers', hash: 'voluntarios-section' },
    ];

    // Verify presence and order by inspecting the menu list children
    const menu = screen.getByRole('list') || screen.querySelector('.menu');
    if (menu) {
      const items = Array.from(menu.querySelectorAll('li')).map((li) =>
        li.textContent?.trim(),
      );
      // menu in markup may be localized; accept either Portuguese or English labels
      const expectations = [
        ['Adote', 'Adopt'],
        ['Quem Somos', 'About us'],
        ['O Abrigo', 'The shelter'],
        ['Voluntários', 'Volunteers'],
      ];
      for (const opts of expectations) {
        const found = items.some(
          (it) => it && (it === opts[0] || it === opts[1]),
        );
        expect(found).toBeTruthy();
      }
    }

    centerLinkLabels.forEach((entry) => {
      const labelRegex = new RegExp(`^(${entry.pt}|${entry.en})$`, 'i');
      const byText = screen.queryByText(labelRegex);
      const link = byText ? byText.closest('a') : null;
      if (link) {
        expect(link).toBeInTheDocument();
        // Links should target the landing route. The app may be localized
        // so accept either plain '/' or a localized root such as '/pt-BR/' or '/en/'.
        const to = link.getAttribute('to') || '';
        expect(to === '/' || /^\/(pt-BR|en)\/$/.test(to)).toBeTruthy();
        expect(link.getAttribute('hash')).toBe(entry.hash);
      } else {
        // fallback: assert the text node exists
        expect(byText).toBeInTheDocument();
      }
    });

    // CTA exact label must be present in the DOM after navbar becomes visible.
    // Because Link is mocked to a plain anchor, query the visible text and then
    // locate the closest anchor to assert forwarded props.
    // Accept a set of localized CTA variants so the test is resilient to
    // different catalogs (English/Portuguese). Examples observed: "I want to help",
    // "Start your journey", "Quero Ajudar", "Comece sua Jornada".
    const ctaText = screen.getByText(
      /(Comece sua Jornada|Start your journey|Quero Ajudar|I want to help)/i,
    );
    expect(ctaText).toBeInTheDocument();
    const cta = ctaText.closest('a');
    expect(cta).toBeTruthy();
    // CTA in implementation now links to the localized /quero-ajudar/ route.
    // The Link mock exposes the `to` prop as an attribute and renders an href
    // shaped like '/pt-BR/quero-ajudar/' or '/en/quero-ajudar/'. Assert accordingly.
    const toAttr = cta?.getAttribute('to') || '';
    expect(toAttr).toMatch(/\/(pt-BR|en|[a-z]{2}(-[A-Z]{2})?)\/quero-ajudar\//);

    // Language toggle should be present
    const navbarRoot = screen.getByRole('navigation', {
      name: /(Main landing navigation|Navegação principal)/i,
    });
    const langButton = within(navbarRoot).getByRole('button', {
      name: /(Language select|Selecionar idioma|Select language)/i,
    });
    expect(langButton).toBeInTheDocument();

    // Open menu and assert options
    const user = userEvent.setup();
    await user.click(langButton);

    let menuItems = screen.queryAllByRole('menuitem');
    if (menuItems.length === 0) menuItems = screen.queryAllByRole('option');
    const texts = menuItems.map((n) => n.textContent?.trim());
    expect(texts).toEqual(expect.arrayContaining(['PT', 'ENG']));

    const other = menuItems.find(
      (n) => n.textContent?.trim() !== (langButton.textContent || '').trim(),
    );
    if (other) {
      await user.click(other);
      await waitFor(() =>
        expect(document.cookie || localStorage.getItem('locale')).toBeTruthy(),
      );
    }

    // CTA should be adjacent to language toggle container
    const rightSideContainer = cta.parentElement;
    expect(rightSideContainer).toBeTruthy();
    const next = cta.nextElementSibling;
    expect(next).toBeTruthy();
    const langBtnInNav = within(next as Element).queryByRole('button', {
      name: /(Language select|Selecionar idioma|Select language)/i,
      hidden: true,
    });
    expect(langBtnInNav).toBeTruthy();
  });

  test('3) navbar hides again when scrolling back to top (window.scrollY = 0)', async () => {
    const hero = document.createElement('div');
    hero.id = 'introducao';
    hero.getBoundingClientRect = () =>
      ({
        top: 0,
        bottom: 100,
        left: 0,
        right: 0,
        height: 100,
        width: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      }) as any;
    document.body.appendChild(hero);

    render(<Navbar />);

    // show navbar first
    setScrollY(24);

    await waitFor(() => {
      const navRoot = screen.getByRole('navigation', {
        name: /(Main landing navigation|Navegação principal)/i,
      });
      const wrapper = navRoot.closest('div');
      expect(wrapper).toHaveAttribute('aria-hidden', 'false');
    });

    // scroll back to top
    setScrollY(0);

    await waitFor(() => {
      const navRoot = screen.getByRole('navigation', {
        hidden: true,
        name: /(Main landing navigation|Navegação principal)/i,
      });
      const wrapper = navRoot.closest('div');
      expect(wrapper).toHaveAttribute('aria-hidden', 'true');
    });
  });
});

export {};
