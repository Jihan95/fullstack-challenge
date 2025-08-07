import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from '../Dashboard';
import '@testing-library/jest-dom';

jest.mock('../Sidebar', () => (props: any) => (
    <div data-testid="sidebar" data-open={props.open ? 'true' : 'false'} />
));
jest.mock('../Topbar', () => (props: any) => (
    <button data-testid="topbar-menu" onClick={props.onMenuClick}>Menu</button>
));
jest.mock('../HeaderCard', () => () => <div data-testid="header-card" />);
jest.mock('../Announcement', () => () => <div data-testid="announcement" />);
jest.mock('../Whatsdue', () => () => <div data-testid="whatsdue" />);

describe('Dashboard', () => {
    it('renders all main sections', () => {
        render(<Dashboard />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('header-card')).toBeInTheDocument();
        expect(screen.getByTestId('announcement')).toBeInTheDocument();
        expect(screen.getByTestId('whatsdue')).toBeInTheDocument();
        expect(screen.getByTestId('topbar-menu')).toBeInTheDocument();
    });

    it('sidebar is closed by default', () => {
        render(<Dashboard />);
        expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'false');
    });

    it('opens sidebar when menu button is clicked', () => {
        render(<Dashboard />);
        const menuButton = screen.getByTestId('topbar-menu');
        fireEvent.click(menuButton);
        expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'true');
    });

    it('toggles sidebar open/close on menu button click', () => {
        render(<Dashboard />);
        const menuButton = screen.getByTestId('topbar-menu');
        // Open
        fireEvent.click(menuButton);
        expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'true');
        // Close
        fireEvent.click(menuButton);
        expect(screen.getByTestId('sidebar')).toHaveAttribute('data-open', 'false');
    });
});