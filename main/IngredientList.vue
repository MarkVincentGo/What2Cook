
<script>
export default {
  props: {
    list: { type: Array },
    whichPic: { type: Number },
  },
  data: () => ({
    id: 0,
  }),
  methods: {
    handleClick(e) {
      const vm = this;
      const targetData = JSON.parse(e.target.getAttribute('data'));
      if (e.target.parentNode.id === 'ingredient-board') {
        vm.$emit('add-to-fridge', targetData.ingredient);
        const fridge = document.getElementById('shelf-1');
        e.target.style.height = '80px';
        e.target.style.width = '80px';
        fridge.appendChild(e.target);
      } else if (e.target.parentNode.parentNode.id === 'fridge-board') {
        const ingredients = document.getElementById('ingredient-board');
        e.target.style.height = '120px';
        e.target.style.width = '120px';
        e.target.style.display = 'inline-block';
        ingredients.appendChild(e.target);
        vm.$emit('remove-from-fridge', targetData.ingredient);
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
      const cardData = JSON.parse(e.dataTransfer.getData('cardData'));
      const cardId = cardData.id;
      const card = document.getElementById(cardId);
      card.style.display = 'inline-block';
      card.style.height = '120px';
      card.style.width = '120px';
      if (e.target.tagName === 'DIV') {
        e.target.appendChild(card);
      } else if (e.target.tagName === 'A') {
        e.target.parentNode.appendChild(card);
      }
      this.$emit('remove-from-fridge', cardData.ingredient);
    },

  },
};
</script>

<template>
  <div class="color-container">
    <div class="result-container" @dragover.prevent @drop.prevent="drop">
    <transition-group name="list-complete" tag="div" id="ingredient-board">
      <a
        class="search-entry list-complete-item card"
        @drop.prevent="drop"
        draggable="true"
        @dragstart="dragStart"
        @drag.prevent=""
        v-for="ingredient in list"
        :key="ingredient.ingredient"
        :id="ingredient.id"
        :style="'background-image: url(' + ingredient.image + ')'"
        @click="handleClick"
        :data="JSON.stringify(ingredient)"
        >{{ingredient.ingredient}} <slot /></a>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
  .color-container {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .result-container {
    height: 550px;
    min-width: 330px;
    width: 90%;
    position: relative;
    margin: 20px auto 40px;
    padding: 30px 2.1em;
    overflow-y: scroll;
  }
  .search-entry {
    box-sizing: border-box;
    color: #E2E2E2;
    height: 120px;
    width: 120px;
    box-shadow: 1px 0px 15px 3px rgba(226,226,226,0.25);
    border: 4px solid #E2E2E2;
    border-radius: 10px;
    display: inline-block;
    margin-right: 10px;
    margin-top: 1px;
    margin-bottom: 10px;
    text-align: center;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom;
    cursor: pointer;
  }
  .search-entry:hover {
      border: 4px solid #ffffff;
      box-shadow: 1px 0px 25px -2px rgba(226,226,226,0.98);
      margin-top: 1px;
  }
  .search-entry:active {
    box-shadow: 0px 0px 5px rgba(226,226,226,0.95);
  }
  .list-complete-item {
    transition: all .25s;
  }
  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateX(2px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
</style>
