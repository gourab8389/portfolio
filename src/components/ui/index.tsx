import { cn } from '@/lib/utils';
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gold' | 'outline';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        'badge',
        variant === 'gold' && 'border-(--border-default) text-(--gold-primary) bg-(--gold-glow)',
        variant === 'outline' && 'border-(--border-subtle) text-(--text-muted)',
        className
      )}
    >
      {children}
    </span>
  );
}


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'btn',
        variant === 'primary' && 'btn-primary',
        variant === 'outline' && 'btn-outline',
        variant === 'ghost'   && 'btn-ghost',
        size === 'sm' && 'text-xs px-3 py-1.5',
        size === 'lg' && 'text-base px-8 py-4',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function LinkButton({
  variant = 'outline',
  size = 'md',
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        'btn',
        variant === 'primary' && 'btn-primary',
        variant === 'outline' && 'btn-outline',
        variant === 'ghost'   && 'btn-ghost',
        size === 'sm' && 'text-xs px-3 py-1.5',
        size === 'lg' && 'text-base px-8 py-4',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl p-6',
        hover && 'cursor-none',
        className
      )}
    >
      {children}
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return <div className={cn('skeleton', className)} style={style} />;
}

export function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  label?: string;
  title?: string;
}

export function SectionWrapper({
  id,
  children,
  className,
  label,
  title,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn('section-base', className)}>
      <div className="container">
        {(label || title) && (
          <div className="mb-12">
            {label && <p className="section-label">{label}</p>}
            {title && <h2 className="section-title">{title}</h2>}
            <div className="divider-gold" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function SectionDivider() {
  return (
    <div
      style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--border-subtle), transparent)',
        margin: '0 auto',
        maxWidth: '1280px',
        padding: '0 4rem',
      }}
    />
  );
}