"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { shoeRepairData } from "../data/shoeRepairData";

export default function ShoesRepairSection() {
  return <ContentImageSection {...shoeRepairData} id="shoes-repair" />;
}
