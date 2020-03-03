<script>
export default {
  props: {
    recipe: { type: Object },
  },
  data: () => ({
  }),
  methods: {
  },
  template: `
    <a class="recipe-entry" :href="recipe.url" target="_blank" draggable="false">
      <img class="food-image" :src="recipe.image"/>
      <div class="info-container">
        <div class="name box tags">
          <p class="header">Name</p>
          <p>{{recipe.label}}</p>
        </div>
        <div class="general-info box smaller">
          <p class="header">General Info</p>
          <div class="tags smaller">
            <p>Total Time: {{recipe.totalTime}}</p>
            <p>Calories: {{Math.floor(parseInt(recipe.calories))}}</p>
          </div>
        </div>
        <div class="box">
          <p class="header">Health Info</p>
          <div class="tags smaller">
            <ul>
              <li v-for="label in recipe.healthLabels">{{label}}</li>
            </ul>
          </div>
        </div>
        <div class="ingredients box">
          <p class="header">Ingredients</p>
          <div class="tags">
            <ul>
              <li v-for="ingredient in recipe.ingredients">{{ingredient}}</li>
            </ul>
          </div>
        </div>
      </div>
    </a>
`,
};
</script>

<style scoped>
  .recipe-entry {
    height: 100px;
    width: 100%;
    box-shadow: 1px 0px 15px -2px rgba(153,153,153,0.98);
    border-radius: 5px;
    margin-bottom: 15px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    cursor: pointer;
  }
  .recipe-entry:hover {
    box-shadow: 3px 0px 20px -2px rgba(143, 143, 143, 0.98);
  }
  .recipe-entry:active {
    box-shadow: 1px 0px 8px rgba(153,153,153,0.95);
  }
  .info-container {
    height: 100%;
    width: 3000px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    overflow-x: scroll;
  }
  .food-image {
    height: 80%;
    width: auto;
    margin: 1%;
    border-radius: 8px;
  }
  p {
    margin: 0 auto;
    text-align: center;
  }
  li {
    text-align: left;
  }
  .tags {
    height: 80px;
    overflow-y: scroll;
  }
  .header {
    height: 20px;
    font-weight: bold;
    text-decoration: underline;
  }
  .box {
    width: 200px;
  }
  .smaller {
    width: 150px;
  }
  a {
    text-decoration: none;
  }
</style>
