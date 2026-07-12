// Test: Updated server endpoints
const request = require('supertest');
const app = require('../server');

describe('Extended API Endpoints', () => {
  test('GET /api/commands should return available commands', async () => {
    const response = await request(app).get('/api/commands');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.commands)).toBe(true);
    expect(response.body.commands.length > 0).toBe(true);
  });

  test('GET /api/features should return features list', async () => {
    const response = await request(app).get('/api/features');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('features');
  });

  test('POST /api/command should handle help command', async () => {
    const response = await request(app)
      .post('/api/command')
      .send({ command: 'help', args: [] });
    expect(response.status).toBe(200);
    expect(response.body.response).toContain('Available');
  });

  test('POST /api/command should handle time command', async () => {
    const response = await request(app)
      .post('/api/command')
      .send({ command: 'time', args: [] });
    expect(response.status).toBe(200);
    expect(response.body.response).toContain(':');
  });

  test('POST /api/command should handle calculate command', async () => {
    const response = await request(app)
      .post('/api/command')
      .send({ command: 'calculate', args: ['2+2'] });
    expect(response.status).toBe(200);
    expect(response.body.response).toContain('4');
  });

  test('Health endpoint should list new features', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.features)).toBe(true);
  });
});
