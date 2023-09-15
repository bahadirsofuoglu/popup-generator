export interface FieldSettings {
    label: string;
    errorMessage: string;
    placeholder: string;
}

export interface Fields {
    name: FieldSettings;
    email: FieldSettings;
    phoneNumber: FieldSettings;
    consent: FieldSettings;
}
