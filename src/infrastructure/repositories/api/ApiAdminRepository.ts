import { AdminStats, AdminUser, AdminSpace, AdminAnalytics } from "@/core/domain/entities/AdminStats";
import { HttpClient } from "@/infrastructure/http/HttpClient";

export class ApiAdminRepository {
  constructor(private http: HttpClient) {}

  async getStats(): Promise<AdminStats> {
    const res = await this.http.get<AdminStats>("/admin/stats");
    return res.data;
  }

  async getUsers(): Promise<AdminUser[]> {
    const res = await this.http.get<AdminUser[]>("/admin/users");
    return res.data;
  }

  async getSpaces(): Promise<AdminSpace[]> {
    const res = await this.http.get<AdminSpace[]>("/admin/spaces");
    return res.data;
  }

  async getAnalytics(): Promise<AdminAnalytics> {
    const res = await this.http.get<AdminAnalytics>("/admin/analytics");
    return res.data;
  }
}
