"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { keyDuplicationData } from "../data/keyDuplicationData";

export default function KeyDuplicationSection() {
  return <ContentImageSection {...keyDuplicationData} id="key-duplication" />;
}
