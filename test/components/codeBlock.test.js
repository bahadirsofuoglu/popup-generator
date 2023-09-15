import { render, screen } from '@testing-library/react';
import CodeBlock from '../../components/CodeBlock';
import { ToastProvider } from '../../context/toastContext';
import { FieldSettingsProvider } from '../../context/fieldSettingsContext';
describe('CodeBlock component', () => {
    it('should render title, button and code correctly', () => {
        render(
            <ToastProvider>
                <FieldSettingsProvider>
                    <CodeBlock />
                </FieldSettingsProvider>
            </ToastProvider>
        );

        expect(screen.getByText('JavaScript Code')).toBeInTheDocument();
        expect(screen.getByText('Copy')).toBeInTheDocument();
        expect(
            screen.getByText(
                '<script src="https://popupgenarator.s3.amazonaws.com/popupgenarator.js"></script>'
            )
        ).toBeInTheDocument();
    });
});
