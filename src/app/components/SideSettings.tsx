import React, { useState } from 'react';
import InputField from './InputField';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import { useFieldSettings } from '../context/fieldSettingsContext'; // Yolu uygun şekilde ayarlayın

const Fields = ['Name', 'Email', 'PhoneNumber', 'Consent'];
const fieldSettings = ['label', 'errorMessage', 'placeholder'];

const SettingItem = ({ item }: { item: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { fields, updateFieldSettings } = useFieldSettings();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        updateFieldSettings(item as keyof typeof fields, {
            ...fields[item as keyof typeof fields],
            [name]: value,
        });
    };

    return (
        <>
            <div
                className={` border-natural-300 mt-2 rounded border-2 bg-neutral-100/75 px-2 pb-2  `}
            >
                <div className='align-center mt-2 flex justify-between '>
                    <h1 className='text-sm  text-black'>{item}</h1>
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
                            <div key={fieldType} className='relative mb-4'>
                                <InputField
                                    label={fieldType}
                                    id={`${item}-${fieldType}`}
                                    name={fieldType}
                                    value={fields[item][fieldType]}
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
    const { fields, updateFieldSettings } = useFieldSettings();
    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        console.log(fields);
        try {
            const response = await fetch('/api/generateJs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fields }),
            });

            if (response.ok) {
                const data = await response.json();
            } else {
            }
        } catch (error) {
            console.log(error);
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
                className='focus:shadow-outline self-end justify-self-end rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none'
            >
                Generate Popup
            </button>
        </section>
    );
};

export default SideSettings;
