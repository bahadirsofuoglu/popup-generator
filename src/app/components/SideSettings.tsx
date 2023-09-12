import React, { useState } from 'react';
import InputField from './InputField';
import { useFieldSettings } from '../context/fieldSettingsContext'; // Yolu uygun şekilde ayarlayın

const fields = ['Name', 'Email', 'PhoneNumber', 'Consent'];
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
            <div className='align-center flex justify-between'>
                <h1>{item}</h1>
                <button onClick={() => setIsOpen(!isOpen)}>+</button>
            </div>
            {isOpen ? (
                <div>
                    {fieldSettings.map((fieldType) => (
                        <div key={fieldType} className='relative mb-4'>
                            <InputField
                                label={fieldType}
                                id={`${item}-${fieldType}`}
                                name={fieldType}
                                value={fields[item][fieldType]}
                                onChange={handleInputChange}
                            />
                        </div>
                    ))}
                </div>
            ) : null}
        </>
    );
};

const SideSettings = () => {
    return (
        <section className='flex h-full flex-col justify-between'>
            <h2 className='title-font mb-1 text-lg font-medium text-gray-900'>
                Popup Settings
            </h2>
            <div className='flex-1'>
                {fields.map((item, index) => (
                    <SettingItem key={index} item={item} />
                ))}
            </div>
            <button
                onClick={() => {
                    alert('test');
                }}
                className='self-end justify-self-end rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none'
            >
                Button
            </button>
        </section>
    );
};

export default SideSettings;
