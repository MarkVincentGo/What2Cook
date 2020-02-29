<script>
import axios from 'axios';

export default {
  data: () => ({
    intro: 'Please enter a food!',
    input: '',
    id: 2,
    fridge: [
      { food: 'sleep', id: 1 },
    ],
    renderIntro: false,
  }),
  methods: {
    addToFridge: () => {
      console.log(this.input)
      this.fridge.push({ food: this.input, id: this.id += 1 });
      this.input = '';
    },
  },
};
</script>

<template>
  <div>
    <h1 v-html='intro'></h1>
    <input class="enter-food form-control" placeholder="Enter food here..." v-model="input"/>
    <button class="btn btn-primary" @click="addToFridge">Add</button>
    <div class="testbox"></div>
  </div>
</template>

<style scoped>
  .testbox {
    height: 40px;
    width: 40px;
    border: 1px solid black;
  }
  .enter-food {
    width: 400px;
    display: inline-block;
  }
</style>
