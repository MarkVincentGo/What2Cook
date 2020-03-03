<script>
import Vue from 'vue';
import axios from 'axios';
import Input from './Input.vue';
import Fridge from './Fridge.vue';
import IngredientList from './IngredientList.vue';
import RecipeList from './RecipeList.vue';

Vue.component('input-bar', Input);
Vue.component('fridge', Fridge);
Vue.component('ingredient-list', IngredientList);
Vue.component('recipe-list', RecipeList);


export default {
  data: () => ({
    intro: 'What the Fook Should I Cook',
    input: '',
    id: 0,
    fridge: [],
    list: [],
    recipes: [],
  }),
  created() {
    axios.get('/getAll')
      .then((response) => {
        this.fridge = response.data;
      });
  },
  methods: {
    addToFridge(input) {
      const vm = this;
      if (!vm.fridge.includes(input)) {
        vm.fridge.push(input);
        axios.post('/add', this.fridge);
      }
    },
    removeFromFridge(input) {
      const vm = this;
      const inputIndex = vm.fridge.indexOf(input);
      if (inputIndex > -1) {
        vm.fridge.splice(inputIndex, 1);
      }
    },
    addToList(ingredients) {
      const vm = this;
      vm.list = ingredients;
    },
    searchRecipe() {
      const vm = this;
      axios.get('/recipes', {
        params: {
          fridge: vm.fridge,
        },
      })
        .then((response) => {
          vm.recipes = response.data;
        });
    },
  },
};
</script>

<template>
   <div class="body">
    <h1 v-html="intro" class="header"></h1>
    <div class="main">
      <fridge class="fridge" :fridge="fridge" @add-to-fridge="addToFridge"/>
      <button class="btn btn-primary recipe-search" @click="searchRecipe">Search Recipes!</button>
      <input-bar class="input" @render-to-list="addToList"/>
      <ingredient-list class="ingredient-list" :list="list" @add-to-fridge="addToFridge"/>
      <recipe-list class="recipe-list" :recipes="recipes"/>
    </div>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat');
  .body {
    font-family:'Montserrat',sans-serif;
  }
  .main {
    width: 100%;
    display: grid;
    grid-template-columns: 500px 6fr 3fr;
    grid-column-gap: 100px;
    grid-template-rows: 1fr 1fr;
    margin-top: 40px;
  }
  .recipe-search {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 0;
    grid-row-end: 1;
    margin: 0 30px;
    height: 35px;
  }
  .fridge  {
    grid-column-start: 1;
    grid-column-end: 2;
  }
  .input {
    grid-column-start: 2;
    grid-column-end: 3;
    height: 50px;
    display: block;
    grid-row-start: 0;
    grid-row-end: 1;
  }
  .ingredient-list {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
  .recipe-list {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .header {
    text-align: center;
  }
</style>
