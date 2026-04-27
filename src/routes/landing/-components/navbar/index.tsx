import { useEffect, useRef, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { cn } from '@/components/layout/shared/helpers/class.helper'
import amicatsLogoFull from '@/assets/amicats-logo-full.png'
import { LanguageSelect } from '@/components/layout/ui/language-select'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export function Navbar(): JSX.Element | null {
  const navRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const { i18n } = useLingui()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onScroll = () => {
      const show = window.scrollY >= 24
      setVisible(show)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (typeof document !== 'undefined')
        document.documentElement.style.scrollPaddingTop = ''
    }
  }, [])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    if (visible) {
      timeoutId = setTimeout(() => {
        const el = navRef.current
        if (el && typeof document !== 'undefined') {
          const h = el.getBoundingClientRect().height
          document.documentElement.style.scrollPaddingTop = `${Math.ceil(h)}px`
        }
      }, 0)
    } else {
      if (typeof document !== 'undefined')
        document.documentElement.style.scrollPaddingTop = ''
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (typeof document !== 'undefined')
        document.documentElement.style.scrollPaddingTop = ''
    }
  }, [visible])

  return (
    <div
      ref={navRef}
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-200',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
      )}
      aria-hidden={!visible}
    >
      <nav
        className="navbar bg-base-100 shadow-sm py-2"
        role="navigation"
        aria-label="Main landing navigation"
      >
        <div className="relative w-full flex items-center">
          <div className="flex-none pl-4">
            <Link
              to="/"
              hash="introducao"
              className="inline-flex items-center justify-center rounded-full p-1 hover:bg-base-200 focus:outline-none"
              aria-label="Home"
            >
              <div className="p-2 h-18 w-18 rounded-full bg-base-100">
                <img
                  src={amicatsLogoFull}
                  alt="Amicats"
                  className="h-16 w-16 object-contain pb-2"
                />
              </div>
            </Link>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <Link to="/" hash="adote">
                   Adote
                  </Link>
                </li>
                <li>
                  <Link to="/" hash="quem-somos">
                   Quem Somos
                  </Link>
                </li>
                <li>
                  <Link to="/" hash="o-abrigo">
                   O Abrigo
                  </Link>
                </li>
                <li>
                  <Link to="/" hash="voluntarios-section">
                   Voluntários
                  </Link>
                </li>
                <li>
                  <Link to="/" hash="certificados">
                   Certificados
                  </Link>
                </li>
              </ul>
          </div>

          <div className="flex-1 flex justify-end items-center gap-3 pr-4">
            <Link to="/" hash="adote" className="btn btn-primary btn-md">
              {i18n._(t`Comece sua Jornada`)}
            </Link>
            <LanguageSelect />
          </div>
        </div>
      </nav>
    </div>
  )
}
