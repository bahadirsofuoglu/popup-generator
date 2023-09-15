import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import SideSettings from '../../components/SideSettings'; // Uygun import yolu kullanın
import { FieldSettingsProvider } from '../../context/fieldSettingsContext'; // Context Provider'ı import edin
import { useToast } from '../../context/toastContext';
jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            push: jest.fn(),
        };
    },
}));

jest.mock('../../context/toastContext', () => ({
    useToast: jest.fn(() => ({
        openToast: jest.fn(),
    })),
}));

global.fetch = jest.fn();

test('SideSettings renders and can submit', () => {
    const { getByText } = render(
        <FieldSettingsProvider>
            <SideSettings />
        </FieldSettingsProvider>
    );

    const generateButton = getByText(/Generate Popup/i);
    expect(generateButton).toBeInTheDocument();

    fireEvent.click(generateButton);
});

test('SideSettings submit handles API response correctly', async () => {
    const mockOpenToast = jest.fn();

    useToast.mockImplementation(() => ({ openToast: mockOpenToast }));

    const { getByText } = render(
        <FieldSettingsProvider>
            <SideSettings />
        </FieldSettingsProvider>
    );

    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
    });

    const generateButton = getByText(/Generate Popup/i);

    await act(async () => {
        fireEvent.click(generateButton);
    });

    expect(mockOpenToast).toHaveBeenCalledWith(
        'Popup generated successfully',
        'success'
    );
});

test('SideSettings handles failed API response correctly', async () => {
    const mockOpenToast = jest.fn();

    useToast.mockImplementation(() => ({ openToast: mockOpenToast }));

    const { getByText } = render(
        <FieldSettingsProvider>
            <SideSettings />
        </FieldSettingsProvider>
    );

    fetch.mockResolvedValueOnce({
        ok: false,
    });

    const generateButton = getByText(/Generate Popup/i);

    await act(async () => {
        fireEvent.click(generateButton);
    });

    expect(mockOpenToast).toHaveBeenCalledWith('Something went wrong');
});
