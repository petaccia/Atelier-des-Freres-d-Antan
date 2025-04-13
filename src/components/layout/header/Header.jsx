// header.jsx
"use client";
import Link from "next/link";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import logo from "../../../../public/logo/logo-blue.svg";

export default function Header() {

  return (
    <header className="fixed top-0 w-full bg-primary shadow-md text-white z-10">
      <div className="container mx-auto flex flex-col lg:flex-row py-4 justify-around items-center">
        <Image
          src={logo}
          alt="Logo"
          width={500}
          height={500}
          className="w-[150px] h-[150px]"
        />
        <Link href="/">
            <h1 className="hidden md:block text-xl pt-4 md:mt-0 mb-4 lg:mb-0">Atelier des Frères d'Antan</h1>
        </Link>

        {/* Menu Desktop */}
        <DesktopMenu />

        {/* Menu Mobile */}
        <MobileMenu />
      </div>
    </header>
  );
}
