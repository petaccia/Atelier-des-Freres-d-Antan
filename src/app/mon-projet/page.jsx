import ClientRequestForm from "@/components/pages/projet/form/ClientRequestForm";
import ClientHeroSection from "@/components/pages/projet/sections/ClientHeroSection";
import PageTitle from "@/components/ui/pageTitle/PageTitle";

export default function ClientProjectPage() {
  return (
    <div className="bg-primary pt-32">
      <PageTitle title="Mon projet" />
      <ClientHeroSection />
      <ClientRequestForm />
    </div>
  );
}
