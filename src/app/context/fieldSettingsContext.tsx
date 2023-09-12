import React, { createContext, useContext, useState, FC } from 'react';

type Props = {
    children: React.ReactNode;
};

interface FieldSettings {
    label: string;
    errorMessage: string;
    placeholder: string;
}

interface Fields {
    Name: FieldSettings;
    Email: FieldSettings;
    PhoneNumber: FieldSettings;
    Consent: FieldSettings;
}

interface FieldSettingsContextProps {
    fields: Fields;
    updateFieldSettings: (
        fieldName: keyof Fields,
        newSettings: FieldSettings
    ) => void;
}

const createInitialFields = (fieldNames: string[]) => {
    const initialFields: any = {};
    fieldNames.forEach((fieldName) => {
        initialFields[fieldName] = {
            label: fieldName,
            errorMessage: `${fieldName} is required`,
            placeholder: `Type ${fieldName}`,
        };
    });
    return initialFields as Fields;
};

const fieldNames = ['Name', 'Email', 'PhoneNumber', 'Consent'];
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

export const useFieldSettings = () => {
    return useContext(FieldSettingsContext);
};
