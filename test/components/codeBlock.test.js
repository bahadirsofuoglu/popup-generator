import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import CodeBlock from '../../components/CodeBlock'; // Uygun import yolu kullanın
import { useToast } from '../../context/toastContext';

jest.mock('../../context/toastContext', () => ({
    useToast: jest.fn(() => ({
        openToast: jest.fn(),
    })),
}));

global.navigator.clipboard = {
    writeText: jest.fn(),
};

describe('CodeBlock', () => {
    it('should copy the code to clipboard and show success toast on button click', async () => {
        const mockOpenToast = jest.fn();
        useToast.mockImplementation(() => ({ openToast: mockOpenToast }));
        global.navigator.clipboard.writeText.mockResolvedValueOnce(undefined);

        const { getByRole } = render(<CodeBlock />);
        const copyButton = getByRole('button', { name: /copy/i });

        await act(async () => {
            fireEvent.click(copyButton);
        });

        expect(global.navigator.clipboard.writeText).toHaveBeenCalled();
        expect(mockOpenToast).toHaveBeenCalledWith(
            'Code copied to clipboard',
            'success'
        );
    });

    it('should show error toast when copying to clipboard fails', async () => {
        const mockOpenToast = jest.fn();
        useToast.mockImplementation(() => ({ openToast: mockOpenToast }));
        global.navigator.clipboard.writeText.mockRejectedValueOnce(
            new Error('An error occurred')
        );

        const { getByRole } = render(<CodeBlock />);
        const copyButton = getByRole('button', { name: /copy/i });

        await act(async () => {
            fireEvent.click(copyButton);
        });

        expect(mockOpenToast).toHaveBeenCalledWith(
            'Failed to copy code to clipboard'
        );
    });
});
