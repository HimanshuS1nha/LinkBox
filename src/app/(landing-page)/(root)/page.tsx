import HeroSection from "./_components/hero-section";
import FeaturesSection from "./_components/features-section";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-12">
      <HeroSection />

      <FeaturesSection />
    </div>
  );
}
