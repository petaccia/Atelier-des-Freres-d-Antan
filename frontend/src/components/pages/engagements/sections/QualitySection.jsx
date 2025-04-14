"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { qualityEngagementData } from "../data/engagementsData";

export default function QualitySection() {
  return <ContentImageSection {...qualityEngagementData} id="quality-engagement" />;
}
