const request = require('supertest');
const app = require('../../server/app');

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .get('/api/')
      .send({
        userId: 1,
        title: 'test is cool',
        content: 'Lorem ipsum',
      });
    expect(res.statusCode).toEqual(200);
  });
});