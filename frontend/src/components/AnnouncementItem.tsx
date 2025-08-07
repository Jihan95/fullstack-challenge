import React from 'react';
import {
  Box,
  Avatar,
  Typography
} from '@mui/material';

interface Announcement {
  _id: string;
  teacherName: string;
  subject: string;
  content: string;
  createdAt: string;
}

interface AnnouncementItemProps {
  announcement: Announcement;
  index: number;
  announcementsLength: number;
  getAvatarColor: (name: string) => string;
  getSubjectIcon: (subject: string, teacherName: string) => React.ReactNode;
  formatRelativeTime: (date: string) => string;
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({
    announcement,
    index,
    announcementsLength,
    getAvatarColor,
    getSubjectIcon,
    formatRelativeTime
    }) => {
    const initials = announcement.teacherName
        .split(' ')
        .slice(1)
        .map(n => n[0].toUpperCase())
        .join('')
        .slice(0, 2);

    return (
    <Box key={announcement._id} sx={{ mb: index === announcementsLength - 1 ? 0 : 3 }}>
        <Box display="flex" alignItems="flex-start" justifyContent="flex-start">
        {/* Avatar */}
        <Box sx={{ flexShrink: 0, width: '40px' }}>
            <Avatar
            sx={{
                width: 40,
                height: 40,
                bgcolor: getAvatarColor(announcement.teacherName),
                fontSize: '14px',
                fontWeight: '600'
            }}
            >
            {initials}
            </Avatar>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0, px: '0px' }}>
            <Box display="flex" alignItems="center" flexDirection="column" sx={{ width: '200px' }}>
            <Typography
                variant="body2"
                fontWeight="600"
                color="#333"
                sx={{
                fontSize: '14px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                flexShrink: 1,
                minWidth: 0
                }}
            >
                {announcement.teacherName}
            </Typography>
            <Typography
                variant="body2"
                color="#666"
                sx={{
                fontSize: '13px',
                ml: 0.5,
                whiteSpace: 'nowrap'
                }}
            >
                {announcement.subject}
            </Typography>
            </Box>

            {/* Vertical line and content */}
            <Box sx={{ position: 'relative' }}>
            <Box
                sx={{
                position: 'absolute',
                left: '200px',
                top: '-20px',
                bottom: '0px',
                width: '1px',
                backgroundColor: '#e0e0e0'
                }}
            />

            <Box sx={{ pl: '220px', pr: 2, mt: '-30px' }}>
                <Typography
                variant="body2"
                color="#555"
                fontWeight="400"
                sx={{
                    fontSize: '16px',
                    wordBreak: 'break-word',
                    lineHeight: 1
                }}
                >
                {announcement.content}
                </Typography>

                <Typography
                variant="caption"
                color="#999"
                sx={{
                    fontSize: '12px',
                    display: 'block',
                    mt: 0.5
                }}
                >
                {formatRelativeTime(announcement.createdAt)}
                </Typography>
            </Box>
            </Box>
        </Box>

        {/* Subject icon */}
        <Box sx={{ flexShrink: 0, alignSelf: 'flex-start', mt: 0.5 }}>
            {getSubjectIcon(announcement.subject, announcement.teacherName)}
        </Box>
        </Box>
    </Box>
    );
};

export default AnnouncementItem;
