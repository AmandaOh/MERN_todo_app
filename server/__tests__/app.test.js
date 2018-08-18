import request from 'supertest';
import mongoose from 'mongoose';
import Todo from '../data/models/Todo';

import app from '../app';

beforeAll(async () => {
  await mongoose.connect(global.__MONGO_URI__);
});

afterAll(async () => {
  mongoose.disconnect();
});

describe('get', async () => {
  test('should return list of todos', async (done) => {
    const todo1 = {id: 1, todo: "first todo"};
    const todo2 = {id: 2, todo: "second todo"};
    await Todo.insertMany([todo1, todo2]);

    const response = await request(app).get('/todos');

    expect(response.status).toEqual(200);
    expect(response.body).toContainEqual(expect.objectContaining(todo1));
    expect(response.body).toContainEqual(expect.objectContaining(todo2));
    done();
  });
});