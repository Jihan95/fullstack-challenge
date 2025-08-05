import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseName: { type: String, required: true },
  topic: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

export default mongoose.model('Quiz', QuizSchema);