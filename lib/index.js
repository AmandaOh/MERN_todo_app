const express = require('express');
const cors = require('cors');
const app = express();

const port = 3001;

app.get('/', cors(), (req, res) => res.json([
    {
      "id": 1,
      "todo": "Set up package.json with 'yarn init'"
    },
    {
      "id": 2,
      "todo": "Create lib/index.js for express server"
    },
    {
      "id": 3,
      "todo": "Point start script to index.js"
    }
]));

app.listen(port, () => console.log(`Listening on port ${port}`));
