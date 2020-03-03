<script>
/* eslint-disable no-param-reassign */
export default {
  props: {
    fridge: { type: Array },
    whichPic: { type: Number },
  },
  data: () => ({
  }),
  methods: {
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
      if (e.target.tagName === 'DIV') {
        e.target.appendChild(card);
      } else if (e.target.tagName === 'A') {
        e.target.parentNode.appendChild(card);
      }
      vm.$emit('add-to-fridge', cardData.ingredient);
    },
  },
};
</script>

<template>
  <div class="testbox" id="fridge-container">
    <div class="fridge-text">Fridge</div>
    <div class="contents" id="fridge-board" @dragover.prevent @drop.prevent="drop">
      <div v-for="i in 4" class="shelf not-last" :id="`shelf-${i}`">
        <slot />
      </div>
      <div class="shelf last" id="shelf-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .testbox {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .fridge-text {
    text-align: center;
    width: auto;
    font-size: 30px;
    margin: 15px auto 0;
    color: #e2e2e2;
  }
  .contents {
    height: 500px;
    width: 450px;
    position: relative;
    margin: 0 auto 40px;
    border: 4px solid #e7e7e7;
    border-radius: 40px;
    overflow-y: scroll;
  }
  .shelf {
    height: 100px;
    width: 400px;
    padding: 10px 0 0 2em;
    margin: 0 auto;
  }
  .not-last {
    border-bottom: 4px solid #e7e7e7;
  }
  #shelf-1 {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
