import React, { createContext, useContext, useState, FC } from 'react';
import { FieldSettings, Fields } from '@/types/fieldTypes';

// This is the context that will be used to store the field settings

type Props = {
    children: React.ReactNode;
};

interface FieldSettingsContextProps {
    fields: Fields;
    updateFieldSettings: (
        fieldName: keyof Fields,
        newSettings: FieldSettings
    ) => void;
}

interface FieldName {
    label: string;
    key: string;
}

const createInitialFields = (fieldNames: FieldName[]) => {
    const initialFields: any = {};
    fieldNames.forEach((fieldName) => {
        initialFields[fieldName.key] = {
            label: fieldName.label,
            errorMessage: `${fieldName.label} is required`,
            placeholder: `Type ${fieldName.label}`,
        };
    });
    return initialFields as Fields;
};

const fieldNames = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Phone number', key: 'phoneNumber' },
    { label: 'Consent', key: 'consent' },
];
const initialFields = createInitialFields(fieldNames);

const FieldSettingsContext = createContext<FieldSettingsContextProps>({
    fields: initialFields,
    updateFieldSettings: () => {},
});

export const FieldSettingsProvider = ({ children }: Props) => {
    const [fields, setFields] = useState<Fields>(initialFields);

    const updateFieldSettings = (
        fieldName: keyof Fields,
        newSettings: FieldSettings
    ) => {
        setFields({
            ...fields,
            [fieldName]: newSettings,
        });
    };

    return (
        <FieldSettingsContext.Provider value={{ fields, updateFieldSettings }}>
            {children}
        </FieldSettingsContext.Provider>
    );
};

export const useFieldSettings = (): FieldSettingsContextProps => {
    const context = useContext(FieldSettingsContext);
    if (!context) {
        throw new Error(
            'useFieldSettings must be used within a FieldSettingsProvider'
        );
    }
    return context;
};
