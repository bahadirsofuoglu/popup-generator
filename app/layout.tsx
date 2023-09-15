'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { FieldSettingsProvider } from '@/context/fieldSettingsContext'; // İlgili path'e göre güncelleyin
import { ToastProvider } from '@/context/toastContext';
import Toast from '@/components/Toast';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                {' '}
                <ToastProvider>
                    <FieldSettingsProvider>
                        {children}
                        <Toast />
                    </FieldSettingsProvider>
                </ToastProvider>
            </body>
        </html>
    );
}
