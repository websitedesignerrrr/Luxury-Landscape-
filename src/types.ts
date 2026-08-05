export type LightingMode = 'day' | 'sunset' | 'night';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  features: string[];
  image: string;
  badge?: string;
  startingPrice: string;
}

export interface BeforeAfterProject {
  id: string;
  title: string;
  location: string;
  category: 'estates' | 'hardscaping' | 'lighting' | 'commercial';
  beforeImage: string;
  afterImage: string;
  description: string;
  stats: { label: string; value: string }[];
}

export interface FloridaCity {
  id: string;
  name: string;
  region: string;
  tagline: string;
  xPercent: number; // For map pin coordinates
  yPercent: number;
  completedProjects: number;
  soilType: string;
  recommendedPalms: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  projectType: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface EstimateRequest {
  propertyType: 'residential' | 'estate' | 'commercial' | 'hoa';
  propertySize: number;
  city: string;
  services: string[];
  name?: string;
  email?: string;
  phone?: string;
}
