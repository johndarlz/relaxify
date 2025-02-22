
import { healthDevices } from "./constants/healthDevices";
import { HealthDeviceCard } from "./HealthDeviceCard";

const HealthDevicesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-relaxify-text mb-4">
            Health Devices
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View our supported health devices for tracking your wellness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthDevices.map((device) => (
            <HealthDeviceCard
              key={device.type}
              device={device}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthDevicesSection;
