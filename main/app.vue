<script>
import Vue from 'vue';
import axios from 'axios';
import Input from './Input.vue';
import Fridge from './Fridge.vue';

Vue.component('input-bar', Input);
Vue.component('fridge', Fridge);


export default {
  data: () => ({
    intro: 'Please enter a food!',
    input: '',
    id: 0,
    fridge: [],
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
      vm.fridge.push(input);
      axios.post('/add', this.fridge);
    },
  },
};
</script>

<template>
  <div class="main">
    <h1 v-html="intro"></h1>
    <fridge class="fridge"/>
    <input-bar class="input" @add-to-fridge="addToFridge"/>
  </div>
</template>

<style scoped>
  .main {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }
  .fridge {
    grid-column-start: 0;
    grid-column-end: 1;
  }
  .input {
    grid-column-start: 1;
    grid-column-end: 2;
  }
</style>
