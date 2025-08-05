import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../index';
import Quiz from '../models/Quiz';

describe('Quiz API', () => {
  let quizId: string;

  const quizData = {
    title: 'Sample Quiz',
    description: 'A sample quiz for testing',
    topic: 'Math',
    courseName: 'Algebra',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };


  it('should create a quiz', async () => {
    const res = await request(app)
      .post('/api/quizzes')
      .send(quizData);

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('_id');
    quizId = res.body.data._id;
  });

  it('should get all quizzes', async () => {
    const res = await request(app).get('/api/quizzes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get quiz by ID', async () => {
    const res = await request(app).get(`/api/quizzes/${quizId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('_id', quizId);
  });

  it('should update quiz', async () => {
    const res = await request(app)
        .put(`/api/quizzes/${quizId}`)
        .send({
            title: 'Updated Title',
            courseName: 'Some Course',
            topic: 'Some Topic',
            dueDate: '2025-12-31T00:00:00.000Z'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe('Updated Title');
  });

  it('should get quizzes by topic', async () => {
    const res = await request(app).get('/api/quizzes/topic/Math');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get quizzes by course', async () => {
    const res = await request(app).get('/api/quizzes/course/Algebra');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get upcoming quizzes', async () => {
    const res = await request(app).get('/api/quizzes/filter/upcoming');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should delete the quiz', async () => {
    const res = await request(app).delete(`/api/quizzes/${quizId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
