
import { Watch, Activity, Heart } from "lucide-react";

export const healthDevices = [
  {
    icon: <Watch className="w-10 h-10" />,
    name: "Apple Watch",
    type: "smartwatch",
    metrics: ["Heart Rate", "Steps", "Sleep"],
    services: ['heart_rate'],
    filters: {
      filters: [{
        services: ['heart_rate'],
        namePrefix: 'Apple Watch'
      }],
      optionalServices: ['heart_rate']
    }
  },
  {
    icon: <Activity className="w-10 h-10" />,
    name: "Fitbit",
    type: "fitness_band",
    metrics: ["Activity", "Calories", "Distance"],
    services: ['fitness_misc'],
    filters: {
      filters: [{
        namePrefix: 'Fitbit'
      }],
      optionalServices: ['fitness_misc']
    }
  },
  {
    icon: <Heart className="w-10 h-10" />,
    name: "Oura Ring",
    type: "smart_ring",
    metrics: ["Sleep Quality", "Readiness", "Recovery"],
    services: ['heart_rate'],
    filters: {
      filters: [{
        namePrefix: 'Oura'
      }],
      optionalServices: ['heart_rate']
    }
  }
];

