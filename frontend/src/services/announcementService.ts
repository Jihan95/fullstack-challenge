import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.16:5000';
const ANNOUNCEMENTS_ENDPOINT = `${API_BASE_URL}/api/announcements`;

export interface Announcement {
  _id: string;
  teacherName: string;
  subject: string;
  content: string;
  createdAt: string;
}

export interface AnnouncementResponse {
  message: string;
  data: Announcement[];
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

class AnnouncementService {

  static async getAllAnnouncements(): Promise<AnnouncementResponse> {
    try {
      const response = await api.get(ANNOUNCEMENTS_ENDPOINT);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch announcements');
    }
  }

}


export default AnnouncementService;