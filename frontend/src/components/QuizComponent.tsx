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
import QuizCard from './QuizCard';

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
            <QuizCard quiz={ quiz }/>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default QuizComponent;