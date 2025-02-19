
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { Brain, Flame, Leaf, Moon, Sun, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const meditationCategories = [
  {
    icon: <Sun className="w-6 h-6 text-[#FEC6A1]" />,
    title: "Morning Energy",
    description: "Start your day with energizing meditation",
    color: "bg-[#FEC6A1]/10",
    borderColor: "border-[#FEC6A1]",
    duration: "10 min"
  },
  {
    icon: <Leaf className="w-6 h-6 text-[#A3D9A5]" />,
    title: "Mindful Balance",
    description: "Perfect complement to balance poses",
    color: "bg-[#A3D9A5]/10",
    borderColor: "border-[#A3D9A5]",
    duration: "15 min"
  },
  {
    icon: <Flame className="w-6 h-6 text-[#F87171]" />,
    title: "Power Focus",
    description: "Enhanced concentration for strength poses",
    color: "bg-[#F87171]/10",
    borderColor: "border-[#F87171]",
    duration: "20 min"
  },
  {
    icon: <Moon className="w-6 h-6 text-[#9b87f5]" />,
    title: "Evening Calm",
    description: "Wind down with relaxing meditation",
    color: "bg-[#9b87f5]/10",
    borderColor: "border-[#9b87f5]",
    duration: "15 min"
  },
  {
    icon: <Heart className="w-6 h-6 text-[#FFDEE2]" />,
    title: "Stress Relief",
    description: "Release tension and find peace",
    color: "bg-[#FFDEE2]/20",
    borderColor: "border-[#FFDEE2]",
    duration: "10 min"
  },
  {
    icon: <Brain className="w-6 h-6 text-[#D3E4FD]" />,
    title: "Deep Awareness",
    description: "Develop mindfulness and presence",
    color: "bg-[#D3E4FD]/20",
    borderColor: "border-[#D3E4FD]",
    duration: "20 min"
  }
];

const Meditation = () => {
  const navigate = useNavigate();

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
                <h1 className="text-3xl font-bold text-[#333333]">Meditation Space</h1>
                <p className="text-gray-600 mt-2">Choose your meditation practice</p>
              </div>
              <Brain className="w-12 h-12 text-[#4A90E2]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meditationCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${category.color} rounded-lg p-6 border ${category.borderColor} hover:shadow-md transition-shadow cursor-pointer`}
                  onClick={() => {
                    // Handle meditation selection
                    console.log(`Selected meditation: ${category.title}`);
                  }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {category.icon}
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      Duration: {category.duration}
                    </span>
                    <button className="px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      Begin
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

export default Meditation;
