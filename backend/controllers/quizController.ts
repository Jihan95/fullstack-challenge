import Quiz from "../models/Quiz";
import { Request, Response } from "express";

interface QuizData {
  title?: string;
  courseName?: string;
  topic?: string;
  dueDate?: Date;
}

class QuizController {

    static async createQuiz(req: Request, res: Response): Promise<void> {
        try {
            const { title, courseName, topic, dueDate }: QuizData = req.body;
            if (!title || !courseName || !topic || !dueDate) {
                res.status(400).json({
                    error: 'All fields (title, courseName, topic, dueDate) are required'
                });
                return;
            }

            const currentDate = new Date();
            const quizDueDate = new Date(dueDate);
        
            if (quizDueDate < currentDate) {
                res.status(400).json({
                success: false,
                message: 'Due date cannot be in the past'
            });
            }

            const quiz = await Quiz.create({
                title,
                courseName,
                topic,
                dueDate: quizDueDate
            });

            res.status(201).json({
                success: true,
                message: 'Quiz created successfully',
                data: quiz
            });

        } catch (error) {
            console.error('Error creating quiz:', error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }

    static async getAllQuizzes(req: Request, res: Response): Promise<void> {
        try {
            const quizzes = await Quiz.find().sort({ dueDate: 1 });
            res.status(200).json({
            success: true,
            count: quizzes.length,
            data: quizzes
            });
        } catch (error) {
            console.error('Error retrieving quizzes:', error);
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }

    static async getQuizById(req: Request, res: Response): Promise<void> {
        try {
            const quiz = await Quiz.findById(req.params.id);
            
            if (!quiz) {
                res.status(404).json({
                    success: false,
                    message: 'Quiz not found'
                });
            }
            
            res.status(200).json({
                success: true,
                data: quiz
            });
        } catch (error) {
             if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }

    static async updateQuiz(req: Request, res: Response): Promise<void> {
        try {
            const { title, courseName, topic, dueDate } = req.body;

            if (!title || !courseName || !topic || !dueDate) {
                res.status(400).json({
                    success: false,
                    message: 'Title, courseName, duedate and topic are required'
                });
                return;
            }

            if (dueDate) {
                const currentDate = new Date();
                const quizDueDate = new Date(dueDate);
                
                if (quizDueDate < currentDate) {
                    res.status(400).json({
                        success: false,
                        message: 'Due date cannot be in the past'
                    });
                    return;
                }
            }

            const quiz = await Quiz.findByIdAndUpdate(
                req.params.id,
                { title, courseName, topic, dueDate },
                { new: true, runValidators: true }
            );

            if (!quiz) {
                res.status(404).json({
                    success: false,
                    message: 'Quiz not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Quiz updated successfully',
                data: quiz
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }


    static async deleteQuiz(req: Request, res: Response): Promise<void> {
        try {
            const quiz = await Quiz.findByIdAndDelete(req.params.id);
            
            if (!quiz) {
                res.status(404).json({
                    success: false,
                    message: 'Quiz not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Quiz deleted successfully'
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }

    static async getQuizzesByTopic(req: Request, res: Response): Promise<void> {
        try {
            const { topic } = req.params;
            const quizzes = await Quiz.find({ 
                topic: { $regex: topic, $options: 'i' } 
            }).sort({ dueDate: 1 });

            res.status(200).json({
                success: true,
                count: quizzes.length,
                data: quizzes
            });

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }

    static async getQuizzesByCourse(req: Request, res: Response): Promise<void> {
        try {
            const { courseName } = req.params;
            const quizzes = await Quiz.find({ 
            courseName: { $regex: courseName, $options: 'i' } 
            }).sort({ dueDate: 1 });

            res.status(200).json({
            success: true,
            count: quizzes.length,
            data: quizzes
            });
        } catch (error) {
             if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }

    static async getUpcomingQuizzes(req: Request, res: Response): Promise<void> {
        try {
            const currentDate = new Date();
            const nextWeek = new Date();
            nextWeek.setDate(currentDate.getDate() + 7);

            const quizzes = await Quiz.find({
            dueDate: {
                $gte: currentDate,
                $lte: nextWeek
            }
            }).sort({ dueDate: 1 });

            res.status(200).json({
            success: true,
            count: quizzes.length,
            data: quizzes
            });
        } catch (error) {
             if (error instanceof Error) {
                res.status(500).json({ message: 'Internal server error', details: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error', details: String(error) });
            }
        }
    }
}

export default QuizController;