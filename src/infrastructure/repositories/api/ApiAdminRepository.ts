import { AdminStats, AdminUser, AdminSpace, AdminAnalytics } from "@/core/domain/entities/AdminStats";
import { AdminRepository } from "@/core/domain/ports/AdminRepository";
import { HttpClient } from "@/infrastructure/http/HttpClient";
import { AdminUserDto, AdminSpaceDto, AdminAnalyticsDto } from "@/infrastructure/api/dtos/admin";
import { AdminMapper } from "@/infrastructure/api/mappers/AdminMapper";

export class ApiAdminRepository implements AdminRepository {
  constructor(private http: HttpClient) {}

  async getStats(): Promise<AdminStats> {
    const res = await this.http.get<AdminStats>("/admin/stats");
    return res.data;
  }

  async getUsers(): Promise<AdminUser[]> {
    const res = await this.http.get<AdminUserDto[]>("/admin/users");
    return res.data.map(AdminMapper.userToDomain);
  }

  async getSpaces(): Promise<AdminSpace[]> {
    const res = await this.http.get<AdminSpaceDto[]>("/admin/spaces");
    return res.data.map(AdminMapper.spaceToDomain);
  }

  async getAnalytics(): Promise<AdminAnalytics> {
    const res = await this.http.get<AdminAnalyticsDto>("/admin/analytics");
    return AdminMapper.analyticsToDomain(res.data);
  }
}
