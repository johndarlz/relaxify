
import { healthDevices } from "./constants/healthDevices";
import { useBluetoothDevice } from "./hooks/useBluetoothDevice";
import { HealthDeviceCard } from "./HealthDeviceCard";

const HealthDevicesSection = () => {
  const { scanning, connecting, connectedDevices, handleConnectDevice } = useBluetoothDevice();

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
              <HealthDeviceCard
                key={device.type}
                device={device}
                isConnected={!!isConnected}
                connecting={connecting === device.type}
                connectedDevice={connectedDevice}
                onConnect={() => handleConnectDevice(device.type, device.name, device.filters)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HealthDevicesSection;
