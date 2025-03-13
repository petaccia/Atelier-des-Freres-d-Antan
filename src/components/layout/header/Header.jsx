// header.jsx
"use client";
import Link from 'next/link';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import Image from 'next/image';
import logo from '../../../../public/logo-blue.svg'


export default function Header() {

  return (
    <header className="bg-primary shadow-md text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Image src={logo} alt="Logo" width={100} height={100} />
        <Link href="/">
          <h1 className="text-xl font-bold font-josefin">
            Atelier des Frères d'Antan
          </h1>
        </Link>

        {/* Menu Desktop */}
        <DesktopMenu />

        {/* Menu Mobile */}
        <MobileMenu />
      </div>

    </header>
  );
}