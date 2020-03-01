
<script>
import Vue from 'vue';
import axios from 'axios';

export default Vue.component('input-bar', {
  props: {
    addToFridge: { type: Function },
  },
  data: () => ({
    input: '',
    id: 0,
  }),
  methods: {
    pressAdd() {
      const vm = this;
      vm.$emit('add-to-fridge', { food: vm.input, id: vm.id += 1 });
      vm.input = '';
    },
  },
  template: `
    <div>
      <input class="enter-food form-control" placeholder="Enter food here..." v-model="input"/>
      <button class="btn btn-primary" @click="pressAdd">Add</button>
    </div>
  `,
});
</script>

<style scoped>
  .enter-food {
    width: 400px;
    display: inline-block;
  }
</style>
