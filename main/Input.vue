<script>
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
  template: `
    <div>
      <input class="enter-food form-control" placeholder="Enter food here..." v-model="input" @keyup.enter="pressAdd"/>
      <button class="btn btn-primary" @click="pressAdd">Add</button>
    </div>
  `,
};
</script>

<style scoped>
  .enter-food {
    width: 80%;
    max-width: 400px;
    display: inline;
  }
  btn {
    display: inline;
  }
</style>
