'use client';

import { useRef } from 'react';
import { useSkills } from '@/hooks/usePortfolio';
import { SectionWrapper, SkeletonCard } from '@/components/ui';
import { groupSkillsByCategory, proficiencyToPercent, cn } from '@/lib/utils';
import { SKILL_CATEGORY_ORDER } from '@/constants';

interface SkillBarProps {
  name: string;
  proficiency: string;
  index: number;
}

function SkillBar({ name, proficiency, index }: SkillBarProps) {
  const percent = proficiencyToPercent(proficiency);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem',
        animationDelay: `${index * 80}ms`,
      }}
      className="animate-reveal-up"
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>
          {name}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em',
          }}
        >
          {proficiency}
        </span>
      </div>
      <div
        style={{
          height: '3px',
          background: 'var(--border-subtle)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percent}%`,
            background: 'linear-gradient(90deg, var(--gold-secondary), var(--gold-primary))',
            borderRadius: '2px',
            boxShadow: '0 0 6px var(--gold-primary)',
            transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  );
}

interface SkillCategoryProps {
  category: string;
  skills: Array<{ id: number; name: string; proficiency: string }>;
}

function SkillCategoryCard({ category, skills }: SkillCategoryProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
  };

  return (
    <div
      ref={cardRef}
      className="glass-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: '18px',
        padding: '1.5rem',
        transition: 'transform 0.1s ease',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {/* Category title with 3D depth */}
      <h3
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase' as const,
          color: 'var(--gold-primary)',
          marginBottom: '1.2rem',
          transform: 'translateZ(20px)',
          display: 'block',
        }}
      >
        {category}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {skills.map((skill, i) => (
          <SkillBar key={skill.id} name={skill.name} proficiency={skill.proficiency} index={i} />
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { skills, isLoading } = useSkills();

  const grouped = groupSkillsByCategory(skills);

  // Sort by defined category order
  const sorted = [...grouped].sort((a, b) => {
    const ai = SKILL_CATEGORY_ORDER.indexOf(a.category);
    const bi = SKILL_CATEGORY_ORDER.indexOf(b.category);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return (
    <SectionWrapper id="skills" label="// expertise" title="Skills & Technologies">

      {isLoading ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {sorted.map(({ category, skills }) => (
            <SkillCategoryCard key={category} category={category} skills={skills} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}