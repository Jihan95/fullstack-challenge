import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button
} from '@mui/material';
import { format, parseISO } from 'date-fns';

interface QuizCardProps {
  quiz: {
    _id: string;
    title: string;
    courseName: string;
    topic: string;
    dueDate: string;
  };
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const getButtonLabel = (title: string): string => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('quiz')) return 'Start Quiz';
    if (lowerTitle.includes('assignment')) return 'Solve Assignment';
    return 'View Task';
  };

  return (
    <Card key={quiz._id} variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          {quiz.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Course: {quiz.courseName}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Topic: {quiz.topic}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Due: {format(parseISO(quiz.dueDate), 'd MMM yyyy - hh:mm a')}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            width: '100%',
            color: '#2eaba9ff',
            fontWeight: 'bold',
            borderColor: '#2eaba9ff',
            '&:hover': {
              backgroundColor: '#2eaba911',
              borderColor: '#2eaba9'
            }
          }}
        >
          {getButtonLabel(quiz.title)}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
