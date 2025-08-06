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

// Helper function to get avatar color based on name
const getAvatarColor = (name: string): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', 
    '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

// Helper function to get initials from name
const getInitials = (name: string): string => {
  const honorifics = ['mr', 'mrs', 'ms', 'dr', 'prof'];
  const words = name
    .split(' ')
    .filter(word => !honorifics.includes(word.toLowerCase()));

  return words
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Helper function to get appropriate icon based on subject or role
const getSubjectIcon = (subject: string, teacherName: string) => {
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
  // State management
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Fetch announcements from API
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

  // Load announcements when component mounts
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle refresh
  const handleRefresh = () => {
    fetchAnnouncements();
  };

  // Format date to relative time
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

  // Loading state
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
    <Card sx={{ 
      mb: 2, 
      boxShadow: 'none', 
      border: '1px solid #f0f0f0',
      borderRadius: '12px'
    }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
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

        {/* Error message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2, fontSize: '14px' }}>
            {error}
          </Alert>
        )}

        {/* Announcements list */}
        {announcements.length === 0 && !loading ? (
          <Alert severity="info" sx={{ fontSize: '14px' }}>
            No announcements available at the moment.
          </Alert>
        ) : (
          <Box>
            {announcements.map((announcement, index) => (
              <Box key={announcement._id} sx={{ mb: index === announcements.length - 1 ? 0 : 3 }}>
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
                      {getInitials(announcement.teacherName)}
                    </Avatar>
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {/* Teacher name and subject (tight together) */}
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

                    {/* Vertical separator positioned at fixed width */}
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
                      
                      {/* Announcement content */}
                      <Box sx={{ pl: '220px', pr: 2, mt: "-30px"}}>
                        <Typography 
                          variant="body2" 
                          color='#555'
                          fontWeight="400"
                          sx={{ 
                            fontSize: '16px',
                            wordBreak: 'break-word',
                            lineHeight: 1
                          }}
                        >
                          {announcement.content}
                        </Typography>
                        
                        {/* Time stamp */}
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
            ))}
          </Box>
        )}

        {/* Loading overlay for refresh */}
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