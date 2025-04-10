import React from "react";
import { IconType } from "react-icons";

interface SummaryCardProps {
    icon: IconType;
    title: string;
    value: string;
    color?: string;
    className?: string;
}

export const SummaryCard = ({
    icon: Icon,
    title,
    value,
    color = "text-gray-700",
    className = "",
}: SummaryCardProps) => (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
        <div className="flex items-center">
            <Icon className={`${color} text-2xl mr-2`} />
            <h3 className="font-semibold">{title}</h3>
        </div>
        <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
);
