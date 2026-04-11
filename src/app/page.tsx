'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { Footer } from '@/components/sections/FooterSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { SectionDivider } from '@/components/ui';

export default function HomeClient() {
  useScrollReveal();

  return (
    <main style={{ minHeight: '100vh' }}>
      <HeroSection />
      <SectionDivider />
      <div className="scroll-section"><AboutSection /></div>
      <SectionDivider />
      <div className="scroll-section"><SkillsSection /></div>
      <SectionDivider />
      <div className="scroll-section"><ExperienceSection /></div>
      <SectionDivider />
      <div className="scroll-section"><ProjectsSection /></div>
      <SectionDivider />
      <div className="scroll-section"><ContactSection /></div>
      <div className="scroll-section"><Footer /></div>
    </main>
  );
}