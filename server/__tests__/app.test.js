import request from 'supertest';

import app from '../../server/server';

describe('get', () => {
  test('should return list of todos', async () => {
    const response = await request(app).get('/todos');

    expect(response.status).toEqual(200);
  });
});