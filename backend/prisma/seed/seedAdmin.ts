import { PrismaClient } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function main() {
  const hashedPassword = await bcrypt.hash('admin123456', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'ADMIN'
    },
  });

  console.log('admin', admin);
  console.log('✅ Admin créé avec succès');
}
