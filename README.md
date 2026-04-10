# Portfolio Client

A modern, API-driven portfolio frontend built with Next.js, React, and TypeScript. This app renders a polished single-page portfolio experience with animated sections, 3D canvas elements, a dynamic project detail page, and a contact form connected to a backend API.

The README is intentionally written for showcase use, so it focuses on the technical setup instead of personal details.

## Overview

This project is the client application for a portfolio website. It is designed as a content-driven frontend where profile data, skills, experience, projects, and contact actions come from an external API instead of being tightly hardcoded into the UI.

At a high level, the app includes:

- A homepage composed of hero, about, skills, experience, projects, and contact sections
- A dynamic project details page at `/project/[id]`
- API-backed content loading with shared caching through React Query
- A contact form that submits messages to the backend
- Interactive visual presentation with motion, custom styling, and Three.js-based scenes

## Tech Stack

### Core

- Next.js 16 with App Router
- React 19
- TypeScript 5

### Styling and UI

- Tailwind CSS 4
- Custom global CSS with CSS variables
- `next/font` for typography loading
- Lucide and Tabler Icons

### Data Layer

- Axios for HTTP requests
- TanStack React Query for caching and client-side data management

### Animation and Visuals

- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- Custom CSS transitions and keyframe animations

## Technical Highlights

- API-first portfolio architecture: portfolio content is fetched from a backend instead of being embedded directly in the frontend
- Shared query model: one portfolio query is reused across sections and the project detail page
- Dynamic routing: project pages are rendered from the route `src/app/project/[id]`
- Centralized HTTP client: Axios is configured in one place with timeout and response error normalization
- Responsive single-page layout: sections are assembled through the App Router homepage
- Interactive UI system: custom cursor, glassmorphism cards, loading states, skeletons, and animated transitions
- 3D presentation layer: the hero and skills sections use React Three Fiber scenes for visual depth
- Remote image support: Next.js is configured to allow remote images from approved hosts

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    project/[id]/page.tsx
  components/
    sections/
    shared/
    three/
    ui/
  constants/
  hooks/
    api.ts
    usePortfolio.ts
  lib/
    axios.ts
    providers.tsx
    utils.ts
  types/
public/
next.config.ts
package.json
README.md
```

## How It Works

The homepage is built from reusable section components inside `src/components/sections`. Data is fetched through `fetchPortfolioData()` and cached with React Query in `src/lib/providers.tsx` and `src/hooks/usePortfolio.ts`.

The project detail page does not rely on a separate dedicated fetch. Instead, it reads the selected item from the same cached portfolio dataset, which keeps the data flow simple and avoids extra requests when the data is already available on the client.

The contact form submits to the backend through a centralized API helper, and the Axios instance handles consistent headers, base URL configuration, timeout behavior, and error mapping.

## Environment Variables

Create a root-level `.env` or `.env.local` file and define the following variable:

```bash
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
```

### Required Environment Variable

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for the portfolio backend API

### Expected Backend Endpoints

- `GET /portfolio`
- `POST /contact`

If your backend returns image URLs from a domain other than the one already configured in `next.config.ts`, update the `images.remotePatterns` list accordingly.

## Commands

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run the production build locally:

```bash
npm run start
```

By default, the app runs on `http://localhost:3000` during local development.

## Available Scripts

- `npm run dev`: Starts the Next.js development server
- `npm run build`: Builds the app for production
- `npm run start`: Starts the production server after a successful build

## Notes

- This repository currently defines setup and runtime scripts only. Lint and test scripts are not configured in `package.json` yet.
- The frontend expects portfolio content to be served by a separate backend service.
- The current UI system combines Tailwind utilities with a large custom global stylesheet for branding, motion, layout, and visual effects.
