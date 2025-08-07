import { render, screen } from '@testing-library/react';
import HeaderCard from '../HeaderCard';
import '@testing-library/jest-dom';

describe('HeaderCard', () => {
    it('renders the EXAMS TIME title', () => {
        render(<HeaderCard />);
        expect(screen.getByText(/EXAMS TIME/i)).toBeInTheDocument();
    });

    it('renders the motivational quote', () => {
        render(<HeaderCard />);
        expect(screen.getByText(/Nothing happens until something moves/i)).toBeInTheDocument();
        expect(screen.getByText(/Albert Einstein/i)).toBeInTheDocument();
    });

    it('renders the description text', () => {
        render(<HeaderCard />);
        expect(
            screen.getByText(/Here we are, Are you ready to fight\? Don't worry, we prepared some tips to be ready for your exams\./i)
        ).toBeInTheDocument();
    });

    it('renders the "View exams tips" button', () => {
        render(<HeaderCard />);
        expect(screen.getByRole('button', { name: /View exams tips/i })).toBeInTheDocument();
    });

    it('renders the exam illustration image', () => {
        render(<HeaderCard />);
        const img = screen.getByAltText(/Exam illustration/i);
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', './img.jpg');
    });
});