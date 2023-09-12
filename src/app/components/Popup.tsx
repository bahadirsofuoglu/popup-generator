import React from 'react';
import { useFieldSettings } from '../context/fieldSettingsContext';
import InputField from './InputField';
import CheckboxField from './CheckboxField';

const Popup = () => {
    const { fields } = useFieldSettings();

    return (
        <div className='w-full rounded-lg bg-white p-8'>
            <form>
                {['Name', 'Email', 'PhoneNumber', 'Consent'].map(
                    (fieldName) => {
                        const { label, placeholder, errorMessage } =
                            fields[fieldName as keyof typeof fields];
                        const pattern =
                            fieldName === 'Email'
                                ? '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
                                : fieldName === 'PhoneNumber'
                                ? '\\d+'
                                : undefined;

                        if (fieldName === 'Consent') {
                            return (
                                <CheckboxField
                                    key={fieldName}
                                    label={label}
                                    id={fieldName.toLowerCase()}
                                    errorMessage={errorMessage}
                                    placeholder={placeholder}
                                />
                            );
                        }

                        return (
                            <InputField
                                key={fieldName}
                                label={label}
                                id={fieldName.toLowerCase()}
                                placeholder={placeholder}
                                errorMessage={errorMessage}
                                pattern={pattern}
                            />
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
