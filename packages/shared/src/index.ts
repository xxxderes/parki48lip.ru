import { z } from 'zod';

export const parkSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(100),
  description: z.string().optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  area: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const parkImageSchema = z.object({
  id: z.string().cuid(),
  url: z.string().url(),
  alt: z.string().optional().nullable(),
  order: z.number().int().default(0),
  parkId: z.string().cuid(),
  createdAt: z.date(),
});

export const eventSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1).max(200),
  description: z.string().optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  startDate: z.date(),
  endDate: z.date().optional().nullable(),
  location: z.string().optional().nullable(),
  image: z.string().url().optional().nullable(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  capacity: z.number().int().positive().optional().nullable(),
  price: z.number().nonnegative().optional().nullable(),
  category: z.string().optional().nullable(),
  parkId: z.string().cuid().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const routeSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(200),
  description: z.string().optional().nullable(),
  distance: z.number().positive().optional().nullable(),
  duration: z.number().int().positive().optional().nullable(),
  difficulty: z.string().optional().nullable(),
  gpxData: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  parkId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const zoneSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(200),
  description: z.string().optional().nullable(),
  type: z.string().optional().nullable(),
  coordinates: z.unknown().optional().nullable(),
  isActive: z.boolean().default(true),
  parkId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const adminUserSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  passwordHash: z.string(),
  name: z.string().optional().nullable(),
  role: z.string().default('admin'),
  isActive: z.boolean().default(true),
  lastLogin: z.date().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const pageContentSchema = z.object({
  id: z.string().cuid(),
  slug: z.string().min(1).max(100),
  title: z.string().min(1).max(200),
  content: z.unknown(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const documentSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1).max(200),
  description: z.string().optional().nullable(),
  fileUrl: z.string().url(),
  fileType: z.string(),
  category: z.string().optional().nullable(),
  isPublic: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Park = z.infer<typeof parkSchema>;
export type ParkImage = z.infer<typeof parkImageSchema>;
export type Event = z.infer<typeof eventSchema>;
export type Route = z.infer<typeof routeSchema>;
export type Zone = z.infer<typeof zoneSchema>;
export type AdminUser = z.infer<typeof adminUserSchema>;
export type PageContent = z.infer<typeof pageContentSchema>;
export type Document = z.infer<typeof documentSchema>;

export const createParkSchema = parkSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateParkSchema = createParkSchema.partial();

export const createEventSchema = eventSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateEventSchema = createEventSchema.partial();

export const createRouteSchema = routeSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateRouteSchema = createRouteSchema.partial();

export const createZoneSchema = zoneSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateZoneSchema = createZoneSchema.partial();

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export const parkWithRelationsSchema = parkSchema.extend({
  images: z.array(parkImageSchema).optional(),
  events: z.array(eventSchema).optional(),
  zones: z.array(zoneSchema).optional(),
});

export const parkCardSchema = parkSchema.pick({
  id: true,
  name: true,
  slug: true,
  shortDescription: true,
  description: true,
  area: true,
  latitude: true,
  longitude: true,
  isActive: true,
}).extend({
  images: z.array(parkImageSchema.pick({ url: true, alt: true })).optional(),
  category: z.string().optional().nullable(),
  color: z.string().optional().nullable(),
});

export type ParkWithRelations = z.infer<typeof parkWithRelationsSchema>;
export type ParkCard = z.infer<typeof parkCardSchema>;

export type CreatePark = z.infer<typeof createParkSchema>;
export type UpdatePark = z.infer<typeof updateParkSchema>;
export type CreateEvent = z.infer<typeof createEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
export type CreateRoute = z.infer<typeof createRouteSchema>;
export type UpdateRoute = z.infer<typeof updateRouteSchema>;
export type CreateZone = z.infer<typeof createZoneSchema>;
export type UpdateZone = z.infer<typeof updateZoneSchema>;
export type AdminLogin = z.infer<typeof adminLoginSchema>;
export type Pagination = z.infer<typeof paginationSchema>;