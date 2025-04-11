"use client";
import { GiKeyLock, GiRunningShoe } from "react-icons/gi";
import { servicesCordoData } from "../../cordonnerie/data/servicesCordoData";
import { servicesBourrellerieData } from "../../bourrellerie/data/servicesBourrellerieData";
import { servicesSerrurerieData } from "../../serrurerie/data/servicesSerrurerieData";

export const servicesClientData = [
  {
    title: "Cordonnerie",
    icon: GiRunningShoe,
    services: servicesCordoData,
  },
  {
    title: "Bourrellerie",
    icon: "/icons/leather-icon.svg",
    services: servicesBourrellerieData,
  },
  {
    title: "Serrurerie",
    icon: GiKeyLock,
    services: servicesSerrurerieData,
  },
];
