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

  // return res.json([
  //         {
  //           "id": 1,
  //           "todo": "Set up package.json with 'yarn init'"
  //         },
  //         {
  //           "id": 2,
  //           "todo": "Create lib/index.js for express server"
  //         },
  //         {
  //           "id": 3,
  //           "todo": "Point start script to index.js"
  //         }
  //       ])
});

app.listen(port, () => console.log(`Listening on port ${port}`));
