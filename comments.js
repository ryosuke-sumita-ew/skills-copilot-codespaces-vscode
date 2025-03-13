// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const commentsPath = path.join(__dirname, 'comments.json');

// Middleware
app.use(bodyParser.json());

// GET /comments
app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Unable to read comments.json');
      return;
    }

    res.send(data);
  });
});

// POST /comments
app.post('/comments', (req, res) => {
  const newComment = req.body;
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Unable to read comments.json');
      return;
    }

    const comments = JSON.parse(data);
    comments.push(newComment);
    fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), err => {
      if (err) {
        console.error(err);
        res.status(500).send('Unable to write comments.json');
        return;
      }

      res.send(newComment);
    });
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});