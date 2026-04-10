import apiClient from '@/lib/axios';
import type { ApiResponse, PortfolioData, ContactFormPayload } from '@/types';

export async function apiFetch<T>(endpoint: string): Promise<T> {
  const { data } = await apiClient.get<ApiResponse<T>>(endpoint);
  if (!data.success || data.data === undefined) {
    throw new Error(data.message ?? 'API returned unsuccessful response');
  }
  return data.data;
}

export async function fetchPortfolioData(): Promise<PortfolioData> {
  return apiFetch<PortfolioData>('/portfolio');
}

export async function submitContactForm(
  payload: ContactFormPayload
): Promise<{ success: boolean; message: string }> {
  const { data } = await apiClient.post<ApiResponse>('/contact', payload);
  return { success: data.success, message: data.message };
}