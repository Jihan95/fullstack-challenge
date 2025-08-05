import express from 'express';
import QuizController from '../controllers/quizController';

const router = express.Router();

router.post('/', QuizController.createQuiz);

router.get('/', QuizController.getAllQuizzes);

router.get('/:id', QuizController.getQuizById);

router.put('/:id', QuizController.updateQuiz);

router.delete('/:id', QuizController.deleteQuiz);

router.get('/topic/:topic', QuizController.getQuizzesByTopic);

router.get('/course/:courseName', QuizController.getQuizzesByCourse);

router.get('/filter/upcoming', QuizController.getUpcomingQuizzes);

export default router;
