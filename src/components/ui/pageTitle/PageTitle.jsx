"use client";
import { usePathname } from "next/navigation";

export default function PageTitle({
  title,
  className = "",
  titleClassName = "text-white rounded-lg",
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <div
      className={`${isHomePage ? "my-4 pt-2 text-center" : "text-center mt-20 my-2 md:my-8"} ${className}`}
    >
      <h1 className={titleClassName}>{title}</h1>
    </div>
  );
}
