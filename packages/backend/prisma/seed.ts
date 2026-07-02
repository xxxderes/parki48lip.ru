import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user (password: admin123 - change in production!)
  await prisma.adminUser.upsert({
    where: { email: 'admin@lipetsk-parks.ru' },
    update: {},
    create: {
      email: 'admin@lipetsk-parks.ru',
      passwordHash: await hashPassword('admin123'),
      name: 'Администратор',
      role: 'superadmin',
    },
  });

  // Create parks
  const nizhnyPark = await prisma.park.upsert({
    where: { slug: 'nizhny-park' },
    update: {},
    create: {
      name: 'Нижний парк',
      slug: 'nizhny-park',
      description: 'Старейший парк Липецка, основанный в 1805 году. Здесь каскадные пруды, фонтаны, редкие породы деревьев, цветочные клумбы и множество беседок.',
      shortDescription: 'Исторический парк XIX века с каскадными прудами и фонтанами',
      address: 'Ул. Интернациональная, 15, Липецк',
      area: '46 га',
      latitude: 52.6031,
      longitude: 39.5708,
      isActive: true,
      category: 'Исторический',
      color: '#a3e635',
    },
  });

  const pobedyPark = await prisma.park.upsert({
    where: { slug: 'pobedy-park' },
    update: {},
    create: {
      name: 'Парк Победы',
      slug: 'pobedy-park',
      description: 'Крупнейший парк города с аллеями боевой славы, амфитеатром, пляжем и современными спортивными зонами. Идеальное место для активного отдыха.',
      shortDescription: 'Крупнейший парк с аллеями боевой славы и пляжем',
      address: 'Проспект Победы, 45, Липецк',
      area: '73 га',
      latitude: 52.6150,
      longitude: 39.6250,
      isActive: true,
      category: 'Культурный',
      color: '#fbbf24',
    },
  });

  const byxanovPark = await prisma.park.upsert({
    where: { slug: 'bysanov-sad' },
    update: {},
    create: {
      name: 'Быханов сад',
      slug: 'bysanov-sad',
      description: 'Уютный тенистый сад в центре города с оранжереей, цветниками и кафе среди зелени. Идеально для тихих прогулок и любителей ботаники.',
      shortDescription: 'Ботанический сад с оранжереей и цветниками',
      address: 'Ул. Ленина, 32, Липецк',
      area: '12 га',
      latitude: 52.5950,
      longitude: 39.5800,
      isActive: true,
      category: 'Ботанический',
      color: '#f97316',
    },
  });

  const gorodskoyPark = await prisma.park.upsert({
    where: { slug: 'gorodskoy-sad' },
    update: {},
    create: {
      name: 'Городской сад',
      slug: 'gorodskoy-sad',
      description: 'Сердце старого Липецка: летняя эстрада, фонтан «Времена года» и вековые дубы. Живое место города для коротких отдыхов и встреч.',
      shortDescription: 'Центральный городской сад с фонтаном и эстрадой',
      address: 'Ул. Советская, 100, Липецк',
      area: '8 га',
      latitude: 52.6080,
      longitude: 39.6120,
      isActive: true,
      category: 'Городской',
      color: '#2dd4bf',
    },
  });

  const zooPark = await prisma.park.upsert({
    where: { slug: 'zoopark' },
    update: {},
    create: {
      name: 'Липецкий зоопарк',
      slug: 'zoopark',
      description: 'Уникальная зоология с редкими видами животных, павильонами и интерактивными зонами. Идеально для поездки с детьми и изучения фауны.',
      shortDescription: 'Зоопарк с редкими животными и интерактивными зонами',
      address: 'Ул. Зоологическая, 1, Липецк',
      area: '25 га',
      latitude: 52.5900,
      longitude: 39.5650,
      isActive: true,
      category: 'Семейный',
      color: '#a855f7',
    },
  });

  // Add park images
  await prisma.parkImage.createMany({
    data: [
      { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', alt: 'Нижний парк вид', parkId: nizhnyPark.id, order: 0 },
      { url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d26e1?w=800', alt: 'Нижний парк пруд', parkId: nizhnyPark.id, order: 1 },
      { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', alt: 'Нижний парк аллея', parkId: nizhnyPark.id, order: 2 },
      
      { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800', alt: 'Парк Победы вид', parkId: pobedyPark.id, order: 0 },
      { url: 'https://images.unsplash.com/photo-1542206395-9feb3ed6b610?w=800', alt: 'Парк Победы пляж', parkId: pobedyPark.id, order: 1 },
      { url: 'https://images.unsplash.com/photo-1558618047-f4b511e5d2ca?w=800', alt: 'Парк Победы амфитеатр', parkId: pobedyPark.id, order: 2 },
      
      { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800', alt: 'Быханов сад оранжерея', parkId: byxanovPark.id, order: 0 },
      { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800', alt: 'Быханов сад цветники', parkId: byxanovPark.id, order: 1 },
      
      { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800', alt: 'Городской сад фонтан', parkId: gorodskoyPark.id, order: 0 },
      { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800', alt: 'Городской сад эстрада', parkId: gorodskoyPark.id, order: 1 },
      
      { url: 'https://images.unsplash.com/photo-1474511320723-9a56873867b3?w=800', alt: 'Зоопарк вход', parkId: zooPark.id, order: 0 },
      { url: 'https://images.unsplash.com/photo-1546182990-d1c898c8c8a0f6?w=800', alt: 'Зоопарк павильон', parkId: zooPark.id, order: 1 },
      { url: 'https://images.unsplash.com/photo-1564349683136-77e08c1c1535?w=800', alt: 'Зоопарк животные', parkId: zooPark.id, order: 2 },
    ],
    skipDuplicates: true,
  });

  // Add zones for parks
  await prisma.zone.createMany({
    data: [
      { name: 'Каскадные пруды', description: 'Центр парка', color: '#4ade80', coordinates: { lat: 52.604, lng: 39.600 }, parkId: nizhnyPark.id, isActive: true },
      { name: 'Оранжерея', description: 'Редкие растения', color: '#fbbf24', coordinates: { lat: 52.603, lng: 39.599 }, parkId: nizhnyPark.id, isActive: true },
      
      { name: 'Амфитеатр', description: 'Концерты', color: '#f97316', coordinates: { lat: 52.616, lng: 39.626 }, parkId: pobedyPark.id, isActive: true },
      { name: 'Пляж', description: 'Зона отдыха', color: '#4ade80', coordinates: { lat: 52.614, lng: 39.624 }, parkId: pobedyPark.id, isActive: true },
      
      { name: 'Оранжерея', description: 'Растения', color: '#a855f7', coordinates: { lat: 52.596, lng: 39.581 }, parkId: byxanovPark.id, isActive: true },
      
      { name: 'Сквер', description: 'Главный вход', color: '#4ade80', coordinates: { lat: 52.609, lng: 39.613 }, parkId: gorodskoyPark.id, isActive: true },
      
      { name: 'Экспозиция', description: 'Животные', color: '#fbbf24', coordinates: { lat: 52.591, lng: 39.566 }, parkId: zooPark.id, isActive: true },
    ],
    skipDuplicates: true,
  });

  // Create events
  await prisma.event.createMany({
    data: [
      {
        title: 'Фестиваль «Зелёный Липецк»',
        description: 'Ежегодный фестиваль цветов и ландшафтного дизайна в Нижнем парке.',
        shortDescription: 'Цветочный фестиваль в Нижнем парке',
        startDate: new Date('2025-07-15T10:00:00Z'),
        endDate: new Date('2025-07-15T20:00:00Z'),
        location: 'Нижний парк',
        parkId: nizhnyPark.id,
        image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800',
        isActive: true,
        isFeatured: true,
        category: 'Фестиваль',
      },
      {
        title: 'Йога на рассвете',
        description: 'Еженедельные занятия йогой в Верхнем парке.',
        shortDescription: 'Утренняя йога под открытым небом',
        startDate: new Date('2025-07-20T06:00:00Z'),
        endDate: new Date('2025-07-20T07:30:00Z'),
        location: 'Парк Победы, центральная аллея',
        parkId: pobedyPark.id,
        isActive: true,
        category: 'Спорт',
      },
      {
        title: 'Ботанический тур',
        description: 'Экскурсия по оранжерее Быханова сада с рассказом о редких растениях.',
        shortDescription: 'Экскурсия по оранжерее',
        startDate: new Date('2025-07-25T14:00:00Z'),
        endDate: new Date('2025-07-25T16:00:00Z'),
        location: 'Быханов сад, оранжерея',
        parkId: byxanovPark.id,
        isActive: true,
        category: 'Образование',
      },
      {
        title: 'Концерт на эстраде',
        description: 'Вечерний концерт местных коллективов в Городском саду.',
        shortDescription: 'Летний концерт на открытой эстраде',
        startDate: new Date('2025-08-01T19:00:00Z'),
        endDate: new Date('2025-08-01T21:00:00Z'),
        location: 'Городской сад, летняя эстрада',
        parkId: gorodskoyPark.id,
        isActive: true,
        isFeatured: true,
        category: 'Концерт',
      },
      {
        title: 'День зверя',
        description: 'Специальная программа для детей: знакомство с животными, кормления, мастер-классы.',
        shortDescription: 'Детский праздник в зоопарке',
        startDate: new Date('2025-08-10T10:00:00Z'),
        endDate: new Date('2025-08-10T17:00:00Z'),
        location: 'Липецкий зоопарк',
        parkId: zooPark.id,
        isActive: true,
        isFeatured: true,
        category: 'Семейное',
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Database seeded successfully!');
}

async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 12);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });