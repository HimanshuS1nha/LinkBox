import HeroSection from "./_components/hero-section";
import FeaturesSection from "./_components/features-section";
import CallToActionBanner from "./_components/call-to-action-banner";
import TestimonialsSection from "./_components/testimonials-section";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-y-12">
      <HeroSection />

      <FeaturesSection />

      <CallToActionBanner />

      <TestimonialsSection />
    </div>
  );
}
