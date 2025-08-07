import { render, screen } from '@testing-library/react';
import AnnouncementItem from '../AnnouncementItem';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store/index';
import axios from 'axios';

const mockAnnouncement = {
    _id: '1',
    teacherName: 'Ahmed Mohamed',
    subject: 'Math',
    content: 'Test announcement content',
    createdAt: '2023-08-01T12:00:00Z',
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.interceptors = {
    request: {
        use: jest.fn(),
        eject: jest.fn(),
    },
    response: {
        use: jest.fn(),
        eject: jest.fn(),
    },
} as any;

const getAvatarColor = jest.fn(() => '#123456');
const getSubjectIcon = jest.fn(() => <span data-testid="subject-icon" />);
const formatRelativeTime = jest.fn(() => '2 hours ago');

describe('AnnouncementItem', () => {
    it('renders teacher initials in avatar', () => {
        render(
            <Provider store={store}>
                <AnnouncementItem
                    announcement={mockAnnouncement}
                    index={0}
                    announcementsLength={1}
                    getAvatarColor={getAvatarColor}
                    getSubjectIcon={getSubjectIcon}
                    formatRelativeTime={formatRelativeTime}
                />
            </Provider>
        );

        expect(screen.getByText('M')).toBeInTheDocument();
    });

    it('renders teacher name, subject, and content', () => {
        render(
            <Provider store={store}>
                <AnnouncementItem
                    announcement={mockAnnouncement}
                    index={0}
                    announcementsLength={1}
                    getAvatarColor={getAvatarColor}
                    getSubjectIcon={getSubjectIcon}
                    formatRelativeTime={formatRelativeTime}
                />
            </Provider>
        );
        expect(screen.getByText('Ahmed Mohamed')).toBeInTheDocument();
        expect(screen.getByText('Math')).toBeInTheDocument();
        expect(screen.getByText('Test announcement content')).toBeInTheDocument();
    });

    it('renders formatted relative time', () => {
        render(
            <Provider store={store}>
                <AnnouncementItem
                    announcement={mockAnnouncement}
                    index={0}
                    announcementsLength={1}
                    getAvatarColor={getAvatarColor}
                    getSubjectIcon={getSubjectIcon}
                    formatRelativeTime={formatRelativeTime}
                />
            </Provider>
        );
        expect(screen.getByText('2 hours ago')).toBeInTheDocument();
    });

    it('renders subject icon', () => {
        render(
            <Provider store={store}>
                <AnnouncementItem
                    announcement={mockAnnouncement}
                    index={0}
                    announcementsLength={1}
                    getAvatarColor={getAvatarColor}
                    getSubjectIcon={getSubjectIcon}
                    formatRelativeTime={formatRelativeTime}
                />
            </Provider>
        );
        expect(screen.getByTestId('subject-icon')).toBeInTheDocument();
    });
});