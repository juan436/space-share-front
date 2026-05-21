export interface AdminUserDto {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AdminSpaceHostDto {
  _id: string;
  name: string;
  email: string;
}

export interface AdminSpaceDto {
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
  hostId: AdminSpaceHostDto | string;
  location: { city: string; state: string; country: string };
  createdAt: string;
}

export interface AdminAnalyticsDto {
  totalUsers: number;
  totalSpaces: number;
  totalReservations: number;
  reservationsByStatus: Record<string, number>;
  recentUsers: { _id: string; name: string; email: string; role: string; createdAt: string }[];
  topSpaces: { _id: string; title: string; type: string; pricePerMonth: number; bookingsCount: number; rating: number }[];
  monthlyRevenue: { month: string; total: number; count: number }[];
}
