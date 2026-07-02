import { useQuery } from '@tanstack/react-query';
import { fetchParks, fetchParkBySlug } from '@/app/lib/api';
import type { ParkCard, ParkWithRelations } from '@lipetsk-parks/shared';

export function useParks() {
  return useQuery<ParkCard[]>({
    queryKey: ['parks'],
    queryFn: fetchParks,
    staleTime: 5 * 60 * 1000,
  });
}

export function usePark(slug: string | undefined) {
  return useQuery<ParkWithRelations>({
    queryKey: ['park', slug],
    queryFn: () => fetchParkBySlug(slug!),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}