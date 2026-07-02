import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '@/lib/prisma.js';
import { asyncHandler, AppError } from '@/middleware/errorHandler.js';
import { authenticate, authorize } from '@/middleware/auth.js';

const router: Router = Router();

const parkSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(100),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  address: z.string().optional(),
  area: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isActive: z.boolean().default(true),
  category: z.string().optional(),
  color: z.string().optional(),
});

router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const parks = await prisma.park.findMany({
    where: { isActive: true },
    include: {
      images: { orderBy: { order: 'asc' } },
      events: { where: { isActive: true }, take: 3 },
    },
    orderBy: { name: 'asc' },
  });
  res.json(parks);
}));

router.get('/:slug', asyncHandler(async (req: Request, res: Response) => {
  const park = await prisma.park.findUnique({
    where: { slug: req.params.slug },
    include: {
      images: { orderBy: { order: 'asc' } },
      events: { where: { isActive: true }, orderBy: { startDate: 'asc' } },
      routes: { where: { isActive: true } },
      zones: { where: { isActive: true } },
    },
  });
  if (!park) throw new AppError(404, 'Park not found');
  res.json(park);
}));

router.post('/', authenticate, authorize('superadmin', 'admin'), asyncHandler(async (req: Request, res: Response) => {
  const data = parkSchema.parse(req.body);
  const park = await prisma.park.create({ data });
  res.status(201).json(park);
}));

router.patch('/:id', authenticate, authorize('superadmin', 'admin'), asyncHandler(async (req: Request, res: Response) => {
  const data = parkSchema.partial().parse(req.body);
  const park = await prisma.park.update({
    where: { id: req.params.id },
    data,
  });
  res.json(park);
}));

router.delete('/:id', authenticate, authorize('superadmin'), asyncHandler(async (req: Request, res: Response) => {
  await prisma.park.delete({ where: { id: req.params.id } });
  res.status(204).send();
}));

export default router;