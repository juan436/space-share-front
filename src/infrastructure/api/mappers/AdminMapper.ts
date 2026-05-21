import { AdminUser, AdminSpace, AdminSpaceHost, AdminAnalytics } from "@/core/domain/entities/AdminStats";
import { AdminUserDto, AdminSpaceDto, AdminSpaceHostDto, AdminAnalyticsDto } from "../dtos/admin";

export class AdminMapper {
  static userToDomain(dto: AdminUserDto): AdminUser {
    return {
      id: dto._id,
      name: dto.name,
      email: dto.email,
      role: dto.role,
      phone: dto.phone,
      avatar: dto.avatar,
      isActive: dto.isActive,
      createdAt: new Date(dto.createdAt),
    };
  }

  static spaceHostToDomain(dto: AdminSpaceHostDto): AdminSpaceHost {
    return { id: dto._id, name: dto.name, email: dto.email };
  }

  static spaceToDomain(dto: AdminSpaceDto): AdminSpace {
    return {
      id: dto._id,
      title: dto.title,
      type: dto.type,
      squareMeters: dto.squareMeters,
      pricePerMonth: dto.pricePerMonth,
      status: dto.status,
      images: dto.images,
      rating: dto.rating,
      reviewCount: dto.reviewCount,
      bookingsCount: dto.bookingsCount,
      hostId:
        typeof dto.hostId === "object"
          ? AdminMapper.spaceHostToDomain(dto.hostId)
          : dto.hostId,
      location: dto.location,
      createdAt: new Date(dto.createdAt),
    };
  }

  static analyticsToDomain(dto: AdminAnalyticsDto): AdminAnalytics {
    return {
      totalUsers: dto.totalUsers,
      totalSpaces: dto.totalSpaces,
      totalReservations: dto.totalReservations,
      reservationsByStatus: dto.reservationsByStatus,
      recentUsers: dto.recentUsers.map((u) => ({
        id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        createdAt: new Date(u.createdAt),
      })),
      topSpaces: dto.topSpaces.map((s) => ({
        id: s._id,
        title: s.title,
        type: s.type,
        pricePerMonth: s.pricePerMonth,
        bookingsCount: s.bookingsCount,
        rating: s.rating,
      })),
      monthlyRevenue: dto.monthlyRevenue,
    };
  }
}
