import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useLingui } from '@lingui/react/macro';
import { i18n } from '@lingui/core';
import { cn } from '@/components/layout/shared/helpers/class.helper';
import {
  resolveLocale,
  setLocaleCookie,
} from '@/integrations/lingui/resolve-locale';

export interface LanguageSelectProps {
  className?: string;
  hidden?: boolean;
}

export function LanguageSelect({ className, hidden }: LanguageSelectProps) {
  const id = useId();
  const navigate = useNavigate();

  // Derive current locale reactively from router params and cookies.
  // Use useParams({ strict: false }) per TanStack Router guidance so this
  // component follows route changes instead of keeping its own copy.
  const params = useParams({ strict: false });
  const locale = resolveLocale({ params }).locale;
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(
    null,
  );

  const options: Array<{ value: 'pt-BR' | 'en'; label: string; flag: string }> =
    [
      { value: 'pt-BR', label: 'PT', flag: 'fi fi-br' },
      { value: 'en', label: 'ENG', flag: 'fi fi-us' },
    ];

  const { t } = useLingui();
  // localized aria labels (sourceLocale remains pt-BR so messages extracted in pt-BR)
  // Use direct i18n._ lookup as a fallback in tests where the macro helper
  // translation may not be applied. Prefer useLingui() when available.
  const ariaLanguageSelect =
    (t && (t as any)`Selecionar idioma`) || i18n._('Selecionar idioma');
  const ariaLanguageMenu =
    (t && (t as any)`Menu de idiomas`) || i18n._('Menu de idiomas');

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const target = e.target as Node | null;
      if (!open) return;
      // If the menu is rendered in a portal its DOM node will be appended to
      // document.body; menuRef.current should still point to it. However some
      // browsers or timing conditions might make menuRef null for a tick, so
      // treat that as "outside" only when the click is also outside the
      // button. This preserves expected click-to-close behavior.
      if (
        target &&
        ((menuRef.current && !menuRef.current.contains(target)) ||
          !menuRef.current) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    // use capture phase to ensure clicks are seen before other handlers that
    // may stop propagation (helps reliably close the portal menu)
    document.addEventListener('mousedown', onDoc, true);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDoc, true);
      document.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      // focus selected item when opening
      const idx = options.findIndex((o) => o.value === locale);
      const el = itemRefs.current[idx] || itemRefs.current[0];
      el?.focus();
    }
  }, [open, locale]);

  // compute portal position for the floating menu so it escapes any stacking
  // context and sits above image stack. Position mirrors the previous
  // `absolute right-full mr-2 top-1/2 -translate-y-1/2` behavior.
  useEffect(() => {
    if (!open || typeof window === 'undefined') return;
    const update = () => {
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      // We want the menu's right edge to sit 8px left of the button's left
      // edge (mr-2). Using transform translate(-100%, -50%) below, we set
      // left to that right-edge coordinate so the menu positions correctly.
      setMenuPos({
        left: Math.round(rect.left - 8),
        top: Math.round(rect.top + rect.height / 2),
      });
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [open]);

  function toggle() {
    setOpen((v) => !v);
    // recompute position on manual toggle immediately so the portal opens
    // in the correct place (use next tick to allow ref to be set)
    setTimeout(() => {
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      setMenuPos({
        left: Math.round(rect.left - 8),
        top: Math.round(rect.top + rect.height / 2),
      });
    }, 0);
  }

  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((v) => !v);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
    }
  }

  function onItemKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const opt = options[idx];
      setLocaleCookie(document, opt.value);
      setOpen(false);
      // navigate like click handler
      const { pathname, search, hash } = window.location;
      const segments = pathname.split('/').filter(Boolean);
      if (
        segments.length > 0 &&
        (segments[0] === 'pt-BR' || segments[0] === 'en')
      ) {
        segments[0] = opt.value;
      } else {
        segments.unshift(opt.value);
      }
      const to = `/${segments.join('/')}${search ?? ''}${hash ?? ''}`;
      navigate({ to, resetScroll: false });
      buttonRef.current?.focus();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = (idx + 1) % options.length;
      itemRefs.current[next]?.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = (idx - 1 + options.length) % options.length;
      itemRefs.current[prev]?.focus();
    }
    if (e.key === 'Escape') {
      setOpen(false);
      buttonRef.current?.focus();
    }
  }

  return (
    <div
      className={cn(
        'relative inline-flex items-center',
        hidden ? 'hidden' : '',
        className,
      )}
    >
      <button
        id={`${id}-lang-toggle`}
        ref={buttonRef}
        type="button"
        aria-label={ariaLanguageSelect}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${id}-lang-menu`}
        className={cn('btn btn-ghost btn-sm gap-2', 'inline-flex items-center')}
        onClick={toggle}
        onKeyDown={onButtonKeyDown}
      >
        <span
          className={locale === 'pt-BR' ? 'fi fi-br' : 'fi fi-us'}
          aria-hidden
        />
        <span className="sr-only">{t`Idioma`}</span>
        <span className="font-medium ml-1" aria-hidden>
          {locale === 'pt-BR' ? 'PT' : 'ENG'}
        </span>
      </button>

      {open &&
        menuPos &&
        createPortal(
          <div
            id={`${id}-lang-menu`}
            role="menu"
            aria-label={ariaLanguageMenu}
            ref={menuRef}
            // fixed positioning at document root so menu escapes stacking
            // contexts created by parent elements. transform mirrors the
            // original vertical centering and left placement.
            style={{
              position: 'fixed',
              left: `${menuPos.left}px`,
              top: `${menuPos.top}px`,
              transform: 'translate(-100%, -50%)',
              // use an explicit Tailwind-friendly z-index that plays well with
              // existing site classes. 9999 is robust, but keep a comment for
              // maintainers to know why this is high.
              zIndex: 9999,
            }}
            className={cn(
              'min-w-max text-sm bg-base-100 shadow-md rounded-md py-1 whitespace-nowrap',
            )}
          >
            {options.map((opt, i) => (
              <button
                key={opt.value}
                role="menuitem"
                ref={(el) => (itemRefs.current[i] = el)}
                tabIndex={0}
                className={cn(
                  // compact, fit-content items sized to the small trigger
                  'text-left px-2 py-1 hover:bg-base-200 transition-colors flex items-center gap-2 text-sm',
                  // keep visual weight for selected item
                  locale === opt.value && 'font-semibold',
                )}
                onClick={() => {
                  setLocaleCookie(document, opt.value);
                  setOpen(false);
                  // navigate to same path under new locale - preserve search/hash
                  const { pathname, search, hash } = window.location;
                  const segments = pathname.split('/').filter(Boolean);
                  if (
                    segments.length > 0 &&
                    (segments[0] === 'pt-BR' || segments[0] === 'en')
                  ) {
                    segments[0] = opt.value;
                  } else {
                    segments.unshift(opt.value);
                  }
                  const to = `/${segments.join('/')}${search ?? ''}${hash ?? ''}`;
                  navigate({ to, resetScroll: false });
                  buttonRef.current?.focus();
                }}
                onKeyDown={(e) => onItemKeyDown(e, i)}
              >
                <span className={opt.flag} aria-hidden />
                <span className="ml-1">{opt.label}</span>
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}
