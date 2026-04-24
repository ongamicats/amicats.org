import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { cn } from '@/components/layout/shared/helpers/class.helper'
import {
  resolveLocale,
  setLocaleCookie,
} from '@/integrations/lingui/resolve-locale'

export interface LanguageSelectProps {
  className?: string
  hidden?: boolean
}

export function LanguageSelect({ className, hidden }: LanguageSelectProps) {
  const id = useId()
  const navigate = useNavigate()

  // Resolve initial locale from route params or cookies
  const initial = resolveLocale()
  const [locale, setLocale] = useState(initial.locale)
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])

  const options: Array<{ value: 'pt-BR' | 'en'; label: string; flag: string }> =
    [
      { value: 'pt-BR', label: 'PT', flag: 'fi fi-br' },
      { value: 'en', label: 'ENG', flag: 'fi fi-us' },
    ]

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const target = e.target as Node | null
      if (!open) return
      if (
        target &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }

    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  useEffect(() => {
    if (open) {
      // focus selected item when opening
      const idx = options.findIndex((o) => o.value === locale)
      const el = itemRefs.current[idx] || itemRefs.current[0]
      el?.focus()
    }
  }, [open, locale])

  function toggle() {
    setOpen((v) => !v)
  }

  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen((v) => !v)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
    }
  }

  function onItemKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const opt = options[idx]
      setLocaleCookie(document, opt.value)
      setLocale(opt.value)
      setOpen(false)
      // navigate like click handler
      const { pathname, search, hash } = window.location
      const segments = pathname.split('/').filter(Boolean)
      if (
        segments.length > 0 &&
        (segments[0] === 'pt-BR' || segments[0] === 'en')
      ) {
        segments[0] = opt.value
      } else {
        segments.unshift(opt.value)
      }
      const to = `/${segments.join('/')}${search ?? ''}${hash ?? ''}`
      navigate({ to })
      buttonRef.current?.focus()
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = (idx + 1) % options.length
      itemRefs.current[next]?.focus()
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = (idx - 1 + options.length) % options.length
      itemRefs.current[prev]?.focus()
    }
    if (e.key === 'Escape') {
      setOpen(false)
      buttonRef.current?.focus()
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
        aria-label="Language select"
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
        <span className="sr-only">Language</span>
        <span className="font-medium ml-1">
          {locale === 'pt-BR' ? 'PT' : 'ENG'}
        </span>
      </button>

      {open && (
        <div
          id={`${id}-lang-menu`}
          role="menu"
          aria-label="Language menu"
          ref={menuRef}
          className={cn(
            // position the menu to the left of the trigger, vertically centered
            'absolute right-full mr-2 top-1/2 -translate-y-1/2',
            // keep compact sizing and readable text
            'min-w-max text-sm bg-base-100 shadow-md rounded-md py-1 z-50 whitespace-nowrap',
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
                setLocaleCookie(document, opt.value)
                setLocale(opt.value)
                setOpen(false)
                // navigate to same path under new locale - preserve search/hash
                const { pathname, search, hash } = window.location
                const segments = pathname.split('/').filter(Boolean)
                if (
                  segments.length > 0 &&
                  (segments[0] === 'pt-BR' || segments[0] === 'en')
                ) {
                  segments[0] = opt.value
                } else {
                  segments.unshift(opt.value)
                }
                const to = `/${segments.join('/')}${search ?? ''}${hash ?? ''}`
                navigate({ to })
                buttonRef.current?.focus()
              }}
              onKeyDown={(e) => onItemKeyDown(e, i)}
            >
              <span className={opt.flag} aria-hidden />
              <span className="ml-1">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// named export only
