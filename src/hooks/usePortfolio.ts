'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchPortfolioData } from '@/hooks/api';
import type { PortfolioData } from '@/types';

export const PORTFOLIO_QUERY_KEY = ['portfolio'] as const;

export function usePortfolio() {
  return useQuery<PortfolioData, Error>({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn:  fetchPortfolioData,
    staleTime: 1000 * 60 * 10,
    gcTime:    1000 * 60 * 30, 
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

export function useProfile() {
  const { data, ...rest } = usePortfolio();
  return { profile: data?.profile, ...rest };
}

export function useSkills() {
  const { data, ...rest } = usePortfolio();
  return { skills: data?.skills ?? [], ...rest };
}

export function useExperiences() {
  const { data, ...rest } = usePortfolio();
  return { experiences: data?.experiences ?? [], ...rest };
}

export function useProjects() {
  const { data, ...rest } = usePortfolio();
  return { projects: data?.projects ?? [], ...rest };
}

export function useEducation() {
  const { data, ...rest } = usePortfolio();
  return { education: data?.education ?? [], ...rest };
}