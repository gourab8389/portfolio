'use client';

import { useState, type FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter } from '@tabler/icons-react';
import { useProfile } from '@/hooks/usePortfolio';
import { submitContactForm } from '@/hooks/api';
import { SectionWrapper, Button } from '@/components/ui';
import { SITE_META, CONTACT_SUCCESS_MESSAGE, CONTACT_ERROR_MESSAGE } from '@/constants';
import type { ContactFormPayload } from '@/types';


type Status = 'idle' | 'loading' | 'success' | 'error';

export function ContactSection() {
  const { profile } = useProfile();

  const [form, setForm] = useState<ContactFormPayload>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus]   = useState<Status>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('loading');
    try {
      const result = await submitContactForm(form);
      if (result.success) {
        setStatus('success');
        setStatusMsg(CONTACT_SUCCESS_MESSAGE);
        setForm({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setStatus('error');
      setStatusMsg(
        err instanceof Error ? err.message : CONTACT_ERROR_MESSAGE
      );
    }

    setTimeout(() => setStatus('idle'), 6000);
  };

  const email    = profile?.email       ?? SITE_META.email;
  const phone    = profile?.phoneNumber;
  const location = profile?.location    ?? SITE_META.location;
  const github   = profile?.githubUrl   ?? SITE_META.github;
  const linkedin = profile?.linkedinUrl ?? SITE_META.linkedin;
  const twitter  = profile?.twitterUrl;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '10px',
    padding: '0.85rem 1.1rem',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  };

  return (
    <SectionWrapper id="contact" label="// reach out" title="Get In Touch">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        {/* Left — Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
            I&apos;m always open to discussing new opportunities, interesting projects,
            or just having a great conversation about tech. Drop me a message!
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: Mail,    value: email,    href: `mailto:${email}` },
              { icon: Phone,   value: phone,    href: phone ? `tel:${phone}` : undefined },
              { icon: MapPin,  value: location, href: undefined },
            ]
              .filter((i) => i.value)
              .map(({ icon: Icon, value, href }) => (
                <div key={value} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'var(--gold-glow)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} color="var(--gold-primary)" />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {value}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{value}</span>
                  )}
                </div>
              ))}
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { href: github,   icon: IconBrandGithub,   label: 'GitHub' },
              { href: linkedin, icon: IconBrandLinkedin, label: 'LinkedIn' },
              ...(twitter ? [{ href: twitter, icon: IconBrandTwitter, label: 'Twitter' }] : []),
            ]
              .filter((s) => s.href)
              .map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    background: 'transparent',
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
          </div>
        </div>

        {/* Right — Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <label
                htmlFor="name"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                }}
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--border-default)';
                  e.target.style.boxShadow = '0 0 0 3px var(--gold-glow)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-subtle)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  color: 'var(--text-muted)',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase',
                }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--border-default)';
                  e.target.style.boxShadow = '0 0 0 3px var(--gold-glow)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-subtle)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                marginBottom: '0.4rem',
                textTransform: 'uppercase',
              }}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Tell me about your project or just say hello..."
              rows={6}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--border-default)';
                e.target.style.boxShadow = '0 0 0 3px var(--gold-glow)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-subtle)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Status Message */}
          {status !== 'idle' && status !== 'loading' && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                padding: '0.9rem 1.1rem',
                borderRadius: '10px',
                background:
                  status === 'success'
                    ? 'rgba(52,211,153,0.08)'
                    : 'rgba(248,113,113,0.08)',
                border: `1px solid ${status === 'success' ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
                fontSize: '0.85rem',
                color: status === 'success' ? '#34d399' : '#f87171',
              }}
            >
              {status === 'success' ? (
                <CheckCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
              ) : (
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
              )}
              {statusMsg}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={status === 'loading'}
            style={{ width: '100%', position: 'relative' }}
          >
            {status === 'loading' ? (
              <>
                <span
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(5,5,7,0.3)',
                    borderTopColor: 'var(--bg-primary)',
                    borderRadius: '50%',
                    animation: 'spin-slow 0.7s linear infinite',
                    display: 'inline-block',
                  }}
                />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} />
                Send Message
              </>
            )}
          </Button>
        </form>
      </div>
    </SectionWrapper>
  );
}