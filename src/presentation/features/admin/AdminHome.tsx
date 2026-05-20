"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/presentation/providers/auth-context";
import { useRepositories } from "@/presentation/providers/repositories-context";
import { AdminStats } from "@/core/domain/entities/AdminStats";
import { Users, Building2, Calendar, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
}

function getTodayDate(): string {
    return new Date().toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
}

const statCards = [
    {
        key: "totalUsers" as const,
        label: "Total Usuarios",
        icon: Users,
        color: "from-primary/15 to-primary/5",
        iconColor: "text-primary",
    },
    {
        key: "totalSpaces" as const,
        label: "Total Espacios",
        icon: Building2,
        color: "from-violet-500/15 to-violet-500/5",
        iconColor: "text-violet-600",
    },
    {
        key: "totalReservations" as const,
        label: "Reservas Solicitadas",
        icon: Calendar,
        color: "from-accent/15 to-accent/5",
        iconColor: "text-accent",
    },
    {
        key: "acceptedReservations" as const,
        label: "Reservas Aceptadas",
        icon: CheckCircle2,
        color: "from-emerald-500/15 to-emerald-500/5",
        iconColor: "text-emerald-600",
    },
];

export function AdminHome() {
    const { adminRepository } = useRepositories();
    const { user } = useAuth();
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        adminRepository
            .getStats()
            .then(setStats)
            .catch(() => setError("No se pudieron cargar las estadísticas"))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="space-y-8">
            {/* Welcome */}
            <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">
                    {getGreeting()}, {user?.name?.split(" ")[0] ?? "Usuario"}
                </h1>
                <p className="text-muted-foreground mt-1 capitalize">{getTodayDate()}</p>
                <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-accent rounded-full mt-3" />
            </div>

            {/* Stat Cards */}
            {error ? (
                <div className="flex items-center gap-3 p-5 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.key}
                                className="group relative p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${idx * 80}ms` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                                        <Icon className={`w-5 h-5 ${card.iconColor}`} />
                                    </div>
                                </div>
                                {isLoading ? (
                                    <div className="space-y-2">
                                        <div className="h-7 w-16 bg-muted rounded-lg animate-pulse" />
                                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-2xl font-bold text-foreground tracking-tight">
                                            {stats?.[card.key]?.toLocaleString() ?? "—"}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
