
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Activity, Sun, Moon, Flame, Heart, Brain, Leaf } from 'lucide-react';

const yogaCategories = [
  {
    icon: <Sun className="w-6 h-6 text-[#FEC6A1]" />,
    title: "Morning Flow",
    description: "Energizing poses to start your day",
    color: "bg-[#FEC6A1]/10",
    borderColor: "border-[#FEC6A1]",
    duration: "20 min",
    level: "Beginner"
  },
  {
    icon: <Leaf className="w-6 h-6 text-[#A3D9A5]" />,
    title: "Balance Poses",
    description: "Improve stability and focus",
    color: "bg-[#A3D9A5]/10",
    borderColor: "border-[#A3D9A5]",
    duration: "25 min",
    level: "Intermediate"
  },
  {
    icon: <Flame className="w-6 h-6 text-[#F87171]" />,
    title: "Power Yoga",
    description: "Strengthen your body and mind",
    color: "bg-[#F87171]/10",
    borderColor: "border-[#F87171]",
    duration: "30 min",
    level: "Advanced"
  },
  {
    icon: <Moon className="w-6 h-6 text-[#9b87f5]" />,
    title: "Evening Unwind",
    description: "Gentle poses for relaxation",
    color: "bg-[#9b87f5]/10",
    borderColor: "border-[#9b87f5]",
    duration: "15 min",
    level: "Beginner"
  },
  {
    icon: <Heart className="w-6 h-6 text-[#FFDEE2]" />,
    title: "Stress Relief",
    description: "Release tension with gentle stretches",
    color: "bg-[#FFDEE2]/20",
    borderColor: "border-[#FFDEE2]",
    duration: "20 min",
    level: "All Levels"
  },
  {
    icon: <Brain className="w-6 h-6 text-[#D3E4FD]" />,
    title: "Mindful Flow",
    description: "Connect breath with movement",
    color: "bg-[#D3E4FD]/20",
    borderColor: "border-[#D3E4FD]",
    duration: "25 min",
    level: "Intermediate"
  }
];

const Yoga = () => {
  return (
    <div className="min-h-screen bg-[#A3D9A5]/10">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[#333333]">Yoga Practice</h1>
                <p className="text-gray-600 mt-2">Choose your yoga session</p>
              </div>
              <Activity className="w-12 h-12 text-[#4A90E2]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {yogaCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${category.color} rounded-lg p-6 border ${category.borderColor} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => {
                    // Handle yoga selection
                    console.log(`Selected yoga: ${category.title}`);
                  }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {category.icon}
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-500">
                        Duration: {category.duration}
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        Level: {category.level}
                      </span>
                    </div>
                    <button className="w-full px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
                      Start Session
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Yoga;
