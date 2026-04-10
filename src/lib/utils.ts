import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Skill, SkillGroup } from '@/types';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDateRange(
  startDate?: string,
  endDate?: string,
  fallback = 'Present'
): string {
  const format = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  const start = startDate ? format(startDate) : '';
  const end   = endDate   ? format(endDate)   : fallback;
  if (!start) return end;
  return `${start} – ${end}`;
}

export function calcDuration(startDate?: string, endDate?: string): string {
  if (!startDate) return '';
  const start = new Date(startDate);
  const end   = endDate ? new Date(endDate) : new Date();
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  const yr  = Math.floor(months / 12);
  const mo  = months % 12;
  const parts: string[] = [];
  if (yr > 0) parts.push(`${yr} yr${yr > 1 ? 's' : ''}`);
  if (mo > 0) parts.push(`${mo} mo${mo > 1 ? 's' : ''}`);
  return parts.join(' ') || 'Less than a month';
}

export function groupSkillsByCategory(skills: Skill[]): SkillGroup[] {
  const map = new Map<string, Skill[]>();
  skills.forEach((skill) => {
    const cat = skill.category ?? 'Other';
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(skill);
  });
  return Array.from(map.entries()).map(([category, skills]) => ({
    category,
    skills,
  }));
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen).trimEnd() + '…';
}

export function proficiencyToPercent(proficiency: string): number {
  const map: Record<string, number> = {
    beginner:     25,
    elementary:   40,
    intermediate: 60,
    advanced:     80,
    expert:       95,
  };
  return map[proficiency.toLowerCase()] ?? 70;
}

export function staggerDelay(index: number, base = 100): number {
  return index * base;
}