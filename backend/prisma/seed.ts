import { PrismaClient } from '../generated/prisma';
import { main as seedAdmin } from './seed/seedAdmin';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');
  
  await seedAdmin();
  
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
