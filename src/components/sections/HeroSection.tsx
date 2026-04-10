'use client';

import { useEffect, useState, useRef } from 'react';
import { ArrowDown, MapPin, Mail } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';
import { useProfile } from '@/hooks/usePortfolio';
import { SITE_META, HERO_STATS } from '@/constants';
import { LinkButton } from '@/components/ui';

function useTypewriter(texts: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < current.length) {
      timer = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return display;
}

// ============================================================
// MARQUEE — horizontal scrolling text strip
// ============================================================
function Marquee() {
  const items = ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Redis', 'TailwindCSS'];
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0.75rem 0',
      marginTop: '3rem',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{
        display: 'flex',
        gap: '3rem',
        animation: 'marquee 20s linear infinite',
        width: 'max-content',
      }}>
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            letterSpacing: '0.2em',
            color: i % 2 === 0 ? 'var(--gold-primary)' : 'var(--text-muted)',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '3rem',
          }}>
            {item}
            <span style={{ color: 'var(--gold-primary)', fontSize: '0.5rem' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 3D FLOATING GD CUBE — CSS only, no Three.js
// ============================================================
function GDCube() {
  const size = 140;
  const half = size / 2;

  const faceBase: React.CSSProperties = {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    border: '1px solid rgba(240,192,64,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-display)',
    fontSize: '2.8rem',
    letterSpacing: '0.08em',
    backfaceVisibility: 'hidden',
  };

  const faces = [
    { label: 'GD', transform: `translateZ(${half}px)`,                          bg: 'rgba(240,192,64,0.06)', color: 'var(--gold-primary)', shadow: true },
    { label: 'GD', transform: `rotateY(180deg) translateZ(${half}px)`,          bg: 'rgba(240,192,64,0.03)', color: 'var(--gold-muted)',   shadow: false },
    { label: '',   transform: `rotateY(90deg) translateZ(${half}px)`,           bg: 'rgba(240,192,64,0.04)', color: 'transparent',         shadow: false },
    { label: '',   transform: `rotateY(-90deg) translateZ(${half}px)`,          bg: 'rgba(240,192,64,0.04)', color: 'transparent',         shadow: false },
    { label: '',   transform: `rotateX(90deg) translateZ(${half}px)`,           bg: 'rgba(240,192,64,0.02)', color: 'transparent',         shadow: false },
    { label: '',   transform: `rotateX(-90deg) translateZ(${half}px)`,          bg: 'rgba(240,192,64,0.02)', color: 'transparent',         shadow: false },
  ];

  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      perspective: '600px',
      flexShrink: 0,
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        animation: 'cube-rotate 8s linear infinite',
      }}>
        {faces.map(({ label, transform, bg, color, shadow }, i) => (
          <div
            key={i}
            style={{
              ...faceBase,
              transform,
              background: bg,
              color,
              boxShadow: shadow ? '0 0 40px rgba(240,192,64,0.2) inset' : 'none',
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// BIG BACKGROUND TEXT — like chkstepan's oversized typography
// ============================================================
function BigBgText({ text }: { text: string }) {
  return (
    <div style={{
      position: 'absolute',
      right: '-2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(8rem, 18vw, 16rem)',
      letterSpacing: '0.04em',
      color: 'transparent',
      WebkitTextStroke: '1px rgba(240,192,64,0.07)',
      pointerEvents: 'none',
      userSelect: 'none',
      lineHeight: 1,
      zIndex: 0,
      whiteSpace: 'nowrap',
    }}>
      {text}
    </div>
  );
}

export function HeroSection() {
  const { profile } = useProfile();

  const typed = useTypewriter([
    'Full Stack Developer',
    'MERN Stack Engineer',
    'Next.js Specialist',
    'TypeScript Enthusiast',
  ]);

  const socialLinks = [
    { href: profile?.githubUrl ?? SITE_META.github,     icon: IconBrandGithub,   label: 'GitHub' },
    { href: profile?.linkedinUrl ?? SITE_META.linkedin, icon: IconBrandLinkedin, label: 'LinkedIn' },
    ...(profile?.twitterUrl ? [{ href: profile.twitterUrl, icon: IconBrandTwitter, label: 'Twitter' }] : []),
  ];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Big BG ghost text */}
      <BigBgText text="DEV" />

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 20% 60%, rgba(240,192,64,0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Horizontal gold line accent */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(240,192,64,0.08) 30%, rgba(240,192,64,0.08) 70%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Main content */}
      <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '80px' }}>

        {/* Top row — location + cube */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '2rem',
        }}>
          {/* Location pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.8rem',
            border: '1px solid var(--border-subtle)',
            borderRadius: '100px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
          }}>
            <MapPin size={12} color="var(--gold-primary)" />
            {profile?.location ?? SITE_META.location}
          </div>

          {/* 3D CSS Cube */}
          <GDCube />
        </div>

        {/* HUGE Name */}
        <h1
          className="animate-reveal-up delay-100"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 11vw, 9rem)',
            letterSpacing: '0.03em',
            lineHeight: 0.9,
            color: 'var(--text-primary)',
            marginBottom: '1.2rem',
          }}
        >
          {profile?.name ?? SITE_META.name}
        </h1>

        {/* Divider line + Typewriter on same row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, var(--gold-primary), transparent)',
            flexShrink: 0,
          }} />
          <div
            className="animate-reveal-up delay-200"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              letterSpacing: '0.06em',
              color: 'var(--gold-primary)',
              minHeight: '2rem',
            }}
          >
            {typed}
            <span style={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              background: 'var(--gold-primary)',
              marginLeft: '3px',
              verticalAlign: 'middle',
              animation: 'pulse-gold 1s ease-in-out infinite',
            }} />
          </div>
        </div>

        {/* Bottom row — bio + stats + actions */}
        <div className="hero-grid" style={{ display: 'grid', gap: '3rem', alignItems: 'center' }}>

          {/* Left */}
          <div>
            {profile?.bio && (
              <p
                className="animate-reveal-up delay-300"
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                  lineHeight: 1.8,
                  maxWidth: '500px',
                  marginBottom: '2rem',
                }}
              >
                {profile.bio}
              </p>
            )}

            <div className="animate-reveal-up delay-400" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <LinkButton variant="primary" href="#projects" size="lg">
                View My Work
              </LinkButton>
              <LinkButton variant="outline" href="#contact" size="lg">
                <Mail size={16} />
                Get In Touch
              </LinkButton>
            </div>

            <div className="animate-reveal-up delay-500" style={{ display: 'flex', gap: '0.75rem' }}>
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-base)',
                  }}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Stats */}
          <div className="animate-reveal-up delay-600" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}>
            {HERO_STATS.map(({ value, label }) => (
              <div key={label} style={{
                padding: '1.4rem',
                border: '1px solid var(--border-subtle)',
                borderRadius: '16px',
                background: 'rgba(17,17,24,0.6)',
                textAlign: 'center',
                backdropFilter: 'blur(12px)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Gold top line accent */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: '20%', right: '20%',
                  height: '1px',
                  background: 'var(--gold-primary)',
                  boxShadow: '0 0 8px var(--gold-primary)',
                }} />
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  letterSpacing: '0.04em',
                  color: 'var(--gold-primary)',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                }}>
                  {value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <Marquee />

      {/* Scroll indicator */}
      <div
        className="animate-float"
        style={{
          position: 'absolute',
          bottom: '5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--text-muted)',
          cursor: 'none',
          zIndex: 10,
        }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em' }}>SCROLL</span>
        <ArrowDown size={14} color="var(--gold-primary)" />
      </div>
    </section>
  );
}