"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { badgesReproductionData } from "../data/badgesReproductionData";

export default function BadgeReproductionSection() {
  return <ContentImageSection {...badgesReproductionData} id="badges-reproduction"/>;
}
