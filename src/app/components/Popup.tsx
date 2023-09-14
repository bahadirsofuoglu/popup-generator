import React from 'react';
import { useFieldSettings } from '../context/fieldSettingsContext';
import InputField from './InputField';
import CheckboxField from './CheckboxField';
import CloseIcon from '@/app/components/icons/CloseIcon';
const Popup = () => {
    const { fields } = useFieldSettings();

    const fieldTypes = ['name', 'email', 'phoneNumber', 'consent'];

    return (
        <div
            className='relative m-auto w-[50vw] rounded-lg bg-white p-8'
            style={{ fontFamily: 'sans-serif' }}
        >
            <form>
                {fieldTypes.map((fieldName) => {
                    const { label, placeholder, errorMessage } =
                        fields[fieldName as keyof typeof fields];

                    if (fieldName === 'consent') {
                        return (
                            <CheckboxField
                                key={fieldName}
                                label={label}
                                id={fieldName.toLowerCase()}
                                placeholder={placeholder}
                                containerClassName='mb-4'
                            />
                        );
                    }

                    return (
                        <InputField
                            key={fieldName}
                            label={label}
                            id={fieldName.toLowerCase()}
                            placeholder={placeholder}
                            containerClassName='mb-4'
                        />
                    );
                })}
                <div className='flex items-center justify-between'>
                    <button
                        className='focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
                        type='submit'
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className='absolute right-2.5 top-2.5 z-10 cursor-pointer text-black'>
                <CloseIcon />
            </div>
        </div>
    );
};

export default Popup;
