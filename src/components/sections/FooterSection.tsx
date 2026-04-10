"use client";

import { Heart } from 'lucide-react';
import { useProfile } from '@/hooks/usePortfolio';
import { NAV_LINKS, SITE_META } from '@/constants';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';

export function Footer() {
  const { profile } = useProfile();
  const year = new Date().getFullYear();

  const socials = [
    { href: profile?.githubUrl   ?? SITE_META.github,   icon: IconBrandGithub,   label: 'GitHub' },
    { href: profile?.linkedinUrl ?? SITE_META.linkedin, icon: IconBrandLinkedin, label: 'LinkedIn' },
    ...(profile?.twitterUrl ? [{ href: profile.twitterUrl, icon: IconBrandTwitter, label: 'Twitter' }] : []),
  ].filter((s) => s.href);

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-secondary)',
        padding: '3rem 0 2rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                letterSpacing: '0.08em',
                color: 'var(--gold-primary)',
                textShadow: '0 0 20px rgba(240,192,64,0.3)',
                marginBottom: '0.75rem',
              }}
            >
              {SITE_META.initials}
            </div>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.82rem',
                lineHeight: 1.7,
                maxWidth: '220px',
              }}
            >
              {SITE_META.title} based in {SITE_META.location.split(',')[0]}.
              Building scalable web experiences.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold-primary)',
                marginBottom: '1rem',
              }}
            >
              Navigation
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold-primary)',
                marginBottom: '1rem',
              }}
            >
              Connect
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <a
              href={`mailto:${SITE_META.email}`}
              style={{
                display: 'block',
                marginTop: '1rem',
                color: 'var(--text-muted)',
                fontSize: '0.82rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono)',
                transition: 'color 0.2s ease',
              }}
            >
              {SITE_META.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <p
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.05em',
            }}
          >
            © {year} {SITE_META.name}. All rights reserved.
          </p>
          <p
            style={{
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            Made using Next.Js and Three.Js
          </p>
        </div>
      </div>
    </footer>
  );
}