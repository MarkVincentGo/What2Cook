<script>
import Vue from 'vue';
import RecipeEntry from './RecipeEntry.vue';

Vue.component('recipe-entry', RecipeEntry);

export default {
  props: {
    recipes: { type: Array },
  },
  data: () => ({
  }),
  template: `
    <div class="recipe-container">
      <transition-group name="list" tag="p">
        <recipe-entry class="list-item" v-for="recipe in recipes" :key="recipe.label" :recipe="recipe"/>
      </transition-group>
    </div>
  `,
};
</script>

<style scoped>
  .recipe-container {
    height: 500px;
    width: 70%;
    border: 4px solid #2e6da4;
    box-shadow: 1px 0px 15px -2px rgba(153,153,153,0.98);
    border-radius: 10px;
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
</style>
