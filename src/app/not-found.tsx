import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 20vw, 12rem)',
          letterSpacing: '0.04em',
          background: 'linear-gradient(135deg, var(--gold-primary), var(--gold-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
        }}
      >
        404
      </div>

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}
      >
        Page Not Found
      </p>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          maxWidth: '360px',
          lineHeight: 1.7,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="btn btn-primary"
        style={{ marginTop: '0.5rem' }}
      >
        <Home size={16} />
        Back Home
      </Link>
    </div>
  );
}