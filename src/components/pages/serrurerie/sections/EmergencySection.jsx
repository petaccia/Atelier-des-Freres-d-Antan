"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { emergencyData } from "../data/emergencyData";

export default function EmergencySection() {
  return <ContentImageSection {...emergencyData} id="emergency" />;
}