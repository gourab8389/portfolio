'use client';

import { useEffect, useState } from 'react';
import { SITE_META } from '@/constants';

interface InitialLoaderProps {
  isLoading: boolean;
  onComplete: () => void;
}

export function InitialLoader({ isLoading, onComplete }: InitialLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible,  setVisible]  = useState(true);

  useEffect(() => {
    if (isLoading) {
      // Simulate progress while loading
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 85) { clearInterval(interval); return p; }
          return p + Math.random() * 12;
        });
      }, 180);
      return () => clearInterval(interval);
    } else {
      // Data loaded — rush to 100
      setProgress(100);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onComplete]);

  if (!visible) return null;

  return (
    <div
      className="loader-overlay"
      style={{
        opacity: progress >= 100 ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: progress >= 100 ? 'none' : 'all',
      }}
    >
      {/* GD 3D-style text */}
      <div style={{ position: 'relative' }}>
        <div className="loader-gd-text">{SITE_META.initials}</div>
        {/* Shadow layer for depth */}
        <div
          className="loader-gd-text"
          style={{
            position: 'absolute',
            top: 4,
            left: 4,
            opacity: 0.15,
            filter: 'blur(2px)',
            zIndex: -1,
          }}
        >
          {SITE_META.initials}
        </div>
      </div>

      {/* Name */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.35em',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          marginTop: '-1rem',
        }}
      >
        {SITE_META.name}
      </p>

      {/* Progress bar */}
      <div className="loader-bar-track">
        <div
          className="loader-bar-fill"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Percentage */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--gold-muted)',
          letterSpacing: '0.1em',
          marginTop: '-0.5rem',
        }}
      >
        {Math.round(Math.min(progress, 100))}%
      </p>
    </div>
  );
}