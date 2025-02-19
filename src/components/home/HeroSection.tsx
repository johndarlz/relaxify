
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
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
          {user ? (
            <button
              onClick={() => navigate('/assessment')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-relaxify-primary hover:bg-relaxify-primary/90 transition-colors duration-200"
            >
              Start Your Journey
            </button>
          ) : (
            <button
              onClick={() => navigate('/auth')}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-relaxify-primary hover:bg-relaxify-primary/90 transition-colors duration-200"
            >
              Sign in to Start
            </button>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
