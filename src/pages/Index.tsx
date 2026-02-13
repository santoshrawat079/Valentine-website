import FloatingHearts from "@/components/FloatingHearts";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import LoveLetterSection from "@/components/LoveLetterSection";
import ProposalSection from "@/components/ProposalSection";

const Index = () => {
  return (
    <div className="romantic-gradient min-h-screen relative overflow-x-hidden">
      <FloatingHearts />
      <HeroSection />
      <div className="section-divider w-1/2 mx-auto" />
      <JourneySection />
      <div className="section-divider w-1/2 mx-auto" />
      <LoveLetterSection />
      <div className="section-divider w-1/2 mx-auto" />
      <ProposalSection />
    </div>
  );
};

export default Index;
