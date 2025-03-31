"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { customBeltsData } from "../data/customBeltsData";

export default function CustomBeltsSection() {
  return <ContentImageSection {...customBeltsData} id="custom-belts" />;
}