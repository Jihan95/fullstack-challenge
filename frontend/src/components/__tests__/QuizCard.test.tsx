import React from 'react';
import { render, screen } from '@testing-library/react';
import QuizCard from '../QuizCard';
import '@testing-library/jest-dom';

const quizMock = {
    _id: '1',
    title: 'Math Quiz 1',
    courseName: 'Mathematics',
    topic: 'Algebra',
    dueDate: '2025-08-10T15:30:00Z',
};

describe('QuizCard', () => {
    it('renders quiz title, course, topic, and due date', () => {
        render(<QuizCard quiz={quizMock} />);
        expect(screen.getByText('Math Quiz 1')).toBeInTheDocument();
        expect(screen.getByText(/Course: Mathematics/)).toBeInTheDocument();
        expect(screen.getByText(/Topic: Algebra/)).toBeInTheDocument();
        expect(screen.getByText(/Due:/)).toBeInTheDocument();
    });

    it('shows "Start Quiz" button for quiz titles', () => {
        render(<QuizCard quiz={quizMock} />);
        expect(screen.getByRole('button', { name: /Start Quiz/i })).toBeInTheDocument();
    });

    it('shows "Solve Assignment" button for assignment titles', () => {
        const assignmentQuiz = { ...quizMock, title: 'Assignment 2' };
        render(<QuizCard quiz={assignmentQuiz} />);
        expect(screen.getByRole('button', { name: /Solve Assignment/i })).toBeInTheDocument();
    });

    it('shows "View Task" button for other titles', () => {
        const otherQuiz = { ...quizMock, title: 'Final Project' };
        render(<QuizCard quiz={otherQuiz} />);
        expect(screen.getByRole('button', { name: /View Task/i })).toBeInTheDocument();
    });
});