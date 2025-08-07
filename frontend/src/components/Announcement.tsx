import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Avatar,
  IconButton,
  Button
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  School as SchoolIcon,
  Event as EventIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import AnnouncementService, { Announcement as AnnouncementType } from '../services/announcementService';

import AnnouncementItem from './AnnouncementItem';

// Placeholder implementation for getAvatarColor
export const getAvatarColor = (name: string): string => {
  const colors = ['#FF9F43', '#00BFA6', '#5F27CD', '#FF6B6B', '#45B7D1'];
  const index = name.length % colors.length;
  return colors[index];
};

// Helper function to get appropriate icon based on subject or role
export const getSubjectIcon = (subject: string, teacherName: string) => {
  const subjectLower = subject.toLowerCase();
  const teacherLower = teacherName.toLowerCase();
  
  if (subjectLower.includes('math') || subjectLower.includes('mathematics')) {
    return <Typography sx={{ fontSize: '20px' }}>📐</Typography>;
  }
  if (subjectLower.includes('physics') || subjectLower.includes('science')) {
    return <Typography sx={{ fontSize: '20px' }}>🔬</Typography>;
  }
  if (subjectLower.includes('english') || subjectLower.includes('literature')) {
    return <Typography sx={{ fontSize: '20px' }}>📚</Typography>;
  }
  if (subjectLower.includes('history') || subjectLower.includes('social')) {
    return <Typography sx={{ fontSize: '20px' }}>🏛️</Typography>;
  }
  if (teacherLower.includes('management') || teacherLower.includes('admin')) {
    return <BusinessIcon sx={{ color: '#FF9F43' }} />;
  }
  if (teacherLower.includes('event') || subjectLower.includes('event')) {
    return <EventIcon sx={{ color: '#5F27CD' }} />;
  }

  return <SchoolIcon sx={{ color: '#45B7D1' }} />;
};

const Announcement: React.FC = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await AnnouncementService.getAllAnnouncements();
      setAnnouncements(response.data);
    } catch (err) {
      setError('Failed to load announcements. Please try again.');
      console.error('Error fetching announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleRefresh = () => {
    fetchAnnouncements();
  };

  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes}m ago`;
    }
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && announcements.length === 0) {
    return (
      <Card sx={{ mb: 2, boxShadow: 'none', border: '1px solid #f0f0f0' }}>
        <CardContent>
          <Box display="flex" justifyContent="center" alignItems="center" p={3}>
            <CircularProgress size={40} />
            <Typography variant="body1" sx={{ ml: 2, color: '#666' }}>
              Loading announcements...
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: 'none',
        border: '1px solid #f0f0f0',
        borderRadius: '12px',
        position: 'relative'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography
            variant="h6"
            component="h2"
            fontWeight="600"
            color="#333"
            sx={{ fontSize: '18px' }}
          >
            Announcements
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              variant="text"
              size="small"
              sx={{
                color: '#00BFA6',
                fontWeight: '500',
                fontSize: '14px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(0, 191, 166, 0.04)'
                }
              }}
            >
              All
            </Button>
            <IconButton
              onClick={handleRefresh}
              disabled={loading}
              size="small"
              title="Refresh announcements"
              sx={{
                color: '#666',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2, fontSize: '14px' }}>
            {error}
          </Alert>
        )}

        {announcements.length === 0 && !loading ? (
          <Alert severity="info" sx={{ fontSize: '14px' }}>
            No announcements available at the moment.
          </Alert>
        ) : (
          <Box>
            {announcements.map((announcement, index) => (
              <AnnouncementItem
                key={announcement._id}
                announcement={announcement}
                index={index}
                announcementsLength={announcements.length}
                getAvatarColor={getAvatarColor}
                getSubjectIcon={getSubjectIcon}
                formatRelativeTime={formatRelativeTime}
              />
            ))}
          </Box>
        )}

        {loading && announcements.length > 0 && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgcolor="rgba(255, 255, 255, 0.8)"
            borderRadius="12px"
            zIndex={1}
          >
            <CircularProgress size={30} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default Announcement;
