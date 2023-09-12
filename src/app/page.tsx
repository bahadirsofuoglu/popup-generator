'use client';
import React from 'react';
import Popup from '@/app/components/Popup';
import SideSettings from '@/app/components/SideSettings';
import { FieldSettingsProvider } from './context/fieldSettingsContext'; // İlgili path'e göre güncelleyin

export default function Home() {
    return (
        <FieldSettingsProvider>
            <main className='body-font container relative mx-auto flex h-full flex-wrap px-1 py-24 text-gray-600 sm:flex-nowrap'>
                <div className='relative flex items-center justify-items-start overflow-hidden rounded-lg bg-gray-300 p-10 sm:mr-10 md:w-1/2 lg:w-2/3'>
                    <Popup />
                </div>
                <div className='mt-8 flex w-full flex-col overflow-auto bg-white pr-3 md:ml-auto md:mt-0  md:w-1/2 lg:w-1/3'>
                    <SideSettings />
                </div>
            </main>
        </FieldSettingsProvider>
    );
}
