import React, { FC, InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    errorMessage?: string;
    inputClassName?: string;
    containerClassName?: string;
}

const InputField: FC<InputFieldProps> = ({
    label,
    id,
    type = 'text',
    errorMessage,
    inputClassName,
    containerClassName,
    ...rest
}) => {
    return (
        <div className={containerClassName}>
            <label htmlFor={id} className='text-sm font-bold text-black'>
                {label}
            </label>
            <input
                type={type}
                id={id}
                {...rest}
                className={`w-full rounded border border-gray-300 bg-white px-3 text-sm  leading-8 text-black  outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 ${inputClassName}`}
            />
            <span className='text-xs text-red-500'>{errorMessage}</span>
        </div>
    );
};

export default InputField;
