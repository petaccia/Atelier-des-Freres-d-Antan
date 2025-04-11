"use client";
import PageTitle from "@/components/ui/pageTitle/PageTitle";
import Newsletter from "@/components/ui/newsletter/Newsletter";

export default function NewsletterExamplePage() {
  return (
    <div className="bg-primary pt-32">
      <PageTitle 
        title="Exemple de Newsletter" 
        subtitle="Voici comment utiliser le composant Newsletter réutilisable"
      />
      
      {/* Exemple d'utilisation avec les valeurs par défaut */}
      <div className="py-8">
        <h2 className="text-center text-2xl text-whiteAmber mb-8">Exemple avec les valeurs par défaut</h2>
        <Newsletter />
      </div>
      
      {/* Exemple d'utilisation avec des valeurs personnalisées */}
      <div className="py-8">
        <h2 className="text-center text-2xl text-whiteAmber mb-8">Exemple avec des valeurs personnalisées</h2>
        <Newsletter 
          title="Restez informé de nos actualités"
          description="Inscrivez-vous à notre newsletter pour recevoir nos dernières nouvelles, conseils et offres spéciales directement dans votre boîte mail."
          buttonText="S'ABONNER"
          loadingText="Traitement..."
          successMessage="Félicitations ! Vous êtes maintenant inscrit à notre newsletter."
          privacyText="J'accepte de recevoir des emails et je reconnais avoir lu la politique de confidentialité"
          placeholderText="Entrez votre email"
          bgClassName="bg-black"
        />
      </div>
      
      {/* Exemple d'utilisation avec une fonction de soumission personnalisée */}
      <div className="py-8">
        <h2 className="text-center text-2xl text-whiteAmber mb-8">Exemple avec fonction de soumission personnalisée</h2>
        <Newsletter 
          title="Newsletter des artisans"
          description="Abonnez-vous pour recevoir des conseils d'experts en serrurerie et cordonnerie."
          onSubmit={async (email) => {
            console.log("Email soumis:", email);
            // Ici, vous pourriez appeler une API pour enregistrer l'email
            await new Promise(resolve => setTimeout(resolve, 2000));
            return true;
          }}
        />
      </div>
    </div>
  );
}
