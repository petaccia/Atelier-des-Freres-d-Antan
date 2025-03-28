"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { bagRepairData } from "../data/bagRepairData";

export default function BagRepairSection() {
  return <ContentImageSection {...bagRepairData} id="bag-repair" />;
}