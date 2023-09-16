import React, { createContext, useState, useContext } from 'react';

// This is the context that will be used to store the toast settings
// The toast settings are the message, type and whether the toast is open or not

type Props = {
    children: React.ReactNode;
};

type ToastType = 'error' | 'success' | undefined;

interface ToastContextProps {
    message: string;
    type: ToastType;
    isOpen: boolean;
    openToast: (message: string, type?: ToastType) => void;
    closeToast: () => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<ToastType>('error');

    const openToast = (message: string, type?: ToastType) => {
        setMessage(message);
        if (type) {
            setType(type);
        }
        setIsOpen(true);
    };

    const closeToast = () => {
        setIsOpen(false);
        setMessage('');
    };

    return (
        <ToastContext.Provider
            value={{ message, type, isOpen, openToast, closeToast }}
        >
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
