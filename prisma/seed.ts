import { PrismaClient } from '@prisma/client';
import * as bycrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword() {
  try {
    const AdminPassword = await bycrypt.hash(process.env.ADMIN_PASSWORD, 8);
    return AdminPassword;
  } catch (e) {
    console.error(e);
  }
}

async function main() {
  console.log('-------------Seed started-------------');
  const AdminPassword = await hashPassword();
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: '374d62188213453485196@admin.com',
      password: AdminPassword,
    },
  });
  await prisma.admin.create({
    data: {
      userID: 1,
    },
  });

  console.log('🔗   Admin created');

  await prisma.languege.createMany({
    data: [
      {
        LanguegeName: 'Inglês',
      },
      {
        LanguegeName: 'Francês',
      },
      {
        LanguegeName: 'Alemão',
      },
      {
        LanguegeName: 'Libras',
      },
      {
        LanguegeName: 'Espanhol',
      },
      {
        LanguegeName: 'Italiano',
      },
    ],
  });

  console.log('👅   Langueges created');

  await prisma.classLevel.createMany({
    data: [
      {
        LevelName: 'Inciante',
      },
      {
        LevelName: 'Básico',
      },
      {
        LevelName: 'Intermediário',
      },
      {
        LevelName: 'Avançado',
      },
      {
        LevelName: 'Instrumental',
      },
    ],
  });

  console.log('📚   Class levels created');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
