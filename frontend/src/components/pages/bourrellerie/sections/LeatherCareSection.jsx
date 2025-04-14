"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { leatherCareData } from "../data/leatherCareData";

export default function LeatherCareSection() {
  return <ContentImageSection {...leatherCareData} id="leather-care" />;
}
