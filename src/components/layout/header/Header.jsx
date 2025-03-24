// header.jsx
"use client";
import Link from 'next/link';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import Image from 'next/image';
import logo from '../../../../public/logo/logo-blue.svg'


export default function Header() {

  return (
    <header className="fixed top-0 w-full bg-primary shadow-md text-white z-10">
      <div className=" mx-auto  py-4 flex justify-around items-center">
        <Image src={logo} alt="Logo" width={100} height={100} />
        <Link href="/">
          <h1 className="">
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