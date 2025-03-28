"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { keyReproductionData } from "../data/keyReproductionData";

export default function KeyReproductionSection() {
  return <ContentImageSection {...keyReproductionData} id="key-reproduction" />;
}