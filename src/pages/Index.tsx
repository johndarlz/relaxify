
import { motion } from "framer-motion";
import { Heart, Brain, Smartphone, Watch, Activity, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

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

const healthDevices = [
  {
    icon: <Watch className="w-10 h-10" />,
    name: "Apple Watch",
    type: "smartwatch",
    metrics: ["Heart Rate", "Steps", "Sleep"]
  },
  {
    icon: <Activity className="w-10 h-10" />,
    name: "Fitbit",
    type: "fitness_band",
    metrics: ["Activity", "Calories", "Distance"]
  },
  {
    icon: <Heart className="w-10 h-10" />,
    name: "Oura Ring",
    type: "smart_ring",
    metrics: ["Sleep Quality", "Readiness", "Recovery"]
  }
];

type HealthDeviceRow = Database['public']['Tables']['health_devices']['Row'];

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: connectedDevices } = useQuery<HealthDeviceRow[]>({
    queryKey: ['health-devices', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('health_devices')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const handleConnectDevice = async (deviceType: string, deviceName: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('health_devices')
        .insert({
          user_id: user.id,
          device_type: deviceType,
          device_name: deviceName,
          is_connected: true
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Device Connected",
        description: `Successfully connected to ${deviceName}`,
      });
    } catch (error) {
      console.error('Error connecting device:', error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to device. Please try again.",
        variant: "destructive"
      });
    }
  };

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

      {/* Health Devices Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-relaxify-text mb-4">
              Connect Your Health Devices
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sync your favorite health devices to track your wellness journey and get personalized insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthDevices.map((device) => {
              const isConnected = connectedDevices?.some(
                (d) => d.device_type === device.type && d.is_connected
              );

              return (
                <motion.div
                  key={device.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-relaxify-primary/10 rounded-lg">
                        {device.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-relaxify-text">
                          {device.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {device.metrics.join(" • ")}
                        </p>
                      </div>
                    </div>
                    {isConnected && (
                      <div className="flex items-center text-green-500">
                        <Wifi className="w-4 h-4 mr-1" />
                        <span className="text-sm">Connected</span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleConnectDevice(device.type, device.name)}
                    disabled={isConnected}
                    className={`w-full px-4 py-2 rounded-lg transition-colors ${
                      isConnected
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-relaxify-primary text-white hover:bg-relaxify-primary/90"
                    }`}
                  >
                    {isConnected ? "Connected" : "Connect Device"}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
