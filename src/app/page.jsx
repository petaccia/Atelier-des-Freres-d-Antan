import CarouselHome from "@/components/carousel/CarouselHome";
import CarouselValue from "@/components/carousel/CarouselValue";
import EssentialsSection from "@/components/sections/home/essentialsSection/EssentialsSection";

export default function Home() {
  return (
    <div className="h-screen ">
      <CarouselHome />
      <EssentialsSection />
      <CarouselValue />
    </div>
  );
}
