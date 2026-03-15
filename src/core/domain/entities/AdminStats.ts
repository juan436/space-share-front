export interface AdminStats {
  totalUsers: number;
  totalSpaces: number;
  totalReservations: number;
  acceptedReservations: number;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AdminSpace {
  _id: string;
  title: string;
  type: string;
  squareMeters: number;
  pricePerMonth: number;
  status: string;
  images: string[];
  rating?: number;
  reviewCount?: number;
  bookingsCount?: number;
  hostId: { _id: string; name: string; email: string } | string;
  location: { city: string; state: string; country: string };
  createdAt: string;
}

export interface AdminAnalytics {
  totalUsers: number;
  totalSpaces: number;
  totalReservations: number;
  reservationsByStatus: Record<string, number>;
  recentUsers: { _id: string; name: string; email: string; role: string; createdAt: string }[];
  topSpaces: { _id: string; title: string; type: string; pricePerMonth: number; bookingsCount: number; rating: number }[];
  monthlyRevenue: { month: string; total: number; count: number }[];
}
