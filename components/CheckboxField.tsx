import React from 'react';

interface CheckboxFieldProps {
    label: string;
    id: string;
    errorMessage?: string;
    placeholder: string;
    containerClassName?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
    label,
    id,
    placeholder,
    errorMessage,
    containerClassName,
}) => {
    const containerClasses = `flex flex-col items-start ${containerClassName}`;
    return (
        <div className={containerClasses}>
            <label htmlFor={id} className='text-sm font-bold text-black'>
                {label}
            </label>
            <div className='flex items-center'>
                <input required type='checkbox' id={id} className='mr-2' />
                <span className='text-sm '>{placeholder}</span>
            </div>
            {errorMessage && (
                <span className='text-xs text-red-500'>{errorMessage}</span>
            )}
        </div>
    );
};

export default CheckboxField;
