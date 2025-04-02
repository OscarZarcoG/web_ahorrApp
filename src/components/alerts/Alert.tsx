'use client'
import React from "react";

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const alertClasses = {
    success: 'text-green-700 bg-green-100',
    error: 'text-red-700 bg-red-100',
    warning: 'text-yellow-700 bg-yellow-100',
    info: 'text-blue-700 bg-blue-100',
  };

  return (
    <div className={`p-3 text-sm rounded ${alertClasses[type]}`}>
      {message}
    </div>
  );
};