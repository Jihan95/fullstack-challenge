import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Announcement from '../Announcement';
import AnnouncementService from '../../services/announcementService';
import '@testing-library/jest-dom';

// Mock AnnouncementService
jest.mock('../../services/announcementService');
const mockGetAllAnnouncements = AnnouncementService.getAllAnnouncements as jest.Mock;

const mockAnnouncements = [
    {
        _id: '1',
        teacherName: 'Alice Smith',
        subject: 'Mathematics',
        content: 'Exam next week!',
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    },
    {
        _id: '2',
        teacherName: 'Bob Johnson',
        subject: 'Physics',
        content: 'Lab report due Friday.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
];

describe('Announcement', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows loading state initially', async () => {
        mockGetAllAnnouncements.mockReturnValue(new Promise(() => { })); // never resolves
        render(<Announcement />);
        expect(screen.getByText(/Loading announcements/i)).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('renders announcements after loading', async () => {
        mockGetAllAnnouncements.mockResolvedValue({ data: mockAnnouncements });
        render(<Announcement />);
        expect(await screen.findByText('Announcements')).toBeInTheDocument();
        expect(await screen.findByText('Alice Smith')).toBeInTheDocument();
        expect(await screen.findByText('Mathematics')).toBeInTheDocument();
        expect(await screen.findByText('Exam next week!')).toBeInTheDocument();
        expect(await screen.findByText('Bob Johnson')).toBeInTheDocument();
        expect(await screen.findByText('Physics')).toBeInTheDocument();
        expect(await screen.findByText('Lab report due Friday.')).toBeInTheDocument();
    });

    it('shows info alert if no announcements', async () => {
        mockGetAllAnnouncements.mockResolvedValue({ data: [] });
        render(<Announcement />);
        expect(await screen.findByText(/No announcements available/i)).toBeInTheDocument();
    });

    it('shows error alert if fetch fails', async () => {
        const originalError = console.error;
        console.error = jest.fn();
        mockGetAllAnnouncements.mockRejectedValue(new Error('Network error'));
        render(<Announcement />);
        expect(await screen.findByText(/Failed to load announcements/i)).toBeInTheDocument();
        console.error = originalError; 
    });

    it('refresh button reloads announcements', async () => {
        mockGetAllAnnouncements.mockResolvedValueOnce({ data: mockAnnouncements });
        render(<Announcement />);
        expect(await screen.findByText('Alice Smith')).toBeInTheDocument();

        // Change mock for refresh
        mockGetAllAnnouncements.mockResolvedValueOnce({ data: [mockAnnouncements[1]] });

        const refreshBtn = screen.getByTitle(/refresh announcements/i);
        fireEvent.click(refreshBtn);

        expect(await screen.findByText('Bob Johnson')).toBeInTheDocument();
        expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
    });
});