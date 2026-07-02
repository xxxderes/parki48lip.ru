import type { ParkCard, ParkWithRelations } from '@lipetsk-parks/shared';

const API_BASE = '/api';

export async function fetchParks(): Promise<ParkCard[]> {
  const res = await fetch(`${API_BASE}/parks`);
  if (!res.ok) throw new Error('Failed to fetch parks');
  return res.json();
}

export async function fetchParkBySlug(slug: string): Promise<ParkWithRelations> {
  const res = await fetch(`${API_BASE}/parks/${slug}`);
  if (!res.ok) throw new Error('Park not found');
  return res.json();
}