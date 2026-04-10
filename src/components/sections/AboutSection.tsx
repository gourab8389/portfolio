'use client';

import Image from 'next/image';
import { GraduationCap, Award, User } from 'lucide-react';
import { useProfile, useEducation } from '@/hooks/usePortfolio';
import { SectionWrapper, Skeleton, Badge } from '@/components/ui';
import { CERTIFICATIONS, SITE_META } from '@/constants';
import { formatDateRange } from '@/lib/utils';

export function AboutSection() {
  const { profile, isLoading: profileLoading } = useProfile();
  const { education, isLoading: eduLoading }   = useEducation();
  const isLoading = profileLoading || eduLoading;

  return (
    <SectionWrapper id="about" label="// about me" title="Who I Am">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}
      >
        {/* Profile Image + Identity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {isLoading ? (
            <Skeleton className="w-full aspect-square rounded-2xl max-w-xs mx-auto" />
          ) : (
            <div style={{ position: 'relative', maxWidth: '320px' }}>
              {/* Gold border frame */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-8px',
                  border: '1px solid var(--border-default)',
                  borderRadius: '24px',
                  background: 'var(--gold-glow)',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  aspectRatio: '4/5',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {profile?.profileImage ? (
                  <Image
                    src={profile.profileImage}
                    alt={profile.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority
                  />
                ) : (
                  // Fallback — initials
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontSize: '6rem',
                      color: 'var(--gold-primary)',
                      letterSpacing: '0.1em',
                      background: 'linear-gradient(135deg, var(--bg-card), var(--bg-card-hover))',
                    }}
                  >
                    {SITE_META.initials}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact Info Pills */}
          {profile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: profile.email,    icon: '✉' },
                { label: profile.location, icon: '📍' },
                { label: profile.website,  icon: '🌐' },
              ]
                .filter((i) => i.label)
                .map(({ label, icon }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Right — Bio, Education, Certs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {/* Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <User size={16} color="var(--gold-primary)" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-primary)',
                }}
              >
                Biography
              </span>
            </div>
            {isLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p
                style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                  fontSize: '0.95rem',
                }}
              >
                {profile?.bio ??
                  'Full-Stack Developer and B.Tech Computer Science student specializing in building scalable web applications with the MERN stack, Next.js, and TypeScript. Experienced in delivering production-ready applications within Agile teams.'}
              </p>
            )}
          </div>

          {/* Education */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <GraduationCap size={16} color="var(--gold-primary)" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-primary)',
                }}
              >
                Education
              </span>
            </div>
            {eduLoading ? (
              <Skeleton className="h-24 w-full rounded-xl" />
            ) : (
              education.map((edu) => (
                <div
                  key={edu.id}
                  className="glass-card"
                  style={{ borderRadius: '14px', padding: '1.2rem 1.4rem' }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                      marginBottom: '0.2rem',
                    }}
                  >
                    {edu.degree} in {edu.stream}
                  </div>
                  <div style={{ color: 'var(--gold-primary)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    {edu.name}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <span>{formatDateRange(edu.startDate, edu.endDate)}</span>
                    <span style={{ color: 'var(--gold-muted)' }}>Grade: {edu.grade}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Certifications */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Award size={16} color="var(--gold-primary)" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-primary)',
                }}
              >
                Certifications
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.8rem 1rem',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '10px',
                    background: 'rgba(17,17,24,0.5)',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--gold-primary)',
                      marginTop: '6px',
                      flexShrink: 0,
                      boxShadow: '0 0 6px var(--gold-primary)',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {cert.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {cert.issuer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}