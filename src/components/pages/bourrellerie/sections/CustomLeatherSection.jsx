"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { customLeatherData } from "../data/customLeatherData";

export default function CustomLeatherSection() {
  return <ContentImageSection {...customLeatherData} id="custom-belts" />;
}