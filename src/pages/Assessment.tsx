
import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Brain, Activity, Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Assessment = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    stressLevel: 0,
    sleepQuality: 0,
    exerciseFrequency: 0,
  });

  const handleSubmit = async () => {
    toast({
      title: "Assessment Complete",
      description: "Your wellness plan is being generated.",
    });
    // TODO: Submit assessment data to Supabase
  };

  return (
    <div className="min-h-screen bg-relaxify-bg-mint">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-relaxify-text mb-6">Wellness Assessment</h1>
            
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-4">
                  <Brain className="w-6 h-6 text-relaxify-primary" />
                  <h2 className="text-xl font-semibold">Current Stress Level</h2>
                </div>
                {/* Add stress level assessment UI */}
              </motion.div>
            )}

            {/* Add more steps as needed */}

            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(step => step - 1)}
                  className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(step => step + 1)}
                  className="px-6 py-2 bg-relaxify-primary text-white rounded-lg hover:bg-relaxify-primary/90 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-relaxify-primary text-white rounded-lg hover:bg-relaxify-primary/90 transition-colors"
                >
                  Complete Assessment
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Assessment;
