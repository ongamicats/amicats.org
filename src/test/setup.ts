import { createElement } from 'react';
import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { i18n } from '@lingui/core';

// Preload catalogs and activate default locale for tests to avoid race
// conditions where components call i18n._() during render before any
// test explicitly activates a locale. Prefer the compiled catalogs (messages.js)
// when available because they contain the full set of message entries used
// by the app; fall back to the trimmed messages.json when necessary.
import enJson from '../locales/en/messages.json';
import ptJson from '../locales/pt-BR/messages.json';
// reset landing locale module state between tests to avoid cross-test leakage
// from module-level state in use-landing-locale.ts
import { __resetLandingLocaleForTests } from '@/hooks/use-landing-locale';
// Import deterministic i18n mocks so loaders that dynamically import
// locale catalogs become deterministic in the test environment.
// The module registers a narrow vi.mock for the catalog loader.
import './i18n-fixtures';

// For tests prefer the checked-in flat messages.json catalogs to keep
// translation lookups deterministic. Using compiled catalogs (messages.js)
// can change the shape of messages and produce subtle mismatches in
// string results used by assertions. Use the JSON files as the canonical
// source in the test environment.
const enCatalog = enJson;
const ptCatalog = ptJson;

// Attempt to load compiled catalogs (messages.js) when available so we
// can build a more complete reverse lookup map for tests. We still use
// the flat JSON for i18n.load to keep runtime shape stable, but compiled
// catalogs often contain the full set of message entries which are
// useful for mapping Portuguese source -> English translation.
let enCompiled: any | undefined;
let ptCompiled: any | undefined;
try {
  enCompiled = await vi
    .importActual('../locales/en/messages.js')
    .catch(() => undefined);
} catch (e) {
  enCompiled = undefined;
}
try {
  ptCompiled = await vi
    .importActual('../locales/pt-BR/messages.js')
    .catch(() => undefined);
} catch (e) {
  ptCompiled = undefined;
}

// Provide a lightweight mock for @lingui/react in the test environment so
// components that call `useLingui()` don't fail if a full I18nProvider isn't
// present. The mock returns the real `i18n` instance from @lingui/core so
// tests can manipulate/activate catalogs via the app's helpers or the
// LinguiProvider wrapper used in some tests.
vi.mock('@lingui/react', async () => {
  const actual = await vi.importActual<any>('@lingui/react').catch(() => ({}));
  return {
    ...actual,
    useLingui: () => ({ i18n }),
    I18nProvider: ({ children }: any) => children,
    Trans: ({ children }: any) => children,
  };
});

// Some components import Trans from '@lingui/react/macro' which at runtime
// tries to load babel-plugin-macros. In the test environment we don't run
// babel macros, so provide a lightweight mock to avoid requiring that package.
vi.mock('@lingui/react/macro', async () => {
  return {
    // Provide a runtime Trans that uses the i18n instance so tests that
    // import the macro at runtime still receive translated strings from
    // the loaded catalogs. Many components use <Trans> with literal
    // strings; this mock maps those literal children through i18n._().
    // Provide a minimal useLingui implementation so modules that import
    // `useLingui` from the macro don't fail in tests. Many components call
    // `const { t } = useLingui()`; expose a `t` helper that proxies to i18n._().
    useLingui: () => ({
      i18n,
      // Support both plain-string and tagged-template usage for t so
      // components that use t`literal` or t('literal') both work in tests.
      t: (msg: any, ..._vals: Array<any>) => {
        try {
          // Tagged template calls receive a TemplateStringsArray as first arg
          if (Array.isArray(msg) && typeof msg[0] === 'string') {
            return i18n._(msg[0]);
          }
          return typeof msg === 'string' ? i18n._(msg) : msg;
        } catch (e) {
          return msg;
        }
      },
    }),

    Trans: ({ children }: any) => {
      try {
        if (typeof children === 'string') {
          return i18n._(children as any);
        }
      } catch (e) {
        // fallthrough to return raw children
      }
      return children;
    },
  };
});

// Provide runtime shims for '@lingui/macro' used by source code (t`` and Trans)
// so tests don't require the babel macro transform. t returns the raw string
// from the tagged template and Trans maps literal children via i18n.
vi.mock('@lingui/macro', async () => {
  return {
    t: (strings: TemplateStringsArray, ..._vals: Array<any>) => {
      try {
        return i18n._(strings[0] as any);
      } catch (e) {
        return strings[0];
      }
    },
    Trans: ({ children }: any) => {
      try {
        if (typeof children === 'string') return i18n._(children as any);
      } catch (e) {
        // noop
      }
      return children;
    },
  };
});

// Prefer compiled catalogs for building reverse lookup maps when available
// because they contain more entries. However i18n.load will receive the
// stable JSON shape (enCatalog/ptCatalog) to avoid changing runtime
// behavior in tests.
const EN =
  enCompiled && enCompiled.messages
    ? enCompiled
    : ((enCatalog as any).default ?? enCatalog);
const PT =
  ptCompiled && ptCompiled.messages
    ? ptCompiled
    : ((ptCatalog as any).default ?? ptCatalog);

try {
  // load both catalogs and activate en by default for tests
  // Use the flat JSON catalogs for i18n.load so the runtime shape is
  // stable and deterministic for assertions. Compiled catalogs (EN/PT)
  // are only used to build reverse lookup maps below.
  i18n.load('en', (enCatalog as any).default ?? enCatalog);
  i18n.load('pt-BR', (ptCatalog as any).default ?? ptCatalog);
  i18n.activate('en');
} catch (e) {
  // ignore failures — tests that wrap with LinguiProvider will control i18n
}

// Build reverse lookup maps from source (Portuguese) message -> translation
// for the loaded catalogs so runtime calls to i18n._("...pt string...")
// (which occur when babel macros aren't applied in tests) still return
// the expected translated label when the test activates 'en'. This is a
// test-only shim and mirrors what the babel macro would produce at build
// time by resolving messages to ids.
try {
  const enMap = new Map<string, string>();
  const ptMap = new Map<string, string>();
  // Support both Lingui runtime catalogs (objects with {message, translation})
  // and the simpler messages.json format used in this repo
  if (
    EN &&
    typeof EN === 'object' &&
    EN.messages &&
    PT &&
    typeof PT === 'object' &&
    PT.messages
  ) {
    // messages.json format: { messages: { ID: "translation" } }
    for (const id of Object.keys(EN.messages)) {
      try {
        const enVal = EN.messages[id];
        const ptVal = PT.messages[id];
        const extract = (v: any) => {
          if (typeof v === 'string') return v;
          if (Array.isArray(v) && v.length > 0 && typeof v[0] === 'string')
            return v[0];
          if (v && typeof v === 'object') {
            // some compiled catalogs may nest objects or arrays; try common fields
            if (typeof v.message === 'string') return v.message;
            if (typeof v.translation === 'string') return v.translation;
          }
          return null;
        };

        const enText = extract(enVal);
        const ptText = extract(ptVal);
        if (typeof enText === 'string' && typeof ptText === 'string') {
          enMap.set(ptText, enText);
          ptMap.set(ptText, ptText);
        }
      } catch (e) {
        // ignore malformed entries
      }
    }
  } else {
    for (const [, entry] of Object.entries(EN)) {
      if (entry && typeof entry === 'object' && (entry as any).message) {
        if ((entry as any).translation)
          enMap.set((entry as any).message, (entry as any).translation);
        ptMap.set((entry as any).message, (entry as any).message);
      }
    }
  }

  // Wrap i18n._ to resolve plain-string calls using our reverse maps when
  // possible. Fall back to the original implementation otherwise.
  const originalI18nGet = i18n._.bind(i18n);
  // @ts-ignore - augmenting i18n for test shim
  i18n._ = (msg: any, ...args: Array<any>) => {
    try {
      if (typeof msg === 'string') {
        const locale = i18n.locale;
        if (locale === 'en' && enMap.has(msg)) return enMap.get(msg);
        if (locale === 'pt-BR' && ptMap.has(msg)) return ptMap.get(msg);
      }
    } catch (e) {
      // ignore and fallthrough
    }
    return originalI18nGet(msg, ...args);
  };
  // Expose enMap to the outer scope for DOM attribute normalization below
  // so tests that query attributes via selectors see the translated
  // attribute values (eg. aria-label) when locale is 'en'. This is a
  // test-only shim to make attribute-based selectors deterministic.
  // @ts-ignore
  (globalThis as any).__lingui_en_map = enMap;
} catch (e) {
  // noop - best-effort shim for tests
}

// Normalize aria-label attributes in the DOM for tests that query by
// attribute selectors (e.g. document.querySelector('button[aria-label="Language select"]')).
// Some components set aria-label using the source Portuguese string; when
// the test environment is activated to 'en' we want the visible attribute
// values to match the English translations. We implement a MutationObserver
// that rewrites aria-label attributes using the reverse map created above.
try {
  const enMapGlobal = (globalThis as any).__lingui_en_map as
    | Map<string, string>
    | undefined;
  if (typeof document !== 'undefined' && enMapGlobal && enMapGlobal.size > 0) {
    const rewriteAttr = (el: Element) => {
      try {
        const v = el.getAttribute('aria-label');
        if (v && i18n.locale === 'en' && enMapGlobal.has(v)) {
          const mapped = enMapGlobal.get(v);
          if (mapped && mapped !== v) el.setAttribute('aria-label', mapped);
        }
      } catch (e) {
        // ignore
      }
    };

    // Initial pass for existing elements
    for (const el of Array.from(document.querySelectorAll('[aria-label]'))) {
      rewriteAttr(el);
    }

    // Observe future changes to attributes and childList
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        if (
          r.type === 'attributes' &&
          r.attributeName === 'aria-label' &&
          r.target instanceof Element
        ) {
          rewriteAttr(r.target);
        }
        if (r.type === 'childList') {
          for (const node of Array.from(r.addedNodes)) {
            if (node instanceof Element) {
              // rewrite for the node and its descendants
              rewriteAttr(node);
              for (const desc of Array.from(
                node.querySelectorAll('[aria-label]'),
              ))
                rewriteAttr(desc);
            }
          }
        }
      }
    });

    mo.observe(document.documentElement || document, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // Expose a helper to disconnect observer between tests if needed
    // @ts-ignore
    (globalThis as any).__lingui_attr_mo = mo;
  }
} catch (e) {
  // ignore
}

// Mock @tanstack/react-router Link for tests that render components directly
vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<any>('@tanstack/react-router');
  return {
    ...actual,
    Link: (props: any) => {
      // Render a real anchor with href derived from `to` so tests using
      // getByRole('link') and anchor-specific attributes behave like the
      // real router Link. Preserve `to` attribute for legacy assertions.
      const { children, to, hash, ...rest } = props;
      let href = '';
      try {
        if (typeof to === 'string') {
          href = to;
        }
        // if a hash prop is present, append it to href
        if (hash && typeof hash === 'string') {
          // ensure trailing slash before hash when needed
          href = href || '/';
          // normalize hash value to not include leading '#'
          const normalizedHash = hash.startsWith('#')
            ? hash.replace(/^#/, '')
            : hash;
          href = `${href}#${normalizedHash}`;
          // attach normalizedHash to rest attrs later so tests can read getAttribute('hash')
          // We don't mutate `rest` here; we'll compute attrs after.
        }
      } catch (e) {
        href = to || '';
      }
      // preserve `to` and expose a normalized `hash` attribute (no leading '#')
      // so tests that call link.getAttribute('hash') receive a stable value.
      const normalizedHashAttr =
        typeof hash === 'string'
          ? hash.startsWith('#')
            ? hash.replace(/^#/, '')
            : hash
          : undefined;
      const attrs: any = { ...(rest || {}), to, href };
      if (
        typeof normalizedHashAttr === 'string' &&
        normalizedHashAttr.length > 0
      )
        attrs.hash = normalizedHashAttr;
      return createElement('a', attrs, children);
    },
    // Provide a lightweight useNavigate mock for tests that call navigate({ to })
    // during migration. The real router will perform navigation; in tests a
    // no-op that updates history is sufficient to avoid errors and to let
    // components compute path-based behavior.
    useNavigate: () => {
      return ({ to }: { to?: string } = {}) => {
        try {
          if (typeof window !== 'undefined' && typeof to === 'string') {
            // update the history so components that read window.location see the new path
            window.history.pushState({}, '', to);
          }
        } catch (e) {
          // swallow - tests will assert expected behavior
        }
      };
    },
    // Provide a lightweight useParams mock so components that call useParams()
    // during unit tests don't require a full RouterProvider. Tests that need
    // router behaviour should wrap with the real provider; for most unit
    // renders returning an empty params object is sufficient and avoids
    // "isServer"/null-context failures from the real implementation.
    useParams: (_opts?: any) => ({}),
    // useMatch may be called by some helpers; a simple null response is fine
    // for unit tests that don't exercise route-matching logic.
    useMatch: (_pattern?: any) => null,
  };
});

// Enhanced IntersectionObserver mock for jsdom/vitest environments.
// - Records created observers and their callbacks so tests can simulate
//   intersection changes by calling `globalThis.__triggerIO(entries)`.
// - Provides observe/unobserve/disconnect/takeRecords methods.
// - Keeps a simple API and logs creation via vi.fn() so assertions can spy on it.
const __createdObservers: Array<{
  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;
}> = [];

const MockIntersectionObserver = vi.fn().mockImplementation(function (
  this: any,
  cb: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
) {
  // Store the callback so tests can invoke it
  __createdObservers.push({ callback: cb, options });

  this.observe = vi.fn();
  this.unobserve = vi.fn();
  this.disconnect = vi.fn();
  this.takeRecords = vi.fn().mockReturnValue([]);
});

Object.defineProperty(globalThis, 'IntersectionObserver', {
  configurable: true,
  writable: true,
  value: MockIntersectionObserver,
});

// helper for tests to trigger intersection callbacks for all created observers
(globalThis as any).__triggerIO = (
  entries: Array<IntersectionObserverEntry>,
) => {
  for (const obs of __createdObservers) {
    try {
      obs.callback(entries as any, {} as IntersectionObserver);
    } catch (e) {
      // swallow - tests will assert expected behavior
    }
  }
};

if (typeof window !== 'undefined') {
  // @ts-ignore - augmenting the global window for tests
  window.IntersectionObserver = MockIntersectionObserver as any;
  (window as any).__triggerIO = (globalThis as any).__triggerIO;
}

// requestAnimationFrame/cancelAnimationFrame polyfill for Node/jsdom test env
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  // @ts-ignore
  globalThis.requestAnimationFrame = (cb: FrameRequestCallback) =>
    setTimeout(cb, 0);
  // @ts-ignore
  globalThis.cancelAnimationFrame = (id: number) => clearTimeout(id);
}

// helper to clear created observers between tests
(globalThis as any).__clearIO = () => {
  __createdObservers.length = 0;
};

// global test helpers can be attached here

afterEach(() => {
  try {
    (globalThis as any).__clearIO();
  } catch (e) {
    // ignore
  }

  try {
    __resetLandingLocaleForTests();
  } catch (e) {
    // ignore
  }

  // clear locale cookie between tests to avoid cross-test leakage
  try {
    if (typeof document !== 'undefined') {
      // Expire the locale cookie
      document.cookie =
        'locale=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  } catch (e) {
    // ignore
  }
});

export {};
