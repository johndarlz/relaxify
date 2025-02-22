
import { motion } from "framer-motion";
import { Wifi, Loader2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type HealthDeviceRow = Database['public']['Tables']['health_devices']['Row'];
interface HealthData {
  heart_rate: number;
  timestamp: string;
}

interface HealthDeviceCardProps {
  device: {
    icon: JSX.Element;
    name: string;
    type: string;
    metrics: string[];
    filters: RequestDeviceOptions;
  };
  isConnected: boolean;
  connecting: boolean;
  connectedDevice?: HealthDeviceRow;
  onConnect: () => void;
}

export const HealthDeviceCard = ({
  device,
  isConnected,
  connecting,
  connectedDevice,
  onConnect
}: HealthDeviceCardProps) => {
  return (
    <motion.div
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

      {connectedDevice?.last_data && (
        <div className="mb-4 p-3 bg-relaxify-primary/5 rounded-lg">
          <p className="text-sm text-gray-600">
            Latest Reading: {(connectedDevice.last_data as HealthData).heart_rate} bpm
            <br />
            <span className="text-xs text-gray-500">
              {new Date((connectedDevice.last_data as HealthData).timestamp).toLocaleString()}
            </span>
          </p>
        </div>
      )}
      
      <button
        onClick={onConnect}
        disabled={isConnected || connecting}
        className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
          isConnected
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-relaxify-primary text-white hover:bg-relaxify-primary/90"
        }`}
      >
        {connecting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Connecting...
          </>
        ) : isConnected ? (
          "Connected"
        ) : (
          "Connect Device"
        )}
      </button>
    </motion.div>
  );
};

