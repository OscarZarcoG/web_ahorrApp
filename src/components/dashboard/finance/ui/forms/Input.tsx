import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => (
    <div className="mb-4">
        {label && <label className="block text-gray-700 mb-2">{label}</label>}
        <input
            className={`w-full p-2 border rounded ${error ? 'border-red-500' : ''}`}
            {...props}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
);