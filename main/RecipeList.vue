<script>
/* eslint-disable max-len */
import Vue from 'vue';
import { GridLoader } from 'vue-spinner/dist/vue-spinner.min';
import RecipeEntry from './RecipeEntry.vue';

Vue.component('recipe-entry', RecipeEntry);
Vue.component('grid-loader', GridLoader);

export default {
  props: {
    recipes: { type: Array },
    loading: { type: Boolean },
  },
  data: () => ({
    loaderColor: '#e2e2e2',
    loaderSize: '50px',
    id: 0,
  }),
};
</script>

<template>
  <div class="color-container">
    <div class="recipe-container">
    <grid-loader v-if="loading" :loading="loading" :color="loaderColor" :size="loaderSize" id="recipe-loader"/>
      <transition-group v-cloak name="list" tag="div">
        <recipe-entry class="list-item" v-for="recipe in recipes" :key="`recipe-${recipe.healthLabels.join('')}`" :recipe="recipe"/>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
  .color-container {
    height: 100%;
    width: 100%;
  }
  .recipe-container {
    height: 500px;
    width: 80%;
    margin: 30px auto 0;
    padding: 30px 2.1em;
    text-align: center;
    overflow-x: scroll;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  #recipe-loader {
    margin: 30px auto;
  }
</style>
