"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { materialsEngagementData } from "../data/engagementsData";

export default function MaterialsSection() {
  return <ContentImageSection {...materialsEngagementData} id="materials-engagement" />;
}
