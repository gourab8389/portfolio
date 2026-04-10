"use client";

import Image from "next/image";
import { Briefcase, Calendar, Tag } from "lucide-react";
import { useExperiences } from "@/hooks/usePortfolio";
import { SectionWrapper, Badge, SkeletonCard } from "@/components/ui";
import { formatDateRange, calcDuration, cn } from "@/lib/utils";
import { EXPERIENCE_TYPE_LABELS } from "@/constants";
import type { ExperienceType } from "@/types";

const TYPE_CLASS_MAP: Record<ExperienceType, string> = {
  organization: "exp-organization",
  internship: "exp-internship",
  college_event: "exp-college_event",
  freelance: "exp-freelance",
  full_time: "exp-full_time",
};

interface ExperienceCardProps {
  experience: {
    id: number;
    organizationName: string;
    organizationImage?: string;
    role: string;
    description: string;
    startDate: string;
    endDate?: string;
    type: ExperienceType;
  };
  index: number;
  isLast: boolean;
}

function ExperienceCard({ experience: exp, isLast }: ExperienceCardProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: "1.5rem",
        alignItems: "flex-start",
        marginBottom: "2rem",
      }}
    >
      {/* Timeline dot + line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          paddingTop: "1.5rem",
        }}
      >
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "var(--gold-primary)",
            border: "3px solid var(--bg-primary)",
            boxShadow: "0 0 12px var(--gold-primary)",
            flexShrink: 0,
          }}
        />
        {!isLast && (
          <div
            style={{
              width: "1px",
              flexGrow: 1,
              minHeight: "60px",
              background:
                "linear-gradient(180deg, var(--gold-primary), transparent)",
              marginTop: "4px",
            }}
          />
        )}
      </div>

      {/* Card — always left aligned */}
      <div style={{ flex: 1 }}>
        <ExperienceCardContent exp={exp} align="left" />
      </div>
    </div>
  );
}

interface ContentProps {
  exp: ExperienceCardProps["experience"];
  align: "left" | "right";
}

function ExperienceCardContent({ exp, align }: ContentProps) {
  return (
    <div
      className="glass-card animate-reveal-up"
      style={{
        borderRadius: "16px",
        padding: "1.4rem 1.6rem",
        textAlign: align,
        marginBottom: "2rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          flexDirection: align === "right" ? "row-reverse" : "row",
          marginBottom: "0.75rem",
        }}
      >
        {exp.organizationImage ? (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              overflow: "hidden",
              flexShrink: 0,
              border: "1px solid var(--border-subtle)",
              position: "relative",
            }}
          >
            <Image
              src={exp.organizationImage}
              alt={exp.organizationName}
              fill
              style={{ objectFit: "cover" }}
              sizes="40px"
            />
          </div>
        ) : (
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--gold-glow)",
              border: "1px solid var(--border-default)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Briefcase size={18} color="var(--gold-primary)" />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontWeight: 600,
              color: "var(--text-primary)",
              fontSize: "0.95rem",
            }}
          >
            {exp.role}
          </div>
          <div style={{ color: "var(--gold-primary)", fontSize: "0.82rem" }}>
            {exp.organizationName}
          </div>
        </div>
      </div>

      {/* Date & Type */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.6rem",
          justifyContent: align === "right" ? "flex-end" : "flex-start",
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--text-muted)",
          }}
        >
          <Calendar size={11} />
          {formatDateRange(exp.startDate, exp.endDate)}
          &nbsp;·&nbsp;{calcDuration(exp.startDate, exp.endDate)}
        </span>
        <span
          className={cn("badge", TYPE_CLASS_MAP[exp.type])}
          style={{ fontSize: "0.65rem" }}
        >
          <Tag size={10} />
          {EXPERIENCE_TYPE_LABELS[exp.type] ?? exp.type}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.85rem",
          lineHeight: 1.7,
        }}
      >
        {exp.description}
      </p>
    </div>
  );
}

export function ExperienceSection() {
  const { experiences, isLoading } = useExperiences();

  // Sort newest first
  const sorted = [...experiences].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  return (
    <SectionWrapper id="experience" label="// journey" title="Experience">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div
          style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}
        >
          {sorted.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              index={i}
              isLast={i === sorted.length - 1}
            />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
