import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMobileMenu() {
  try {
    const mobileMenu = await prisma.menu.upsert({
      where: {
          name: 'main_menu',
        },
      update: {},
      create: {
        name: 'main_menu',
        isActive: true,
      },
    });

    // Accueil
    await prisma.mobileMenuItem.create({
      data: {
        menuId: mobileMenu.id,
        title: 'Accueil',
        path: '/',
        order: 1,
        showIcon: true,
      },
    });

    // Cordonnerie avec sous-menus
    await prisma.mobileMenuItem.create({
      data: {
        menuId: mobileMenu.id,
        title: 'La cordonnerie',
        path: '/la-cordonnerie',
        order: 2,
        showIcon: true,
        children: {
          create: [
            {
              menuId: mobileMenu.id,
              title: 'La cordonnerie traditionnelle',
              path: '/la-cordonnerie-traditionnelle',
              order: 1,
            },
            {
              menuId: mobileMenu.id,
              title: 'La bourrellerie',
              path: '/la-bourrellerie',
              order: 2,
            },
          ],
        },
      },
    });

    // Serrurerie avec sous-menus
    await prisma.mobileMenuItem.create({
      data: {
        menuId: mobileMenu.id,
        title: 'La serrurerie',
        path: '/la-serrurerie',
        order: 3,
        showIcon: true,
        children: {
          create: [
            {
              menuId: mobileMenu.id,
              title: 'La serrurerie traditionnelle',
              path: '/la-serrurerie-traditionnelle',
              order: 1,
            },
            {
              menuId: mobileMenu.id,
              title: 'Votre projet',
              path: '/mon-projet',
              order: 2,
            },
          ],
        },
      },
    });

    // À propos avec sous-menus (incluant le processus)
    await prisma.mobileMenuItem.create({
      data: {
        menuId: mobileMenu.id,
        title: 'À propos',
        path: '/a-propos',
        order: 4,
        showIcon: true,
        children: {
          create: [
            {
              menuId: mobileMenu.id,
              title: 'Notre processus',
              path: '/process',
              order: 1,
            },
            {
              menuId: mobileMenu.id,
              title: 'Nos savoir-faire',
              path: '/nos-savoir-faire',
              order: 2,
            },
            {
              menuId: mobileMenu.id,
              title: 'Nos engagements',
              path: '/nos-engagements',
              order: 3,
            },
            {
              menuId: mobileMenu.id,
              title: 'Notre histoire',
              path: '/notre-histoire',
              order: 4,
            },
          ],
        },
      },
    });

    // Contact
    await prisma.mobileMenuItem.create({
      data: {
        menuId: mobileMenu.id,
        title: 'Contact',
        path: '/contact',
        order: 5,
        showIcon: true,
      },
    });

    console.log('✅ Mobile Menu created successfully');
    return { mobileMenu };
  } catch (error) {
    console.error('Error seeding mobile menu:', error);
    throw error;
  }
}