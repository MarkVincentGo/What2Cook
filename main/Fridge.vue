
<script>
export default {
  data: () => ({
    items: [],
  }),
  methods: {
  },
  template: `
    <div class="testbox">
      <ul>
        <li v-for="ingredient in fridge">{{ingredient.id}}) {{ingredient.food}}</li>
      </ul>
    </div>
  `,
}
</script>

<style scoped>
  .testbox {
    height: 600px;
    width: 350px;
    border: 1px solid black;
    border-radius: 10px;
  }
</style>