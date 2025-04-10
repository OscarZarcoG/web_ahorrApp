'use client'
import React from "react";

interface SubmitButtonProps {
  loading: boolean;
  disabled?: boolean;
  label: string;
  loadingLabel: string;
  className?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  disabled = false,
  label,
  loadingLabel,
  className = '',
}) => {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className={`w-full p-2 text-white rounded-md ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-800'} ${className}`}
    >
      {loading ? loadingLabel : label}
    </button>
  );
};