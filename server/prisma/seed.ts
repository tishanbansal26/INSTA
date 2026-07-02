import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting DB Seed...');

  // 1. Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@insureflow.com' },
    update: {},
    create: {
      email: 'admin@insureflow.com',
      password: hashedPassword,
      name: 'System Admin',
      role: Role.ADMIN,
      isActive: true,
    },
  });
  console.log('Admin user created: ' + admin.email);

  // 2. Create Companies
  const hdfc = await prisma.company.upsert({
    where: { code: 'HDFC' },
    update: {},
    create: {
      code: 'HDFC',
      description: 'HDFC Ergo General Insurance',
      isActive: true,
    },
  });

  const star = await prisma.company.upsert({
    where: { code: 'STAR' },
    update: {},
    create: {
      code: 'STAR',
      description: 'Star Health and Allied Insurance',
      isActive: true,
    },
  });
  console.log('Companies created.');

  // 3. Create Plans
  const optimaRestore = await prisma.plan.upsert({
    where: { code: 'OPT-RESTORE' },
    update: {},
    create: {
      code: 'OPT-RESTORE',
      name: 'Optima Restore',
      companyId: hdfc.id,
      category: 'HEALTH',
      description: 'Restores sum insured automatically',
      isActive: true,
    },
  });

  const familyHealthOptima = await prisma.plan.upsert({
    where: { code: 'FHO' },
    update: {},
    create: {
      code: 'FHO',
      name: 'Family Health Optima',
      companyId: star.id,
      category: 'HEALTH',
      description: 'Comprehensive family floater plan',
      isActive: true,
    },
  });
  console.log('Plans created.');

  // 4. Create Premium Rates (Base Mock Data)
  await prisma.premiumRate.createMany({
    skipDuplicates: true,
    data: [
      {
        planId: optimaRestore.id,
        companyId: hdfc.id,
        sumInsured: 500000,
        ageFrom: 18,
        ageTo: 35,
        gender: 'MALE',
        tenure: 1,
        premium: 7500,
        gst: 1350,
      },
      {
        planId: optimaRestore.id,
        companyId: hdfc.id,
        sumInsured: 500000,
        ageFrom: 36,
        ageTo: 50,
        gender: 'MALE',
        tenure: 1,
        premium: 10500,
        gst: 1890,
      },
      {
        planId: familyHealthOptima.id,
        companyId: star.id,
        sumInsured: 1000000,
        ageFrom: 18,
        ageTo: 40,
        gender: 'MALE',
        tenure: 1,
        premium: 14000,
        gst: 2520,
      },
    ],
  });
  console.log('Premium Rates created.');

  // 5. Create Clients
  const client1 = await prisma.client.upsert({
    where: { email: 'rahul.s@example.com' },
    update: {},
    create: {
      firstName: 'Rahul',
      lastName: 'Sharma',
      email: 'rahul.s@example.com',
      phone: '+919876543210',
      dob: new Date('1985-06-15'),
      gender: 'MALE',
      addressLine1: '123 Tech Park, Bangalore',
      createdById: admin.id,
    },
  });

  const client2 = await prisma.client.upsert({
    where: { email: 'priya.p@example.com' },
    update: {},
    create: {
      firstName: 'Priya',
      lastName: 'Patel',
      email: 'priya.p@example.com',
      phone: '+919876543211',
      dob: new Date('1990-08-22'),
      gender: 'FEMALE',
      addressLine1: '456 StartUp Hub, Mumbai',
      createdById: admin.id,
    },
  });
  console.log('Clients created.');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
