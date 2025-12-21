"use client";

import { RegisterForm } from "@/presentation/features/auth";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <RegisterForm />
    </div>
  );
}
