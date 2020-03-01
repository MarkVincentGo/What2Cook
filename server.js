const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 6969;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

let list = [];

app.use(express.static(path.join(__dirname, 'public')));

app.post('/add', (req, res) => {
  list = req.body;
  res.status(200).end();
});

app.get('/getall', (req, res) => {
  res.send(list);
});

app.listen(port, console.log(`MVP running on port ${port}!!!`))