"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { systemClosedData } from "../data/systemClosedData";

export default function SystemClosedSection() {
  return <ContentImageSection {...systemClosedData} id="lock-repair" />;
}
