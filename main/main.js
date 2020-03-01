import Vue from 'vue';
import App from './app.vue';
import Input from './Input.vue';

const app = new Vue({
  el: '#app',
  render: (h) => h(App),
});

export default app;
