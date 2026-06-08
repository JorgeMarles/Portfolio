'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
  ];

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

        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: pathname === link.href ? 'var(--accent)' : '#999',
                fontWeight: pathname === link.href ? 700 : 600,
                transition: 'color 100ms ease',
                position: 'relative'
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
        </div>
      </nav>
    </header>
  );
}
