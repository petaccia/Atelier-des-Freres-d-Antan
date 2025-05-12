"use client";
import BackofficeLayout from "@/backoffice/components/layouts/BackofficeLayout";
import BackofficeHeaderLocationPage from "@/backoffice/components/navigation/BackofficeHeaderLocationPage";
import BackofficeHeaderTitle from "@/backoffice/components/navigation/BackofficeHeaderTitle";
import BeforeAfterCard from "@/backoffice/ui/cards/BeforeAfterCard";

const PageMedia = () => {
  return (
    <BackofficeLayout>
      <BackofficeHeaderLocationPage
        parentLink={{
          href: "/backoffice/site",
          label: "Site Internet",
        }}
        currentPage="Médias"
      />
      <BackofficeHeaderTitle title="Gestion des Médias" />
      
    <BeforeAfterCard 
      title="Atelier Des Frères d'Antan"
      className="mt-8"
       />
      </BackofficeLayout>
  )
}

export default PageMedia;