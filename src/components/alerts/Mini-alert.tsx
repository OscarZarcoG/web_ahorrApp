'use client'
import React from "react";
import { MdError } from "react-icons/md";
import { FaCheck, FaInfoCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

interface AlertProps {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
}

interface Icons {
    success: React.ReactNode;
    error: React.ReactNode;
    warning: React.ReactNode;
    info: React.ReactNode;
}

export const Mini_alert: React.FC<AlertProps> = ({ type, message }) => {
    const alertClasses = {
        success: 'text-green-700 bg-green-100',
        error: 'text-red-700 bg-red-100',
        warning: 'text-yellow-700 bg-yellow-100',
        info: 'text-blue-700 bg-blue-100',
    };

    const icons: Icons = {
        success: <FaCheck className="inline-block align-middle" />,
        error: <MdError className="inline-block align-middle" />,
        warning: <IoIosWarning className="inline-block align-middle" />,
        info: <FaInfoCircle className="inline-block align-middle" />,
    };

    return (
        <div className={`p-2 text-sm rounded w-sm flex items-center justify-center gap-2 ml-auto ${alertClasses[type]}`}>
            {icons[type]}
            <span>{message}</span>
        </div>
    );
};