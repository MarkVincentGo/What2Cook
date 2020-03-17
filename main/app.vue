<template>
   <div class="body">
    <div class="header">
      <transition name="slide-fade">
        <div>What the Fook Should I Cook?</div>
      </transition>
    </div>
    <navbar :loggedIn="loggedIn"/>
    <home />
  </div>
</template>

<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<script>
/* eslint-disable max-len */
import Vue from 'vue';
import axios from 'axios';

import Home from './home.vue';
import NavBar from './NavBar.vue';
import Input from './Input.vue';
import Fridge from './Fridge.vue';
import IngredientList from './IngredientList.vue';
import RecipeList from './RecipeList.vue';
import SignIn from './test.vue';


Vue.component('home', Home);
Vue.component('navbar', NavBar);
Vue.component('input-bar', Input);
Vue.component('fridge', Fridge);
Vue.component('ingredient-list', IngredientList);
Vue.component('recipe-list', RecipeList);


export default {
  data: () => ({
    loggedIn: false,
  }),
};
</script>

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
  .slide-fade-enter-active {
    transition: all .9s ease;
  }
  .slide-fade-enter {
    transform: translateX(-50px);
    opacity: 0;
  }
</style>
