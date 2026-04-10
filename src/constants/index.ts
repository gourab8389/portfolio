import type { NavLink } from "@/types";

export const SITE_META = {
  name: "Gourab Dey",
  initials: "GD",
  title: "Full Stack Developer",
  tagline: "Building scalable web experiences",
  email: "deyg6988@gmail.com",
  location: "Kolkata, West Bengal, India",
  github: "https://github.com/gourab8389",
  linkedin: "https://www.linkedin.com/in/gourab-dey-1b2b8928a",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const HERO_STATS = [
  { value: "1+", label: "Years Experience" },
  { value: "5+", label: "Projects Shipped" },
  { value: "70%", label: "Dev Efficiency" },
  { value: "3", label: "AWS Certs" },
] as const;

export const SKILL_CATEGORY_ORDER: string[] = [
  "Frontend",
  "Backend",
  "Databases",
  "DevOps & Cloud",
  "Concepts & Methodologies",
  "Soft Skills",
];

export const EXPERIENCE_TYPE_LABELS: Record<string, string> = {
  organization: "Organization",
  internship: "Internship",
  college_event: "College Event",
  freelance: "Freelance",
  full_time: "Full Time",
};

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  personal: "Personal",
  client: "Client",
  academic: "Academic",
  internship: "Internship",
  freelance: "Freelance",
  open_source: "Open Source",
  company: "Company",
};

export const CERTIFICATIONS = [
  {
    title: "AWS Certifications — Cloud Operating Model",
    issuer: "Amazon Web Services",
  },
  { title: "DevOps on AWS", issuer: "Amazon Web Services" },
  { title: "Generative AI", issuer: "Coursera" },
] as const;

export const CONTACT_SUCCESS_MESSAGE =
  "Thanks for reaching out! I will get back to you as soon as possible.";

export const CONTACT_ERROR_MESSAGE =
  "Something went wrong. Please try again or email me directly.";
