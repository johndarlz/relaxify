
import { Watch, Activity, Heart } from "lucide-react";

export const healthDevices = [
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
