<script>
/* eslint-disable max-len */
import axios from 'axios';

export default {
  data: () => ({
    input: '',
    id: 0,
  }),
  methods: {
    pressAdd() {
      const vm = this;
      vm.$emit('add-to-fridge', { food: vm.input, id: vm.id += 1 });

      axios.get(`/searchFood?search=${vm.input}`)
        .then((response) => (vm.$emit('render-to-list', response.data)));
      vm.input = '';
    },
  },
};
</script>

<template>
  <div>
    <input class="enter-food form-control" placeholder="Enter food here..." v-model="input" @keyup.enter="pressAdd"/>
    <button class="btn btn-primary add-ingredient" @click="pressAdd">Search Ingredients</button>
  </div>
</template>

<style scoped>
  .enter-food {
    width: 85%;
    border-radius: 0;
    display: inline-block;
    height: 50px;
  }
  .btn.add-ingredient {
    min-width: 40px;
    display: inline-block;
    background-color: #247BA0;
    border-radius: 0;
    border: none;
    height: 50px;
  }
  .btn.add-ingredient:hover {
    background-color: rgb(90, 166, 199);
  }
    .btn.add-ingredient:active {
    background-color: rgb(30, 104, 136);
  }
</style>
