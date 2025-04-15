import { PrismaClient } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function main() {
  // Create admin
  const adminUsername = 'sebastien';
  
  // Create hashed password only
  const hashedPassword = await bcrypt.hash('admin123456', 10);
  
  const admin = await prisma.user.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername, // username non hashé
      password: hashedPassword,
    },
  });

  console.log('admin', admin);
  console.log('✅ Admin créé avec succès'); 
}
