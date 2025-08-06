import React, { useState, useEffect } from 'react';
import quizService, { Quiz as QuizType } from '../services/quizService';
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import { format, parseISO } from 'date-fns';

const QuizComponent: React.FC = () => {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await quizService.getAllQuizzes();
      if (response.success && response.data) {
        setQuizzes(response.data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quizzes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 3, backgroundColor: '#fff', borderRadius: 2 }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
        What's due
      </Typography>
      <Divider sx={{ mb: 1 }} />

      {loading && quizzes.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : quizzes.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          No upcoming assignments
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {quizzes.map((quiz) => (
            <Card key={quiz._id} variant="outlined" sx={{ borderRadius: 2 }}>
              <CardContent>
                <Typography  component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
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
                        color:"#2eaba9ff",
                        fontWeight: 'bold',
                        borderColor: '#2eaba9ff',
                        '&:hover': {
                        backgroundColor: '#2eaba911',
                        borderColor: '#2eaba9',
                        }
                    }}
                    >
                    {quiz.title.toLowerCase().includes('quiz')
                        ? 'Start Quiz'
                        : quiz.title.toLowerCase().includes('assignment')
                        ? 'Solve Assignment'
                        : 'View Task'}
                </Button>

              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default QuizComponent;