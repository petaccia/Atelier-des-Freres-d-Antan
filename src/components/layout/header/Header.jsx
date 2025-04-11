// header.jsx
"use client";
import Link from 'next/link';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../../../../public/logo/logo-blue.svg'


export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header className="fixed top-0 w-full bg-primary shadow-md text-white z-10">
      <div className="container mx-auto flex flex-col lg:flex-row py-4 justify-around items-center">
        <Image src={logo} alt="Logo" width={100} height={100} />
        <Link href="/">
          {isHomePage ? (
            <span className="hidden">
              Atelier des Frères d'Antan
            </span>
          ) : (
            <h1 className="text-xl pt-4 md:mt-0 mb-4 lg:mb-0">
              Atelier des Frères d'Antan
            </h1>
          )}
        </Link>

        {/* Menu Desktop */}
        <DesktopMenu />

        {/* Menu Mobile */}
        <MobileMenu />
      </div>

    </header>
  );
}