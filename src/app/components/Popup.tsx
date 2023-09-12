import React from 'react';
import { useFieldSettings } from '../context/fieldSettingsContext'; // Yolu uygun şekilde ayarlayın

const Popup = () => {
    const { fields } = useFieldSettings();

    return (
        <div className='w-full rounded-lg bg-white p-8'>
            <form>
                {['Name', 'Email', 'PhoneNumber', 'Consent'].map(
                    (fieldName) => {
                        const { label, placeholder, errorMessage } =
                            fields[fieldName as keyof typeof fields];
                        return (
                            <div className='mb-4' key={fieldName}>
                                <label
                                    className='mb-2 block text-sm font-bold text-gray-700'
                                    htmlFor={fieldName.toLowerCase()}
                                >
                                    {label}
                                </label>
                                <input
                                    required
                                    className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                                    id={fieldName.toLowerCase()}
                                    type='text'
                                    placeholder={placeholder}
                                    pattern={
                                        fieldName === 'Email'
                                            ? '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
                                            : fieldName === 'PhoneNumber'
                                            ? '\\d+'
                                            : undefined
                                    }
                                />
                                <span className='text-xs text-red-500'>
                                    {errorMessage}
                                </span>
                            </div>
                        );
                    }
                )}
                <div className='flex items-center justify-between'>
                    <button
                        className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
                        type='submit'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Popup;
