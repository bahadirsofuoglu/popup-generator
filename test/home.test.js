import { render, screen } from '@testing-library/react';
import Home from '../app/page';

jest.mock('../components/Popup', () => {
    return function DummyPopup() {
        return <div data-testid='popup'>Popup Component</div>;
    };
});

jest.mock('../components/SideSettings', () => {
    return function DummySideSettings() {
        return <div data-testid='side-settings'>SideSettings Component</div>;
    };
});

describe('Home component', () => {
    it('should render Popup and SideSettings components', () => {
        render(<Home />);

        expect(screen.getByTestId('popup')).toBeInTheDocument();
        expect(screen.getByText('Popup Component')).toBeInTheDocument();

        expect(screen.getByTestId('side-settings')).toBeInTheDocument();
        expect(screen.getByText('SideSettings Component')).toBeInTheDocument();
    });
});
