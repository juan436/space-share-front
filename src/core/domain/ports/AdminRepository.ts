import { AdminStats, AdminUser, AdminSpace, AdminAnalytics } from "@/core/domain/entities/AdminStats";

export interface AdminRepository {
  getStats(): Promise<AdminStats>;
  getUsers(): Promise<AdminUser[]>;
  getSpaces(): Promise<AdminSpace[]>;
  getAnalytics(): Promise<AdminAnalytics>;
}
