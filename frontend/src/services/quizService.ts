import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.16:5000';
const QUIZZES_ENDPOINT = `${API_BASE_URL}/api/quizzes`;

export interface Quiz {
  _id: string;
  title: string;
  courseName: string;
  topic: string;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  details?: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

class QuizService {

  static async getAllQuizzes(): Promise<ApiResponse<Quiz[]>> {
    try {
      const response = await api.get(QUIZZES_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch quizzes');
    }
  }
}

export default QuizService;
