import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxField from '../../components/CheckboxField';

describe('CheckboxField component', () => {
    it('should render label, placeholder and input correctly', () => {
        const props = {
            label: 'Sample Label',
            id: 'sampleId',
            placeholder: 'Sample Placeholder',
            errorMessage: null,
        };

        render(<CheckboxField {...props} />);

        expect(screen.getByLabelText('Sample Label')).toBeInTheDocument();
        expect(screen.getByText('Sample Placeholder')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('should show error message when provided', () => {
        const props = {
            label: 'Sample Label',
            id: 'sampleId',
            placeholder: 'Sample Placeholder',
            errorMessage: 'Sample Error',
        };

        render(<CheckboxField {...props} />);

        expect(screen.getByText('Sample Error')).toBeInTheDocument();
    });

    it('should toggle checkbox on click', async () => {
        const props = {
            label: 'Sample Label',
            id: 'sampleId',
            placeholder: 'Sample Placeholder',
            errorMessage: null,
        };

        render(<CheckboxField {...props} />);
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox.checked).toEqual(false);

        await userEvent.click(checkbox);
        expect(checkbox.checked).toEqual(true);

        await userEvent.click(checkbox);
        expect(checkbox.checked).toEqual(false);
    });
});
