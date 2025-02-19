
import { motion } from "framer-motion";
import { Heart, Brain, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const features = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Stress Detection",
    description: "Real-time stress analysis using advanced AI technology",
    path: "/assessment"
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI Yoga Assistant",
    description: "Get personalized pose corrections and recommendations",
    path: "/yoga"
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Smart Meditation",
    description: "Guided sessions adapted to your emotional state",
    path: "/meditation"
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Progress Tracking",
    description: "Monitor your wellness journey with detailed insights",
    path: "/profile"
  },
];

const FeaturesSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => user ? navigate(feature.path) : navigate('/auth')}
            >
              <div className="w-12 h-12 bg-relaxify-primary/10 rounded-lg flex items-center justify-center mb-4">
                <div className="text-relaxify-primary">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-relaxify-text mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
