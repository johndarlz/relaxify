
import { motion } from "framer-motion";
import type { Database } from "@/integrations/supabase/types";

type HealthDeviceRow = Database['public']['Tables']['health_devices']['Row'];

interface HealthDeviceCardProps {
  device: {
    icon: JSX.Element;
    name: string;
    type: string;
    metrics: string[];
  };
}

export const HealthDeviceCard = ({ device }: HealthDeviceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center space-x-4 mb-4">
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
    </motion.div>
  );
};
