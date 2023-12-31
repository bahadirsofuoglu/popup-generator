'use client';
import Popup from '@/components/Popup';
import SideSettings from '@/components/SideSettings';

export default function Home() {
    return (
        <main className='body-font container relative mx-auto flex h-full flex-wrap  px-1 py-24 text-gray-600 sm:flex-nowrap'>
            <div className='relative flex w-full items-center justify-items-center overflow-hidden rounded-lg  bg-blue-300 p-10 sm:mr-10 md:w-1/2 lg:w-2/3'>
                <Popup />
            </div>
            <div className='mt-8 flex w-full flex-col overflow-auto bg-white pr-3 md:ml-auto md:mt-0  md:w-1/2 lg:w-1/3'>
                <SideSettings />
            </div>
        </main>
    );
}
