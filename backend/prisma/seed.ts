import { PrismaClient } from '@prisma/client';
import { main as seedAdmin } from './seed/seedAdmin';
import { seedDesktopMenu } from './seed/seedDesktopMenu';
import { seedMobileMenu } from './seed/seedMobileMenu';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');
  
  await seedAdmin();
  await seedDesktopMenu();
  await seedMobileMenu();
  
  console.log('🌱 Seeding terminé !');
}

main()
  .catch((error) => {
    console.error('❌ Erreur pendant le seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
