export interface Salon {
  id: string;
  name: string;
  tagline: string;
  location: string;
  city: string;
  address: string;
  distance: string;
  rating: number;
  reviewCount: number;
  priceLevel: string;
  priceFrom: number;
  currency: string;
  image: string;
  images: string[];
  tags: string[];
  badges: ('AI Recommended' | 'Top Rated' | 'Premium Salon' | 'New')[];
  description: string;
  openHours: string;
  phone: string;
  isFavorite: boolean;
  services: Service[];
  staff: Staff[];
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  description: string;
  price: number;
  currency: string;
  category: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  specialty: string;
  experience: string;
  available: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  text: string;
  serviceUsed: string;
  verified: boolean;
}

export interface Booking {
  id: string;
  bookingRef: string;
  salonId: string;
  salonName: string;
  salonAddress: string;
  salonImage: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  staffId: string;
  staffName: string;
  staffRole: string;
  staffAvatar: string;
  date: string;
  time: string;
  endTime: string;
  duration: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  paymentMethod: string;
  subtotal: number;
  tax: number;
  platformFee: number;
  total: number;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: string;
  cards?: AICard[];
  prompts?: string[];
}

export interface AICard {
  type: 'product' | 'salon' | 'routine';
  title: string;
  subtitle: string;
  price?: number;
  rating?: number;
  image: string;
  match?: number;
}

export interface DashboardStats {
  revenue: number;
  revenueChange: number;
  bookings: number;
  bookingsChange: number;
  newClients: number;
  retention: number;
  avgRating: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'booking' | 'offer' | 'reminder' | 'review';
}
