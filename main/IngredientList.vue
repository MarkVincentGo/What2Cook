
<script>
export default {
  props: {
    list: { type: Array },
  },
  data: () => ({
    id: 0,
  }),
  methods: {
    handleClick(e) {
      const targetData = JSON.parse(e.target.getAttribute('data'));
      const vm = this;
      vm.$emit('add-to-fridge', targetData.ingredient);
      const fridge = document.getElementById('fridge-board');
      e.target.style.height = '80px';
      e.target.style.width = '80px';
      fridge.appendChild(e.target);
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
    },

  },
  template: `
    <div class="result-container" id="ingredient-board" @dragover.prevent @drop.prevent="drop">
     <transition-group name="list-complete" tag="div">
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
  `,
};
</script>

<style scoped>
  .result-container {
    height: 550px;
    min-width: 330px;
    max-width: 460px;
    border-radius: 10px;
    border: 4px solid #2e6da4;
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
    border: 4px solid #2e6da4;
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
      border: 4px solid #6b88a1;
      box-shadow: 1px 0px 125px -2px rgba(153,153,153,0.98);
      margin-top: 1px;
  }
  .search-entry:active {
    box-shadow: 0px 0px 5px rgba(153,153,153,0.95);
  }
  .list-complete-item {
    transition: all .75s;
  }
  .list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateX(2px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
</style>
