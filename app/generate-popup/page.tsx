'use client';
import CodeBlock from '@/components/CodeBlock';
import Link from 'next/link';

export default function Page() {
    return (
        <main className='body-font container relative m-auto mx-auto flex h-full py-24 text-gray-600'>
            <div className='relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-blue-300 p-10'>
                <CodeBlock />
                <span className='my-4  font-bold text-white'>OR</span>

                <Link
                    href='/test.html'
                    className='rounded bg-gray-800 px-4 py-2 font-bold text-white hover:bg-gray-700'
                >
                    Go to Test Page
                </Link>
            </div>
        </main>
    );
}
