
<script>
export default {
  props: {
    fridge: { type: Array },
  },
  data: () => ({
    fridgePic: ['fridge-closed.png', 'fridge-open.png'],
    whichPic: 0,
  }),
  methods: {
    openClose() {
      const vm = this;
      vm.whichPic = vm.whichPic === 0 ? 1 : 0;
    },
  },
  template: `
    <div class="testbox" :style="'background-image: url(' + fridgePic[whichPic] + ')'" @click="openClose">
      <ul>
        <li v-for="ingredient in fridge">{{ingredient}}</li>
      </ul>
    </div>
  `,
};
</script>

<style scoped>
  .testbox {
    height: 550px;
    width: 400px;
    margin: 0 auto 20px;
    background-repeat: no-repeat;
    background-size: auto 95%;
    background-position: right bottom;
  }
  ul {
    
  }
</style>
