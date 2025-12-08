import Footer from "@/components/organisms/Footer";
import GuestHeader from "@/features/guest/components/sections/GuestHeader";
import { HeroSection, SearchSection, TopRatedMentorsSection, WhyChooseMasaarSection, StoriesSection, CTASection } from "@/features/guest/components/sections";

export default function LandingPage() {
  return (
    <div className="font-family-secondary flex flex-col min-h-screen">
      {/* Header */}
      <GuestHeader />

      {/* Main Content */}
      <main className="bg-light-gray flex-1">
        <HeroSection />
        <SearchSection />
        <TopRatedMentorsSection />
        <WhyChooseMasaarSection />
        <StoriesSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

