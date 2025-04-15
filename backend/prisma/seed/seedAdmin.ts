import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function main() {
  try {
    // Create admin
    const adminUsername = 'sebastien';
    
    // Create hashed password
    const hashedPassword = await bcrypt.hash('admin123456', 10);
    
    const admin = await prisma.admin.upsert({
      where: { username: adminUsername },
      update: {},
      create: {
        username: adminUsername,
        password: hashedPassword,
      },
    });

    console.log('admin', admin);
    console.log('✅ Admin créé avec succès');
  } catch (error) {
    console.error('Error seeding admin:', error);
    throw error;
  }
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
