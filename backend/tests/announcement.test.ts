import request from 'supertest';
import { app } from '../index';

describe('Announcement API', () => {
  let createdId: string;

  it('should create an announcement', async () => {
    const res = await request(app).post('/api/announcements').send({
      teacherName: 'Ms. Sara',
      subject: 'Science',
      content: 'Lab test on Monday'
    });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('_id');
    createdId = res.body.data._id;
  });

  it('should get all announcements', async () => {
    const res = await request(app).get('/api/announcements');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get announcement by ID', async () => {
    const res = await request(app).get(`/api/announcements/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.data._id).toBe(createdId);
  });

  it('should update the announcement', async () => {
    const res = await request(app).put(`/api/announcements/${createdId}`).send({
      content: 'Updated content'
    });
    expect(res.status).toBe(200);
    expect(res.body.data.content).toBe('Updated content');
  });

  it('should delete the announcement', async () => {
    const res = await request(app).delete(`/api/announcements/${createdId}`);
    expect(res.status).toBe(200);
  });
});
