import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Array<{ value: string | number; label: string }>;
}

export const Select = ({ label, options, ...props }: SelectProps) => (
    <div className="mb-4">
        {label && <label className="block text-gray-700 mb-2">{label}</label>}
        <select className="w-full p-2 border rounded" {...props}>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);