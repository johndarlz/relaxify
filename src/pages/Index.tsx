
import { motion } from "framer-motion";
import { Heart, Brain, Smartphone } from "lucide-react";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Stress Detection",
    description: "Real-time stress analysis using advanced AI technology",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI Yoga Assistant",
    description: "Get personalized pose corrections and recommendations",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Smart Meditation",
    description: "Guided sessions adapted to your emotional state",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Progress Tracking",
    description: "Monitor your wellness journey with detailed insights",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-relaxify-bg-mint">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className="bg-relaxify-primary/10 text-relaxify-primary px-4 py-1.5 rounded-full text-sm font-medium">
              Your AI Wellness Companion
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-relaxify-text mb-6"
          >
            Transform Your Wellness Journey
            <br />
            <span className="text-relaxify-primary">with AI-Powered Guidance</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Experience personalized yoga sessions, real-time stress detection, and
            AI-guided meditation to enhance your mental and physical well-being.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <a
              href="/assessment"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-relaxify-primary hover:bg-relaxify-primary/90 transition-colors duration-200"
            >
              Start Your Journey
            </a>
            <a
              href="/learn-more"
              className="inline-flex items-center justify-center px-6 py-3 border border-relaxify-primary text-base font-medium rounded-lg text-relaxify-primary bg-transparent hover:bg-relaxify-primary/5 transition-colors duration-200"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
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
    </div>
  );
};

export default Index;
