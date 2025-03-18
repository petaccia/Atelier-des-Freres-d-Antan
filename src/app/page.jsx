import CarouselHome from "@/components/carousel/CarouselHome";
import CardValue from "@/components/sections/home/cards/CardValue";
import EssentialsSection from "@/components/sections/home/essentialsSection/EssentialsSection";

export default function Home() {
  return (
    <div className="h-screen ">
      <CarouselHome />
      <EssentialsSection />
      <CardValue />
    </div>
  );
}
