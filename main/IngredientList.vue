
<script>
export default {
  props: {
    list: { type: Array },
  },
  data: () => ({
  }),
  methods: {
    handleClick(e) {
      const vm = this;
      vm.$emit('add-to-fridge', e.ingredient);
    },
  },
  template: `
    <div class="result-container">
      <a 
        class="search-entry" 
        v-for="ingredient in list" 
        draggable="true" 
        :style="'background-image: url(' + ingredient.image + ')'"
        @click="handleClick(ingredient)"
        :data="ingredient"
        >{{ingredient.ingredient}}</a>
    </div>
  `,
};
</script>

<style scoped>
  .result-container {
    height: 550px;
    min-width: 250px;
    max-width: 450px;
    border-radius: 10px;
    box-shadow: 1px 0px 15px -2px rgba(153,153,153,0.98);
    margin-top: 20px;
    padding: 30px 2.1em;
    overflow-y: scroll;
  }
  .search-entry {
    box-sizing: border-box;
    height: 120px;
    width: 120px;
    box-shadow: 1px 0px 15px 3px rgba(153,153,153,0.25);
    border-radius: 10px;
    display: inline-block;
    margin-right: 10px;
    margin-top: 1px;
    margin-bottom: 10px;
    text-align: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom;
  }
  .search-entry:hover {
      border: 1px solid #d1d1d1;
      -moz-outline-radius: 10px;
      box-shadow: 1px 0px 15px -2px rgba(153,153,153,0.98);
      margin-top: 0;
  }
  .search-entry:active {
    box-shadow: 0px 0px 5px rgba(153,153,153,0.95);
  }
</style>
