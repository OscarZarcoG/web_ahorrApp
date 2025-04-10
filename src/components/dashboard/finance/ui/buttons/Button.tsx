import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: IconType;
    variant?: 'primary' | 'secondary' | 'text';
}

export const Button = ({
    children,
    icon: Icon,
    variant = 'primary',
    className = '',
    ...props
}: ButtonProps) => {
    const baseStyles = 'py-2 px-4 rounded flex items-center justify-center transition-colors';

    const variants = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
        text: 'bg-transparent hover:bg-gray-100 text-gray-700'
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {Icon && <Icon className="mr-2" />}
            {children}
        </button>
    );
};