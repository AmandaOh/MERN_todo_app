import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

import Todo from './data/models/Todo';

require('dotenv').config({path: require('find-config')('.env')});

const app = express();
const jsonParser = bodyParser.json();

mongoose.connect(process.env.DB);
const connection = mongoose.connection;

connection.on('open', () => {
  console.log('mongo db is connected!');
}); 

app.use(express.static(path.join(__dirname, "..", "client", "build")))
app.use(passport.initialize());

app.get('/todos', cors(), (req, res) => {
  Todo.find({}, (err, todos) => {
    if (err) {
      throw new Error("could not retrieve documents");
    }
    res.json(todos);
  });
});

app.post('/todos/:todoId', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const todoId = parseInt(req.params.todoId);

  Todo.findOneAndUpdate({id: todoId}, {todo: req.body.todo}, {upsert: true}, (err, todo) => {
    if (err) {
      throw new Error("could not retrieve documents");
    }

    res.send(`todo ${todoId} saved!`);
  })
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

export default app;