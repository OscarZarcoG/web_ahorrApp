'use client'
import React from "react";
import { Settings } from "@/components/settings/Settings";
import { useAuth } from '@/hook/useAuth';


export default function SettingsPage() {
  const { logout } = useAuth()

  return (
    <div className="flex items-center justify-center w-10/12 mx-auto mt-2">
      <div className="container p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <Settings onLogout={logout} />
      </div>
    </div>
  );
}