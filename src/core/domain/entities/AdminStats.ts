export interface AdminStats {
  totalUsers: number;
  totalSpaces: number;
  totalReservations: number;
  acceptedReservations: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface AdminSpaceHost {
  id: string;
  name: string;
  email: string;
}

export interface AdminSpace {
  id: string;
  title: string;
  type: string;
  squareMeters: number;
  pricePerMonth: number;
  status: string;
  images: string[];
  rating?: number;
  reviewCount?: number;
  bookingsCount?: number;
  hostId: AdminSpaceHost | string;
  location: { city: string; state: string; country: string };
  createdAt: Date;
}

export interface AdminAnalytics {
  totalUsers: number;
  totalSpaces: number;
  totalReservations: number;
  reservationsByStatus: Record<string, number>;
  recentUsers: { id: string; name: string; email: string; role: string; createdAt: Date }[];
  topSpaces: { id: string; title: string; type: string; pricePerMonth: number; bookingsCount: number; rating: number }[];
  monthlyRevenue: { month: string; total: number; count: number }[];
}
