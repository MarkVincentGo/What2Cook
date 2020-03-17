const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const cookieParser = require('cookie-parser');

const config = require('./config.js');
const db = require('./database/controller.js');
const foods = require('./foods.js');

const app = express();
const port = process.env.PORT || 7000;

let list = [];

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/login ', (req, res, next) => {
  next();
});


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

// app.get('/recipes', (req, res) => {
//   db.findAll()
//     .then((data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send(err);
//     });
// });


app.get('/recipes', (req, res) => {
  const { fridge } = req.query;
  console.log(req.url);
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
