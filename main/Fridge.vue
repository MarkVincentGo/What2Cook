<script>
/* eslint-disable no-param-reassign */
export default {
  props: {
    fridge: { type: Array },
  },
  data: () => ({
    fridgePic: ['fridge-closed.png', 'fridge-open.png'],
    whichPic: 0,
  }),
  methods: {
    openClose(e) {
      const vm = this;
      vm.whichPic = vm.whichPic === 0 ? 1 : 0;
      if (vm.whichPic === 0) {
        e.target.childNodes.forEach((child) => {
          child.style.display = 'none';
        });
      } else {
        e.target.childNodes.forEach((child) => {
          child.style.display = 'inline-block';
        });
      }
    },
    dragStart(e) {
      const { target } = e;
      const targetCopy = target.cloneNode(true);
      const targetData = targetCopy.getAttribute('data');
      e.dataTransfer.setData('cardData', targetData);
      setTimeout(() => {
        targetCopy.style.display = 'none';
      }, 0);
    },
    drop(e) {
      const vm = this;
      const cardData = JSON.parse(e.dataTransfer.getData('cardData'));
      const cardId = cardData.id;
      const card = document.getElementById(cardId);
      if (vm.whichPic === 0) {
        card.style.display = 'none';
      } else {
        card.style.display = 'inline-block';
      }
      card.style.height = '80px';
      card.style.width = '80px';
      e.target.appendChild(card);
      vm.$emit('add-to-fridge', cardData.ingredient);
    },
  },
  template: `
    <div class="testbox" :style="'background-image: url(' + fridgePic[whichPic] + ')'" @click="openClose">
      <div class="contents" id="fridge-board" @dragover.prevent @drop.prevent="drop">
        <slot />
      </div>
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
    position: relative;
  }
  .contents {
    height: 450px;
    width: 225px;
    position: absolute;
    bottom: 40px;
    right: 30px;
    overflow-y: scroll;
  }
</style>
