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
let foods = [
  { ingredient: 'broccoli', image: 'broccoli.png' },
  { ingredient: 'red onion', image: 'red_onion.png' },
  { ingredient: 'cheese', image: '  swiss_cheese.png' },
  { ingredient: 'carrots', image: 'carrots.png' },
  { ingredient: 'milk', image: 'milk.png' },
  { ingredient: 'butter', image: 'butter.png' },
  { ingredient: 'grapes', image: 'grapes.png' },
  { ingredient: 'potatoes', image: 'potatoes.png' },
  { ingredient: 'salsa', image: 'salsa.png' },
  { ingredient: 'chicken', image: 'chicken.png' },
];

app.use(express.static(path.join(__dirname, 'public')));

app.post('/add', (req, res) => {
  list = req.body;
  res.status(200).end();
});

app.get('/getall', (req, res) => {
  res.send(list);
});

app.get('/searchFood', (req, res) => {
  const { search } = req.query;
  const results = [];
  for (let i = 0; i < foods.length; i += 1) {
    if (foods[i].ingredient.indexOf(search) > -1) {
      results.push(foods[i]);
    }
  }
  res.send(results);
});

app.listen(port, console.log(`MVP running on port ${port}!!!`));
