"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGlobe } from "react-icons/fa";
import { MdMenu, MdHome, MdSettings } from "react-icons/md";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/backoffice/dashboard",
      icon: <MdHome size={20} />,
    },
    {
      label: "Menu",
      path: "/backoffice/menu",
      icon: <MdMenu size={20} />,
    },
    {
      label: "Site Internet",
      path: "/backoffice/site",
      icon: <FaGlobe size={20} />,
    },

    {
      label: "Paramètres",
      path: "/backoffice/settings",
      icon: <MdSettings size={20} />,
    },
  ];

  return (
    <aside className="w-64 bg-primary-dark/50 h-screen fixed left-0 top-0 border-r border-accent/10">
      <div className="p-4">
        <h2 className="text-xl font-bold text-accent mb-8">Administration</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === item.path
                  ? "bg-accent text-primary"
                  : "text-white/80 hover:bg-accent/20"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
