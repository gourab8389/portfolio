'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS, SITE_META } from '@/constants';
import { useProfile } from '@/hooks/usePortfolio';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { profile } = useProfile();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const githubUrl  = profile?.githubUrl  ?? SITE_META.github;
  const linkedinUrl = profile?.linkedinUrl ?? SITE_META.linkedin;
  const resumeUrl  = profile?.resume;

  return (
    <nav className={cn('navbar', scrolled && 'scrolled')}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              letterSpacing: '0.08em',
              color: 'var(--gold-primary)',
              textDecoration: 'none',
              textShadow: '0 0 20px rgba(240,192,64,0.4)',
              transition: 'text-shadow var(--transition-base)',
            }}
          >
            {SITE_META.initials}
          </Link>

          {/* Desktop Nav Links */}
          <div
            className="md:flex hidden"
            style={{ alignItems: 'center', gap: '2rem' }}
          >
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={href}
                  href={href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    color: isActive ? 'var(--gold-primary)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color var(--transition-fast)',
                    position: 'relative',
                    paddingBottom: '2px',
                  }}
                >
                  {label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'var(--gold-primary)',
                        boxShadow: '0 0 6px var(--gold-primary)',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="md:flex hidden" style={{ alignItems: 'center', gap: '1rem' }}>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
                aria-label="GitHub"
              >
                <IconBrandGithub size={20} />
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }}
                aria-label="LinkedIn"
              >
                <IconBrandLinkedin size={20} />
              </a>
            )}
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ padding: '0.45rem 1.1rem', fontSize: '0.8rem', gap: '0.4rem' }}
              >
                <Download size={14} />
                Resume
              </a>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
            className="btn btn-ghost"
            style={{ padding: '0.4rem' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            background: 'rgba(5,5,7,0.97)',
            backdropFilter: 'blur(24px)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '1.5rem 1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '1rem',
              }}
            >
              {label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem' }}>
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
                <IconBrandGithub size={20} />
              </a>
            )}
            {linkedinUrl && (
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
                <IconBrandLinkedin size={20} />
              </a>
            )}
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                <Download size={14} />
                Resume
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}