import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

// Mock useMediaQuery once globally
jest.mock('@mui/material', () => {
  const original = jest.requireActual('@mui/material');
  return {
    ...original,
    useMediaQuery: jest.fn(), // default to desktop, override in tests
  };
});
import { useMediaQuery } from '@mui/material';

// Mock redux store
const mockStore = {
  getState: () => ({}),
  subscribe: () => () => {},
  dispatch: jest.fn(),
};

describe('Sidebar', () => {
  const setOpen = jest.fn();

  const renderSidebar = (open = false, isMobile = false) => {
    (useMediaQuery as jest.Mock).mockReturnValue(isMobile);

    return render(
      <Provider store={mockStore as any}>
        <MemoryRouter>
          <Sidebar open={open} setOpen={setOpen} />
        </MemoryRouter>
      </Provider>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders sidebar title and menu items', () => {
    renderSidebar();
    expect(screen.getByText(/Coligo/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/Courses/i)).toBeInTheDocument();
    expect(screen.getByText(/Gradebook/i)).toBeInTheDocument();
    expect(screen.getByText(/Performance/i)).toBeInTheDocument();
    expect(screen.getByText(/Announcement/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('calls setOpen(false) when a menu item is clicked (except Logout)', () => {
    renderSidebar(true, true); // open, mobile
    const dashboardItem = screen.getByText(/Dashboard/i);
    fireEvent.click(dashboardItem);
    expect(setOpen).toHaveBeenCalledWith(false);
    });

  it('calls logout and navigates when Logout is clicked', () => {
    renderSidebar(true, true);
    const logoutItem = screen.getByText(/Logout/i);
    fireEvent.click(logoutItem);
    expect(setOpen).not.toHaveBeenCalledWith(false);
  });

  it('renders as permanent drawer on desktop', () => {
    renderSidebar(true, false); // open, desktop
    expect(screen.getByText(/Coligo/i)).toBeInTheDocument();
  });

  it('renders as temporary drawer on mobile', () => {
    renderSidebar(true, true); // open, mobile
    expect(screen.getByText(/Coligo/i)).toBeInTheDocument();
  });
});
