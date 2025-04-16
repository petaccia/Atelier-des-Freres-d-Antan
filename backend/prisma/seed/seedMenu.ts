import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedMenu() {
  try {
    // Create main menu
    const mainMenu = await prisma.menu.upsert({
      where: { name: 'main_menu' },
      update: {},
      create: {
        name: 'main_menu',
        isActive: true,
      },
    });

    // Create Accueil
    await prisma.menuItem.create({
      data: {
        menuId: mainMenu.id,
        title: 'Accueil',
        path: '/',
        order: 1,
      },
    });

    // Create Cordonnerie with sub-items
    const cordonnerie = await prisma.menuItem.create({
      data: {
        menuId: mainMenu.id,
        title: 'La cordonnerie',
        path: '/la-cordonnerie',
        order: 2,
        children: {
          create: [
            {
              menuId: mainMenu.id,
              title: 'La cordonnerie traditionnelle',
              path: '/la-cordonnerie-traditionnelle',
              order: 1,
            },
            {
              menuId: mainMenu.id,
              title: 'La bourrellerie',
              path: '/la-bourrellerie',
              order: 2,
            },
          ],
        },
      },
    });

    // Create Serrurerie with sub-items
    const serrurerie = await prisma.menuItem.create({
      data: {
        menuId: mainMenu.id,
        title: 'La serrurerie',
        path: '/la-serrurerie',
        order: 3,
        children: {
          create: [
            {
              menuId: mainMenu.id,
              title: 'La serrurerie traditionnelle',
              path: '/la-serrurerie-traditionnelle',
              order: 1,
            },
            {
              menuId: mainMenu.id,
              title: 'Votre projet',
              path: '/mon-projet',
              order: 2,
            },
          ],
        },
      },
    });

    // Create Processus
    await prisma.menuItem.create({
      data: {
        menuId: mainMenu.id,
        title: 'Notre processus',
        path: '/process',
        order: 4,
      },
    });

    // Create À propos with sub-items
    const aPropos = await prisma.menuItem.create({
      data: {
        menuId: mainMenu.id,
        title: 'À propos',
        path: '/a-propos',
        order: 5,
        children: {
          create: [
            {
              menuId: mainMenu.id,
              title: 'Nos savoir-faire',
              path: '/nos-savoir-faire',
              order: 1,
            },
            {
              menuId: mainMenu.id,
              title: 'Nos engagements',
              path: '/nos-engagements',
              order: 2,
            },
            {
              menuId: mainMenu.id,
              title: 'Notre histoire',
              path: '/notre-histoire',
              order: 3,
            },
          ],
        },
      },
    });

    // Create Contact
    await prisma.menuItem.create({
      data: {
        menuId: mainMenu.id,
        title: 'Contact',
        path: '/contact',
        order: 6,
      },
    });

    console.log('✅ Menus created successfully');
    return { mainMenu };
  } catch (error) {
    console.error('Error seeding menus:', error);
    throw error;
  } 
};




