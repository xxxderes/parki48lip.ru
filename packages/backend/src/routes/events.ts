import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '@/lib/prisma.js';
import { asyncHandler, AppError } from '@/middleware/errorHandler.js';
import { authenticate, authorize } from '@/middleware/auth.js';

const router: Router = Router();

const eventSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  location: z.string().optional(),
  parkId: z.string().optional(),
  image: z.string().url().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  capacity: z.number().int().positive().optional(),
  price: z.number().nonnegative().optional(),
  category: z.string().optional(),
});

router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const events = await prisma.event.findMany({
    where: { isActive: true },
    include: { park: { select: { id: true, name: true, slug: true } } },
    orderBy: { startDate: 'asc' },
  });
  res.json(events);
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const event = await prisma.event.findUnique({
    where: { id: req.params.id },
    include: { park: true },
  });
  if (!event) throw new AppError(404, 'Event not found');
  res.json(event);
}));

router.post('/', authenticate, authorize('superadmin', 'admin'), asyncHandler(async (req: Request, res: Response) => {
  const data = eventSchema.parse(req.body);
  const event = await prisma.event.create({ data });
  res.status(201).json(event);
}));

router.patch('/:id', authenticate, authorize('superadmin', 'admin'), asyncHandler(async (req: Request, res: Response) => {
  const data = eventSchema.partial().parse(req.body);
  const event = await prisma.event.update({
    where: { id: req.params.id },
    data,
  });
  res.json(event);
}));

router.delete('/:id', authenticate, authorize('superadmin'), asyncHandler(async (req: Request, res: Response) => {
  await prisma.event.delete({ where: { id: req.params.id } });
  res.status(204).send();
}));

export default router;