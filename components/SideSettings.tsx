import React, { useState } from 'react';
import InputField from './InputField';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import { useFieldSettings } from '../context/fieldSettingsContext';
import { useToast } from '../context/toastContext';
import { useRouter } from 'next/navigation';
import { FieldSettings, Fields } from '@/types/fieldTypes';

// This is the side settings component that will be used to change the field settings
// The field settings are the label, placeholder and error message
// The field settings are stored in the fieldSettingsContext

const Fields = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Consent', key: 'consent' },
];
const fieldSettings = [
    { label: 'Label', key: 'label' },
    { label: 'Placeholder', key: 'placeholder' },
    { label: 'Error Message', key: 'errorMessage' },
];

const SettingItem = ({ item }: { item: { label: string; key: string } }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { fields, updateFieldSettings } = useFieldSettings();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        updateFieldSettings(item.key as keyof typeof fields, {
            ...fields[item.key as keyof typeof fields],
            [name]: value,
        });
    };

    return (
        <>
            <div
                className={` border-natural-300 mt-2 rounded border-2 bg-neutral-100/75 px-2 pb-2  `}
            >
                <div className='align-center mt-2 flex justify-between '>
                    <h1 className='text-sm  text-black'>{item.label}</h1>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className='rounded hover:bg-neutral-300'
                    >
                        {isOpen ? <MinusIcon /> : <PlusIcon />}
                    </button>
                </div>
                {isOpen ? (
                    <div className='hover:unset duration-600 mt-2 transition-all ease-in-out'>
                        {fieldSettings.map((fieldType) => (
                            <div key={fieldType.key} className='relative mb-4'>
                                <InputField
                                    label={fieldType.label}
                                    id={`${item}-${fieldType}`}
                                    name={fieldType.key}
                                    value={
                                        fields[item.key as keyof Fields]?.[
                                            fieldType.key as keyof FieldSettings
                                        ]
                                    }
                                    inputClassName='h-7'
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </>
    );
};

const SideSettings = () => {
    const { fields } = useFieldSettings();
    const { openToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/generateJs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fields }),
            });

            if (response.ok) {
                await response.json();
                openToast('Popup generated successfully', 'success');
                router.push('/generate-popup');
            } else {
                openToast('Something went wrong');
            }
        } catch (error) {
            openToast('Something went wrong');
        }
    };
    return (
        <section className='flex h-full flex-col justify-between'>
            <h2 className='title-font mb-1 text-lg font-bold text-gray-900'>
                Popup Settings
            </h2>
            <div className='flex-1'>
                {Fields.map((item, index) => (
                    <SettingItem key={index} item={item} />
                ))}
            </div>
            <button
                onClick={(e) => handleSubmit(e)}
                className='focus:shadow-outline mt-1 self-end justify-self-end rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
            >
                Generate Popup
            </button>
        </section>
    );
};

export default SideSettings;
