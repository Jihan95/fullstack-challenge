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

export interface SingleAnnouncementResponse {
  message: string;
  data: Announcement;
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

  static async getAnnouncementById(id: string): Promise<SingleAnnouncementResponse> {
    try {
      const response = await api.get(`${ANNOUNCEMENTS_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch announcement');
    }
  }

  static async getAnnouncementsByTeacher(teacherName: string): Promise<AnnouncementResponse> {
    try {
      const response = await api.get(`${ANNOUNCEMENTS_ENDPOINT}/teacher/${encodeURIComponent(teacherName)}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch teacher announcements');
    }
  }

  static async getAnnouncementsBySubject(subject: string): Promise<AnnouncementResponse> {
    try {
      const response = await api.get(`/announcements/subject/${encodeURIComponent(subject)}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch subject announcements');
    }
  }
}


export default AnnouncementService;