'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Lock, Globe } from 'lucide-react';
import { useProjects } from '@/hooks/usePortfolio';
import { SectionWrapper, Badge, SkeletonCard } from '@/components/ui';
import { PROJECT_TYPE_LABELS } from '@/constants';
import { cn, truncate } from '@/lib/utils';
import type { Project } from '@/types';

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/project/${project.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        className="glass-card group"
        style={{
          borderRadius: '20px',
          padding: 0,
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'none',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Image / Placeholder */}
        <div
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            background: 'var(--bg-card-hover)',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-card-hover) 100%)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  color: 'var(--gold-muted)',
                  letterSpacing: '0.1em',
                  opacity: 0.4,
                }}
              >
                {project.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          {/* Overlay on hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 0%, rgba(5,5,7,0.7) 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
            className="card-overlay"
          />

          {/* Type badge */}
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
            <span className={cn('badge', `type-${project.type}`)}>
              {PROJECT_TYPE_LABELS[project.type] ?? project.type}
            </span>
          </div>

          {/* Privacy indicator */}
          <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
            {project.isPublic ? (
              <Globe size={14} color="var(--gold-primary)" />
            ) : (
              <Lock size={14} color="var(--text-muted)" />
            )}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '1.4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '0.5rem',
            }}
          >
            <h3
              style={{
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--text-primary)',
                lineHeight: 1.3,
              }}
            >
              {project.name}
            </h3>
            <ArrowUpRight
              size={16}
              color="var(--gold-primary)"
              style={{ flexShrink: 0, marginTop: '2px', opacity: 0.7 }}
            />
          </div>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              lineHeight: 1.65,
              flex: 1,
            }}
          >
            {truncate(project.description, 120)}
          </p>

          {/* Tech Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
              {project.technologies.slice(0, 4).map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge variant="outline">+{project.technologies.length - 4}</Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProjectsSection() {
  const { projects, isLoading } = useProjects();

  const sorted = [...projects].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <SectionWrapper id="projects" label="// work" title="Projects">
      {isLoading ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            padding: '4rem 0',
          }}
        >
          No projects available yet.
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {sorted.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}