'use client'
import React from "react";
import { Settings } from "@/components/settings/Settings";

export default function SettingsPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="container max-w-md p-8 rounded-lg shadow-lg bg-slate-200 dark:bg-gray-800">
        
        <Settings />
      </div>
    </div>
  );
}