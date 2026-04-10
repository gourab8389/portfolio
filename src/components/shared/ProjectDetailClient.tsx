'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Lock,
  Globe,
  Calendar,
  Tag,
  Code2,
} from 'lucide-react';
import { IconBrandGithub } from '@tabler/icons-react';
import { useProjects } from '@/hooks/usePortfolio';
import { Badge, Skeleton } from '@/components/ui';
import { formatDateRange, cn } from '@/lib/utils';
import { PROJECT_TYPE_LABELS } from '@/constants';
import type { Project } from '@/types';

export function ProjectDetailClient() {
  const params = useParams();
  const id = Number(params?.id);
  const { projects, isLoading } = useProjects();

  const project = projects.find((p) => p.id === id);

  return (
    <main style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>

        <Link
          href="/#projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
            marginBottom: '2.5rem',
            transition: 'color 0.2s ease',
          }}
        >
          <ArrowLeft size={15} />
          Back to Projects
        </Link>

        {isLoading ? (
          <ProjectDetailSkeleton />
        ) : !project ? (
          <div style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            padding: '4rem 0',
          }}>
            Project not found.
          </div>
        ) : (
          <ProjectDetailContent project={project} />
        )}
      </div>
    </main>
  );
}

function ProjectDetailContent({ project }: { project: Project }) {
  const hasPublicGithub = project.isPublic && project.githubLinks && project.githubLinks.length > 0;
  const hasDeployLink   = project.hasDeployedLink && project.projectLinks && project.projectLinks.length > 0;

  return (
    <article style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

      {project.image && (
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/7',
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)',
        }}>
          <Image
            src={project.image}
            alt={project.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 900px) 100vw, 900px"
            priority
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(5,5,7,0.6) 100%)',
          }} />
        </div>
      )}

      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span className={cn('badge', `type-${project.type}`)}>
            <Tag size={11} />
            {PROJECT_TYPE_LABELS[project.type] ?? project.type}
          </span>

          {project.isPublic ? (
            <span className="badge" style={{ color: 'var(--gold-primary)', borderColor: 'var(--border-default)' }}>
              <Globe size={11} /> Public Repo
            </span>
          ) : (
            <span className="badge" style={{ color: 'var(--text-muted)' }}>
              <Lock size={11} /> Private Repo
            </span>
          )}

          {project.startDate && (
            <span style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)',
            }}>
              <Calendar size={11} />
              {formatDateRange(project.startDate, project.endDate)}
            </span>
          )}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          letterSpacing: '0.04em',
          color: 'var(--text-primary)',
          lineHeight: 1.1,
          marginBottom: '1.2rem',
        }}>
          {project.name}
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {hasDeployLink && project.projectLinks!.map((link, i) => (
            <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <ExternalLink size={15} /> Live Demo
            </a>
          ))}

          {hasPublicGithub && project.githubLinks!.map((link, i) => (
            <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <IconBrandGithub size={15} /> View Code
            </a>
          ))}

          {!hasPublicGithub && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.65rem 1.2rem', border: '1px solid var(--border-subtle)',
              borderRadius: '8px', color: 'var(--text-muted)', fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
            }}>
              <Lock size={13} />
              {project.githubLinks && project.githubLinks.length > 0 ? 'Private Repository' : 'No Repository'}
            </div>
          )}

          {!hasDeployLink && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.65rem 1.2rem', border: '1px solid var(--border-subtle)',
              borderRadius: '8px', color: 'var(--text-muted)', fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
            }}>
              <Code2 size={13} />
              {project.hasDeployedLink === false ? 'Not Deployed' : 'No Live Link'}
            </div>
          )}
        </div>
      </div>

      <div className="glass-card" style={{ borderRadius: '18px', padding: '2rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          letterSpacing: '0.2em', textTransform: 'uppercase' as const,
          color: 'var(--gold-primary)', marginBottom: '1rem',
        }}>
          About This Project
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem', whiteSpace: 'pre-line' as const }}>
          {project.description}
        </p>
      </div>

      {project.technologies && project.technologies.length > 0 && (
        <div className="glass-card" style={{ borderRadius: '18px', padding: '2rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            letterSpacing: '0.2em', textTransform: 'uppercase' as const,
            color: 'var(--gold-primary)', marginBottom: '1.2rem',
          }}>
            Technologies Used
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="gold">{tech}</Badge>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function ProjectDetailSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Skeleton className="w-full rounded-2xl" style={{ aspectRatio: '16/7' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="h-4 w-48" />
      </div>
      <Skeleton className="h-48 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
    </div>
  );
}