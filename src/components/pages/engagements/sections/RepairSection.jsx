"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { repairEngagementData } from "../data/engagementsData";

export default function RepairSection() {
  return <ContentImageSection {...repairEngagementData} id="repair-engagement" />;
}
