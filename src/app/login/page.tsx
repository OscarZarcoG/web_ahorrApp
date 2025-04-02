'use client'
import React from "react";
import { ThemeToggle } from "@/components/buttons/theme/ThemeToggle";
import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container max-w-md p-8 rounded-lg shadow-lg bg-slate-200 dark:bg-gray-800">
        <div className="flex flex-row items-center justify-between mb-8">
          <h1 className="flex-1 text-2xl font-bold text-center text-gray-900 dark:text-white uppercase">Iniciar Sesión</h1>
          <ThemeToggle/>
        </div>
        
        <LoginForm />
      </div>
    </div>
  );
}