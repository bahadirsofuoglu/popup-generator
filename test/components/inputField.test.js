import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '../../components/InputField';

describe('InputField component', () => {
    it('should render label, input and error message correctly', () => {
        render(
            <InputField
                label='Test Label'
                id='testInput'
                errorMessage='This is an error'
            />
        );

        expect(screen.getByText('Test Label')).toBeInTheDocument();

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('id', 'testInput');

        expect(screen.getByText('This is an error')).toBeInTheDocument();
    });

    it('should handle input change', () => {
        render(<InputField label='Test Label' id='testInput' />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'new value' } });

        expect(input).toHaveValue('new value');
    });
});
