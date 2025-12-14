import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={{
            borderBottom: '1px solid var(--card-border)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'rgba(15, 17, 21, 0.8)'
        }}>
            <div className="container" style={{
                height: '4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Link href="/" style={{ fontWeight: 700, fontSize: '1.25rem' }}>
                    JM<span style={{ color: 'var(--accent-primary)' }}>.</span>
                </Link>

                <div style={{ display: 'flex', gap: '2rem' }}>
                    <Link href="/projects" className="nav-link">Projects</Link>
                    <Link href="/about" className="nav-link">About</Link>
                </div>
            </div>
        </nav>
    );
}
