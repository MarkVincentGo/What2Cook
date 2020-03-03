<script>
/* eslint-disable max-len */
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
    input: '',
    id: 0,
    fridge: [],
    list: [],
    recipes: [],
    show: false,
    recipeLoading: false,
  }),
  created() {
    // axios.get('/getAll')
    //   .then((response) => {
    //     this.fridge = response.data;
    //   });
    axios.get('/searchFood?search=')
      .then((response) => {
        this.list = response.data;
      });
  },
  mounted() {
    const vm = this;
    vm.show = true;
  },
  methods: {
    addToFridge(input) {
      const vm = this;
      if (!vm.fridge.includes(input)) {
        vm.fridge.push(input);
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
      vm.recipeLoading = true;
      axios.get('/recipes', {
        params: {
          fridge: vm.fridge,
        },
      })
        .then((response) => {
          vm.recipeLoading = false;
          vm.recipes = response.data;
        });
    },
  },
};
</script>

<template>
   <div class="body">
    <div class="header">
      <transition name="slide-fade">
        <div v-if="show">What the Fook Should I Cook?</div>
      </transition>
    </div>
    <div class="main">
      <button class="btn btn-primary recipe-search" @click="searchRecipe">Search Recipes!</button>
      <fridge class="fridge" :fridge="fridge" @add-to-fridge="addToFridge"/>
      <input-bar class="input" @render-to-list="addToList"/>
      <ingredient-list class="ingredient-list" :list="list" @add-to-fridge="addToFridge" @remove-from-fridge="removeFromFridge"/>
      <recipe-list class="recipe-list" :recipes="recipes" :loading="recipeLoading"/>
    </div>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat');
  .body {
    font-family:'Montserrat',sans-serif;
  }
  .header {
    text-align: center;
    color: #e6e6e6;
    background-color: #0A2463;
    font-size: 6rem;
  }
  .main {
    width: 100%;
    display: grid;
    grid-template-columns: 600px 6fr;
    grid-template-rows: 1fr 1fr;
  }
  button.recipe-search {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 0;
    grid-row-end: 1;
    height: 50px;
    border-radius: 0;
    border: none;
    background-color: #B7282F;
  }
  button.recipe-search:hover {
    background-color: #FB3640;
  }
  .fridge  {
    grid-column-start: 1;
    grid-column-end: 2;
    background-color:#B7282F;
  }
  .input {
    grid-column-start: 2;
    grid-column-end: 3;
    display: block;
    grid-row-start: 0;
    grid-row-end: 1;
  }
  .ingredient-list {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    background-color: #247BA0;
  }
  .recipe-list {
    grid-column-start: 1;
    grid-column-end: 3;
    background-color: #174F66;
  }
  .slide-fade-enter-active {
    transition: all .9s ease;
  }
  .slide-fade-enter {
    transform: translateX(-50px);
    opacity: 0;
  }
</style>
