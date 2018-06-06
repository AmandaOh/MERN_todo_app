import express from 'express';
import cors from 'cors';
import mongodb from 'mongodb';

require('dotenv').config();

const app = express();
const port = 3001;
const MongoClient = mongodb.MongoClient;

app.get('/', cors(), (req, res) => {
  MongoClient.connect(process.env.DB, (err, client) => {
    const collection = client.db("MERN_todo_app").collection("todo_list")
    collection.find({}).toArray((err, result) => {
        res.json(result);
        client.close();
    });
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
