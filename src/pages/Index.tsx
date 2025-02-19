
import Navbar from "../components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import HealthDevicesSection from "@/components/home/HealthDevicesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-relaxify-bg-mint">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HealthDevicesSection />
    </div>
  );
};

export default Index;
