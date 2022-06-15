const request = require('supertest');
const app = require('../server/app');

describe('Users Endpoints', () => {
    it('/Sample', async () => {
        const res = await request(app)
            .get('/api')
        expect(res.statusCode).toEqual(200);
    });
    it('/login post', async () => {
        const res = await request(app)
            .post('/api/login').send({
                "email": "user@user.com",
                "password": "123456789"
            })
        expect(res.statusCode).toEqual(200);
    });
});