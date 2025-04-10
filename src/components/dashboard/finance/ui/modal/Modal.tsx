import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                {children}
            </div>
        </div>
    );
};

export const ModalHeader = ({
    title,
    onClose
}: {
    title: string;
    onClose: () => void;
}) => (
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button onClick={onClose} className="text-gray-500">
            ×
        </button>
    </div>
);

export const ModalBody = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4">{children}</div>
);