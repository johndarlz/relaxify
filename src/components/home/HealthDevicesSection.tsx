
import { motion } from "framer-motion";
import { Watch, Activity, Heart, Wifi, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useState } from "react";

const healthDevices = [
  {
    icon: <Watch className="w-10 h-10" />,
    name: "Apple Watch",
    type: "smartwatch",
    metrics: ["Heart Rate", "Steps", "Sleep"],
    services: ['heart_rate'], // Bluetooth service identifiers
    filters: {
      services: ['heart_rate'],
      namePrefix: 'Apple Watch'
    }
  },
  {
    icon: <Activity className="w-10 h-10" />,
    name: "Fitbit",
    type: "fitness_band",
    metrics: ["Activity", "Calories", "Distance"],
    services: ['fitness_misc'],
    filters: {
      namePrefix: 'Fitbit'
    }
  },
  {
    icon: <Heart className="w-10 h-10" />,
    name: "Oura Ring",
    type: "smart_ring",
    metrics: ["Sleep Quality", "Readiness", "Recovery"],
    services: ['heart_rate'],
    filters: {
      namePrefix: 'Oura'
    }
  }
];

type HealthDeviceRow = Database['public']['Tables']['health_devices']['Row'];

const HealthDevicesSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);

  const { data: connectedDevices, refetch } = useQuery<HealthDeviceRow[]>({
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

  const handleBluetoothData = async (
    device: BluetoothDevice, 
    server: BluetoothRemoteGATTServer,
    deviceType: string,
    deviceId: string
  ) => {
    try {
      // Example for heart rate monitoring
      const service = await server.getPrimaryService('heart_rate');
      const characteristic = await service.getCharacteristic('heart_rate_measurement');
      
      await characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', async (event: Event) => {
        const value = (event.target as BluetoothRemoteGATTCharacteristic).value;
        if (!value) return;
        
        // Parse heart rate data according to Bluetooth GATT specification
        const flags = value.getUint8(0);
        const rate16Bits = flags & 0x1;
        const heartRate = rate16Bits ? value.getUint16(1, true) : value.getUint8(1);
        
        // Store the data
        const { error } = await supabase
          .from('health_data')
          .insert({
            user_id: user?.id,
            device_id: deviceId,
            data_type: 'heart_rate',
            value: heartRate,
            unit: 'bpm'
          });
          
        if (error) {
          console.error('Error storing health data:', error);
        }
        
        // Update last_data in health_devices
        await supabase
          .from('health_devices')
          .update({
            last_data: { heart_rate: heartRate, timestamp: new Date().toISOString() }
          })
          .eq('id', deviceId);
      });
    } catch (error) {
      console.error('Error setting up data handling:', error);
      toast({
        title: "Connection Error",
        description: "Could not set up data handling for the device.",
        variant: "destructive"
      });
    }
  };

  const handleConnectDevice = async (deviceType: string, deviceName: string, filters: RequestDeviceOptions) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!navigator.bluetooth) {
      toast({
        title: "Bluetooth Not Supported",
        description: "Your browser doesn't support Bluetooth connectivity. Please use a modern browser like Chrome.",
        variant: "destructive"
      });
      return;
    }

    try {
      setScanning(true);
      setConnecting(deviceType);

      // Request Bluetooth device
      const device = await navigator.bluetooth.requestDevice({
        ...filters,
        optionalServices: ['heart_rate', 'fitness_misc']
      });

      // Connect to the device
      const server = await device.gatt?.connect();
      if (!server) throw new Error("Could not connect to device");

      // Store device in database
      const { data, error } = await supabase
        .from('health_devices')
        .insert({
          user_id: user.id,
          device_type: deviceType,
          device_name: deviceName,
          is_connected: true,
          bluetooth_id: device.id
        })
        .select()
        .single();

      if (error) throw error;

      // Set up data handling
      await handleBluetoothData(device, server, deviceType, data.id);

      toast({
        title: "Device Connected",
        description: `Successfully connected to ${deviceName}`,
      });

      // Refresh device list
      refetch();

    } catch (error) {
      console.error('Error connecting device:', error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Could not connect to device. Please try again.",
        variant: "destructive"
      });
    } finally {
      setScanning(false);
      setConnecting(null);
    }
  };

  return (
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
            const connectedDevice = connectedDevices?.find(
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

                {connectedDevice?.last_data && (
                  <div className="mb-4 p-3 bg-relaxify-primary/5 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Latest Reading: {connectedDevice.last_data.heart_rate} bpm
                      <br />
                      <span className="text-xs text-gray-500">
                        {new Date(connectedDevice.last_data.timestamp).toLocaleString()}
                      </span>
                    </p>
                  </div>
                )}
                
                <button
                  onClick={() => handleConnectDevice(device.type, device.name, device.filters)}
                  disabled={isConnected || scanning}
                  className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center ${
                    isConnected
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-relaxify-primary text-white hover:bg-relaxify-primary/90"
                  }`}
                >
                  {connecting === device.type ? (
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
          })}
        </div>
      </div>
    </section>
  );
};

export default HealthDevicesSection;
