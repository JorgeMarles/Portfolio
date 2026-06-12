'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n/client';
import type { Locale } from '@/i18n';

export function Header() {
  const pathname = usePathname();
  const { locale, t, switchLocale } = useI18n();

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/projects', label: t.nav.projects },
    { href: '/about', label: t.nav.about },
  ];

  const otherLocale: Locale = locale === 'en' ? 'es' : 'en';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(10, 10, 10, 0.95)',
      borderBottom: '1px solid var(--card-border)',
      backdropFilter: 'blur(8px)'
    }}>
      <nav className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
        fontFamily: 'var(--font-display)',
        fontSize: '0.9375rem',
        textTransform: 'uppercase',
        letterSpacing: '0.02em'
      }}>
        <Link href="/" style={{
          fontWeight: 800,
          fontSize: '1.125rem',
          color: pathname === '/' ? 'var(--accent)' : 'var(--foreground)',
          transition: 'color 100ms ease'
        }}>
          Jorge Marles
        </Link>

        <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 2.5rem)', alignItems: 'center' }}>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: pathname === link.href ? 'var(--accent)' : '#999',
                fontWeight: pathname === link.href ? 700 : 600,
                transition: 'color 100ms ease',
                position: 'relative',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (pathname !== link.href) {
                  e.currentTarget.style.color = 'var(--foreground)';
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== link.href) {
                  e.currentTarget.style.color = '#999';
                }
              }}
            >
              {pathname === link.href && '[ '}
              {link.label}
              {pathname === link.href && ' ]'}
            </Link>
          ))}

          <button
            onClick={() => switchLocale(otherLocale)}
            style={{
              background: 'transparent',
              border: '1px solid var(--card-border)',
              color: 'var(--foreground)',
              padding: '0.25rem 0.625rem',
              fontFamily: 'var(--mono)',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'border-color 150ms ease, color 150ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--card-border)';
              e.currentTarget.style.color = 'var(--foreground)';
            }}
            aria-label={`Switch to ${otherLocale === 'en' ? 'English' : 'Español'}`}
          >
            {otherLocale === 'en' ? 'EN' : 'ES'}
          </button>
        </div>
      </nav>
    </header>
  );
}
