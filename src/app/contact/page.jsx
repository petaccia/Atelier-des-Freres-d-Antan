"use client";
import ContactFormSection from "@/components/pages/contact/sections/ContactFormSection";
import CoordinatesSection from "@/components/pages/contact/sections/CoordinatesSection";
import FaqSection from "@/components/pages/contact/sections/FaqSection";
import IntroPageContact from "@/components/pages/contact/sections/IntroPageContact";
import NewsletterSection from "@/components/pages/contact/sections/NewsletterSection";

export default function Contact() {
  return (
    <div className="bg-primary">
      <div className="text-center pt-32 mt-20 md:my-8">
        <h1>Contact</h1>
        </div> 
        <IntroPageContact />
        <ContactFormSection />
        <CoordinatesSection />
        <NewsletterSection />
        <FaqSection />
    </div>
    );
}