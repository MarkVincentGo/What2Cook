/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/recipe', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const recipeSchema = mongoose.Schema({
  name: String,
  image: String,
  url: String,
  healthLabels: [String],
  ingredients: [String],
  calories: Number,
  totalTime: Number,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
