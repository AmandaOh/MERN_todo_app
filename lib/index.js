import express from 'express';
import cors from 'cors';
import mongodb from 'mongodb';
import path from 'path';
import bodyParser from 'body-parser';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectId;
const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname,"..", "app", "build")))

app.get('/todos', cors(), (req, res) => {
  MongoClient.connect(process.env.DB, (err, client) => {
    const collection = client.db("MERN_todo_app").collection("todo_list")
    collection.find({}).toArray((err, result) => {
        res.json(result);
        client.close();
    });
  })
});

app.post('/todos/:todoId', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const todoId = req.params.todoId;

  MongoClient.connect(process.env.DB, (err, client) => {
    const collection = client.db("MERN_todo_app").collection("todo_list");

    collection.updateOne({_id: ObjectId(todoId)}, {$set: {'todo': req.body.todo}}).then((result) => {
      res.send('todo saved!');
      client.close();
    });
  })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "app", "build", "index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
