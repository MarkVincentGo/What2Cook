const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const config = require('./config.js');
const db = require('./database/controller.js');

const app = express();
const port = process.env.PORT || 6969;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

let list = [];
let foods = [
  { id: 1, ingredient: 'broccoli', image: 'broccoli.png' },
  { id: 2, ingredient: 'red onion', image: 'red_onion.png' },
  { id: 3, ingredient: 'cheese', image: '  swiss_cheese.png' },
  { id: 4, ingredient: 'carrots', image: 'carrots.png' },
  { id: 5, ingredient: 'milk', image: 'milk.png' },
  { id: 6, ingredient: 'butter', image: 'butter.png' },
  { id: 7, ingredient: 'grapes', image: 'grapes.png' },
  { id: 8, ingredient: 'potatoes', image: 'potatoes.png' },
  { id: 9, ingredient: 'salsa', image: 'salsa.png' },
  { id: 10, ingredient: 'chicken', image: 'chicken.png' },
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

app.get('/recipes', (req, res) => {
  const { fridge } = req.query;
  console.log(fridge)
  const request = {
    method: 'get',
    url: 'https://api.edamam.com/search',
    q: fridge.join(' ').split(' ').join('+'),
    api_id: config.app_id,
    api_key: config.app_key,
    from: 0,
    to: 5,
  };
  const urlString = `${request.url}?q=${request.q}&app_id=${request.api_id}&app_key=${request.api_key}&from=${request.from}&to=${request.to}`;
  axios(urlString)
    .catch((err) => console.log(err))
    .then((response) => {
      const filteredResults = response.data.hits.map((hit) => {
        const { recipe } = hit;
        const {
          label, image, url,
          healthLabels, ingredientLines,
          calories, totalTime,
        } = recipe;
        return {
          label,
          image,
          url,
          healthLabels,
          ingredients: ingredientLines,
          calories,
          totalTime,
        };
      });
      return filteredResults;
    })
    .then((data) => {
      db.insertMany(data);
      res.status(200).send(JSON.stringify(data));
    });
});

app.listen(port, console.log(`MVP running on port ${port}!!!`));
