import React from 'react';

interface TableProps {
    children: React.ReactNode;
    className?: string;
}

export const Table = ({ children, className = '' }: TableProps) => {
    return (
        <div className="overflow-x-auto">
            <table className={`min-w-full divide-y ${className}`}>
                {children}
            </table>
        </div>
    );
};

export const TableHead = ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600">
        {children}
    </thead>
);

export const TableBody = ({ children }: { children: React.ReactNode }) => (
    <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-800">
        {children}
    </tbody>
);

export const TableRow = ({ children, ...props }: { children: React.ReactNode }) => (
    <tr { ...props}>{children}</tr>
);

export const TableCell = ({
    children,
    className = ''
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <td className={`px-6 py-4 whitespace-nowrap ${className}`}>
        {children}
    </td>
);