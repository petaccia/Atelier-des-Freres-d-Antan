"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { leatherRepairData } from "../data/LeatherRepairData";

export default function LeatherRepairSection() {
  return <ContentImageSection {...leatherRepairData} id="leather-repair" />;
}
