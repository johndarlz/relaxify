
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Brain } from 'lucide-react';

const Meditation = () => {
  return (
    <div className="min-h-screen bg-[#A3D9A5]/10">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-[#333333] mb-6">Meditation Space</h1>
            <div className="grid gap-6">
              <div className="bg-[#4A90E2]/10 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="w-6 h-6 text-[#4A90E2]" />
                  <h3 className="text-lg font-semibold">Daily Meditation</h3>
                </div>
                <p className="text-gray-600">Your guided meditation session awaits.</p>
                <button className="mt-4 px-6 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#4A90E2]/90 transition-colors">
                  Begin Session
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Meditation;
