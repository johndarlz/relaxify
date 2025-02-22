
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import type { Database } from "@/integrations/supabase/types";
import type { Json } from "@/integrations/supabase/types";

type HealthDeviceRow = Database['public']['Tables']['health_devices']['Row'];

export const useBluetoothDevice = () => {
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
    device: any,
    server: any,
    deviceType: string,
    deviceId: string
  ) => {
    try {
      const service = await server.getPrimaryService('heart_rate');
      const characteristic = await service.getCharacteristic('heart_rate_measurement');
      
      await characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', async (event: any) => {
        const value = event.target.value;
        if (!value) return;
        
        const flags = value.getUint8(0);
        const rate16Bits = flags & 0x1;
        const heartRate = rate16Bits ? value.getUint16(1, true) : value.getUint8(1);
        
        const healthData: Json = {
          heart_rate: heartRate,
          timestamp: new Date().toISOString()
        };
        
        const { error: dataError } = await supabase
          .from('health_data')
          .insert({
            user_id: user?.id,
            device_id: deviceId,
            data_type: 'heart_rate',
            value: heartRate,
            unit: 'bpm'
          });
          
        if (dataError) {
          console.error('Error storing health data:', dataError);
        }
        
        const { error: deviceError } = await supabase
          .from('health_devices')
          .update({
            last_data: healthData
          })
          .eq('id', deviceId);

        if (deviceError) {
          console.error('Error updating device data:', deviceError);
        }
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

      const device = await navigator.bluetooth.requestDevice(filters);

      const server = await device.gatt?.connect();
      if (!server) throw new Error("Could not connect to device");

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

      await handleBluetoothData(device, server, deviceType, data.id);

      toast({
        title: "Device Connected",
        description: `Successfully connected to ${deviceName}`,
      });

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

  return {
    scanning,
    connecting,
    connectedDevices,
    handleConnectDevice
  };
};

