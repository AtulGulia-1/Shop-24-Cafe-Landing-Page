import CoffeeCanvas from "@/components/CoffeeCanvas";
import LocationSection from "@/components/LocationSection";

export default function Home() {
  return (
    <main className="w-full bg-brand-dark">
      {/* 
        This wrapper holds the CoffeeCanvas. It has a high z-index and a solid background
        so it covers the LocationSection below it.
      */}
      <div className="relative z-10 bg-brand-dark pb-1 shadow-[0_20px_50px_rgba(0,0,0,1)] rounded-b-[40px] md:rounded-b-[80px]">
        <CoffeeCanvas />
      </div>
      
      {/* 
        The LocationSection is sticky to the bottom. This creates a parallax/drawer 
        effect when the z-10 CoffeeCanvas scrolls past it.
      */}
      <div className="sticky bottom-0 left-0 w-full z-0 flex flex-col justify-end">
        <LocationSection />
      </div>
    </main>
  );
}
