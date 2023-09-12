import React, { FC, InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

const InputField: FC<InputFieldProps> = ({
    label,
    id,
    type = 'text',
    ...rest
}) => {
    return (
        <div>
            <label htmlFor={id} className='text-sm leading-7 text-gray-600'>
                {label}
            </label>
            <input
                type={type}
                id={id}
                {...rest}
                className='w-full rounded border border-gray-300 bg-white px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200'
            />
        </div>
    );
};

export default InputField;
