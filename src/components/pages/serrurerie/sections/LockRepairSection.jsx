"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { lockRepairData } from "../data/lockRepairData";

export default function LockRepairSection() {
  return <ContentImageSection {...lockRepairData} id="lock-repair" />;
}
