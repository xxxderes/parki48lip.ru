import { Router, Request, Response } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma.js';
import { asyncHandler, AppError } from '@/middleware/errorHandler.js';
import { authenticate, authorize, AuthRequest } from '@/middleware/auth.js';
import { config } from '@/config.js';

const router: Router = Router();

const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = adminLoginSchema.parse(req.body);
  
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin || !admin.isActive) throw new AppError(401, 'Invalid credentials');
  
  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) throw new AppError(401, 'Invalid credentials');
  
  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { lastLogin: new Date() },
  });
  
  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: admin.role },
    config.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({ token, admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role } });
}));

router.get('/me', authenticate, asyncHandler(async (req: AuthRequest, res: Response) => {
  const admin = await prisma.adminUser.findUnique({
    where: { id: req.user!.id },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  res.json(admin);
}));

router.get('/stats', authenticate, asyncHandler(async (_req: AuthRequest, res: Response) => {
  const [parksCount, eventsCount, usersCount] = await Promise.all([
    prisma.park.count(),
    prisma.event.count(),
    prisma.adminUser.count(),
  ]);
  
  res.json({ parksCount, eventsCount, usersCount });
}));

router.get('/parks', authenticate, asyncHandler(async (_req: AuthRequest, res: Response) => {
  const parks = await prisma.park.findMany({
    include: { _count: { select: { events: true, routes: true, zones: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(parks);
}));

router.post('/parks', authenticate, authorize('superadmin', 'admin'), asyncHandler(async (req: AuthRequest, res: Response) => {
  const createParkSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional(),
    shortDescription: z.string().optional(),
    address: z.string().optional(),
    area: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    category: z.string().optional(),
    color: z.string().optional(),
  });
  
  const data = createParkSchema.parse(req.body);
  const park = await prisma.park.create({ data });
  res.status(201).json(park);
}));

router.get('/events', authenticate, asyncHandler(async (_req: AuthRequest, res: Response) => {
  const events = await prisma.event.findMany({
    include: { park: { select: { name: true } } },
    orderBy: { startDate: 'desc' },
  });
  res.json(events);
}));

router.post('/events', authenticate, authorize('superadmin', 'admin'), asyncHandler(async (req: AuthRequest, res: Response) => {
  const createEventSchema = z.object({
    title: z.string().min(1),
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
  
  const data = createEventSchema.parse(req.body);
  const event = await prisma.event.create({ data });
  res.status(201).json(event);
}));

router.get('/users', authenticate, authorize('superadmin'), asyncHandler(async (_req: AuthRequest, res: Response) => {
  const users = await prisma.adminUser.findMany({
    select: { id: true, email: true, name: true, role: true, isActive: true, lastLogin: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });
  res.json(users);
}));

router.post('/users', authenticate, authorize('superadmin'), asyncHandler(async (req: AuthRequest, res: Response) => {
  const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional(),
    role: z.enum(['admin', 'editor', 'superadmin']).default('editor'),
  });
  
  const data = createUserSchema.parse(req.body);
  const passwordHash = await bcrypt.hash(data.password, 12);
  const user = await prisma.adminUser.create({
    data: {
      email: data.email,
      passwordHash,
      name: data.name,
      role: data.role,
    },
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  res.status(201).json(user);
}));

export default router;