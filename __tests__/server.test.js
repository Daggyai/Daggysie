// Test: Express Server Endpoints
const request = require('supertest');
const app = require('../server');

describe('Express Server API', () => {
  test('GET /health should return server status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('Server is running');
  });

  test('POST /api/chat should require message', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Message is required');
  });

  test('POST /api/command should require command', async () => {
    const response = await request(app)
      .post('/api/command')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Command is required');
  });
});