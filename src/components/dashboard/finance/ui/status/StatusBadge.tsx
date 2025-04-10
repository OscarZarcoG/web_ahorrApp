import React from 'react';

type StatusType = 'income' | 'expense';

interface StatusBadgeProps {
    type: StatusType;
    children: React.ReactNode;
}

export const StatusBadge = ({ type, children }: StatusBadgeProps) => {
    const styles = {
        income: 'bg-green-100 text-green-800',
        expense: 'bg-red-100 text-red-800'
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs ${styles[type]}`}>
            {children}
        </span>
    );
};