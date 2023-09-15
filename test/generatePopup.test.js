import { render, screen } from '@testing-library/react';
import Page from '../app/generate-popup/page'; // Uygun yoldan import edin
import { useRouter } from 'next/router';
import { ToastProvider } from '../context/toastContext';
import { FieldSettingsProvider } from '../context/fieldSettingsContext';
jest.mock('../components/CodeBlock', () => {
    return function DummyCodeBlock() {
        return <div data-testid='codeblock'>CodeBlock Component</div>;
    };
});

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('Page component', () => {
    it('should render CodeBlock component, text, and link', () => {
        useRouter.mockImplementationOnce(() => ({
            route: '/',
            pathname: '/',
            query: '',
            asPath: '/',
        }));

        render(
            <ToastProvider>
                <FieldSettingsProvider>
                    <Page />
                </FieldSettingsProvider>
            </ToastProvider>
        );

        expect(screen.getByTestId('codeblock')).toBeInTheDocument();

        expect(screen.getByText('OR')).toBeInTheDocument();
        expect(screen.getByText('OR')).toHaveClass(
            'font-bold',
            'text-white',
            'my-4'
        );

        expect(screen.getByText('Go to Test Page')).toBeInTheDocument();
    });
});
