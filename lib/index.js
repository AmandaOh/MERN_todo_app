import express from 'express';
import cors from 'cors';
import mongodb from 'mongodb';

import config from '../config/config.js'

const app = express();
const port = 3001;
const MongoClient = mongodb.MongoClient;

app.get('/', cors(), (req, res) => {
  MongoClient.connect(config.db, (err, client) => {
    const collection = client.db("MERN_todo_app").collection("todo_list")
    collection.find({}).toArray((err, result) => {
        res.json(result);
        client.close();
    });
  })
});

app.listen(port, () => console.log(`Listening on port ${port}`));
