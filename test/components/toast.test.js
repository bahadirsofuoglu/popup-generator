import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from '../../context/toastContext';
import Toast from '../../components/Toast';

const Wrapper = () => {
    const toast = useToast();
    return (
        <>
            <button onClick={() => toast.openToast('Hello world', 'error')}>
                Open Toast
            </button>
            <Toast />
        </>
    );
};

describe('Toast Component', () => {
    it('should render correctly with the given type and message', async () => {
        const result = render(
            <ToastProvider>
                <Wrapper />
            </ToastProvider>
        );

        expect(screen.queryByText('ERROR')).toBeNull();
        expect(screen.queryByText('Hello world')).toBeNull();

        act(() => {
            userEvent.click(screen.getByText('Open Toast'));
        });

        await waitFor(() => {
            expect(screen.getByText('ERROR')).toBeInTheDocument();
        });

        expect(result.container.querySelector('#pg-toast')).toHaveClass(
            'bg-red-500'
        );
    });
});
