import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Topbar from '../Topbar';
import '@testing-library/jest-dom';

// Mock useTheme and useMediaQuery
jest.mock('@mui/material/styles', () => {
    const actual = jest.requireActual('@mui/material/styles');
    return {
        ...actual,
        useTheme: () => ({
            palette: {
                background: { paper: '#fff' },
                action: { hover: '#eee' },
                divider: '#ccc',
                primary: { main: '#588F9A' }
            },
            breakpoints: {
                down: (key: string) => `@media (max-width: ${key})`
            }
        }),
    };
});

jest.mock('@mui/material', () => {
    const actual = jest.requireActual('@mui/material');
    return {
        ...actual,
        useMediaQuery: jest.fn(() => false), // default to desktop
    };
});

describe('Topbar', () => {
    it('renders welcome message', () => {
        render(<Topbar />);
        expect(screen.getByText(/Welcome Talia/i)).toBeInTheDocument();
    });

    it('renders search input', () => {
        render(<Topbar />);
        expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    });

    it('renders avatar', () => {
        render(<Topbar />);
        expect(screen.getByRole('img', { name: /user/i })).toBeInTheDocument();
    });

    it('shows menu button on mobile and calls onMenuClick', () => {
        // Mock useMediaQuery to return true (mobile)
        const useMediaQuery = require('@mui/material').useMediaQuery;
        useMediaQuery.mockImplementation(() => true);

        const onMenuClick = jest.fn();
        render(<Topbar onMenuClick={onMenuClick} />);
        const menuBtn = screen.getByRole('button', { name: '' });
        expect(menuBtn).toBeInTheDocument();
        fireEvent.click(menuBtn);
        expect(onMenuClick).toHaveBeenCalled();
        // Restore mock for other tests
        useMediaQuery.mockImplementation(() => false);
    });
});