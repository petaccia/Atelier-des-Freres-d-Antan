"use client";
import ContactFormSection from "@/components/pages/contact/sections/ContactFormSection";
import CoordinatesSection from "@/components/pages/contact/sections/CoordinatesSection";
import FaqSection from "@/components/pages/contact/sections/FaqSection";
import IntroPageContact from "@/components/pages/contact/sections/IntroPageContact";
import NewsletterSection from "@/components/pages/contact/sections/NewsletterSection";
import ContactHero from "@/components/pages/contact/sections/ContactHero";

export default function Contact() {
  return (
    <div className="bg-primary pt-20">
      <ContactHero />
        <IntroPageContact />
        <ContactFormSection />
        <CoordinatesSection />
        <NewsletterSection />
        <FaqSection />
    </div>
    );
}