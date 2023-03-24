const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');

app.use(cors()); // Use cors middleware to allow cross-origin requests

app.get('/api/buckets', (req, res) => {
  const buckets = fs.readFileSync('./buckets.json');
  const bucketsData = JSON.parse(buckets);
  res.json(bucketsData);
});

app.get('/api/data', (req, res) => {
  fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const dataObjects = JSON.parse(data);
    res.json(dataObjects);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});


