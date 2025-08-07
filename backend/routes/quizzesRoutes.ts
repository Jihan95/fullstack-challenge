import express from 'express';
import QuizController from '../controllers/quizController';

const router = express.Router();

router.post('/', QuizController.createQuiz);
router.get('/', QuizController.getAllQuizzes);
router.get('/:id', QuizController.getQuizById);
router.put('/:id', QuizController.updateQuiz);
router.delete('/:id', QuizController.deleteQuiz);

export default router;
