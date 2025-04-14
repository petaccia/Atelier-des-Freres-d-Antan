"use client";
import Link from "next/link";

export default function ContactButton({ className = "" }) {
  return (
    <Link
      href="/contact"
      className={`inline-block bg-accent text-white text-sm sm:text-base px-6 py-2 rounded-full hover:bg-primary transition-colors duration-200 ${className}`}
    >
      Nous contacter
    </Link>
  );
}
