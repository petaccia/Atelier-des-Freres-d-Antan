"use client";
import ContentImageSection from "@/components/ui/sections/ContentImageSection";
import { securitySystemData } from "../data/securitySystemData";

export default function SecuritySystemSection() {
  return <ContentImageSection {...securitySystemData} id="traditional-locksmith" />;
}
