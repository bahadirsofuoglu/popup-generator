import React from 'react';
import { useRef } from 'react';
import { useToast } from '@/app/context/toastContext';

const CodeBlock: React.FC = () => {
    const codeBlockRef = useRef<HTMLElement>(null);
    const { openToast } = useToast();

    const handleCopyClick = () => {
        const codeToCopy = codeBlockRef.current?.textContent || '';
        navigator.clipboard
            .writeText(codeToCopy)
            .then(() => {
                openToast('Code copied to clipboard', 'success');
            })
            .catch(() => {
                openToast('Failed to copy code to clipboard');
            });
    };

    return (
        <div className='overflow-hidden rounded-lg bg-white p-4 shadow-lg'>
            <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>JavaScript Code</h2>
                <button
                    id='copyButton'
                    className='rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-400'
                    onClick={handleCopyClick}
                >
                    Copy
                </button>
            </div>
            <pre className='mt-2 overflow-x-auto rounded bg-gray-800 p-4 text-sm text-white'>
                <code ref={codeBlockRef}>
                    {
                        '<script src="https://popupgenarator.s3.amazonaws.com/popupgenarator.js"></script>'
                    }
                </code>
            </pre>
        </div>
    );
};

export default CodeBlock;
