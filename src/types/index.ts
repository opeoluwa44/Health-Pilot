export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface HealthMetric {
  id: string;
  type:
    | "weight"
    | "blood_pressure"
    | "heart_rate"
    | "blood_sugar"
    | "sleep"
    | "water"
    | "exercise";
  value: number | { systolic: number; diastolic: number };
  unit: string;
  date: string;
  notes?: string;
}

export interface Symptom {
  id: string;
  name: string;
  severity: "mild" | "moderate" | "severe";
  duration: string;
  description: string;
}

export interface HealthResource {
  id: string;
  title: string;
  category: "article" | "tip" | "nutrition" | "exercise" | "wellness";
  content: string;
  author: string;
  readTime: string;
  createdAt: string;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "medication" | "appointment" | "exercise" | "water" | "custom";
  completed: boolean;
}

export interface WellnessScore {
  overall: number;
  categories: {
    sleep: number;
    exercise: number;
    nutrition: number;
    hydration: number;
    mental_health: number;
  };
}
