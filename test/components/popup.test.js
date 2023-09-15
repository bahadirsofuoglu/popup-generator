import { render, screen } from '@testing-library/react';
import Popup from '../../components/Popup';
import { useFieldSettings } from '../../context/fieldSettingsContext';

jest.mock('../../context/fieldSettingsContext', () => ({
    useFieldSettings: jest.fn(),
}));

describe('Popup component', () => {
    beforeEach(() => {
        useFieldSettings.mockReturnValue({
            fields: {
                name: {
                    label: 'Name',
                    placeholder: 'Enter name',
                    errorMessage: 'Error',
                },
                email: {
                    label: 'Email',
                    placeholder: 'Enter email',
                    errorMessage: 'Error',
                },
                phoneNumber: {
                    label: 'Phone',
                    placeholder: 'Enter phone',
                    errorMessage: 'Error',
                },
                consent: {
                    label: 'Consent',
                    placeholder: 'Give consent',
                    errorMessage: 'Error',
                },
            },
        });
    });

    it('should render various input fields and a submit button', () => {
        render(<Popup />);

        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone')).toBeInTheDocument();
        expect(screen.getByLabelText('Consent')).toBeInTheDocument();

        expect(
            screen.getByRole('button', { name: /submit/i })
        ).toBeInTheDocument();
    });
});
