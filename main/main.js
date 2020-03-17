import Vue from 'vue';
import App from './app.vue';

// const router = new VueRouter({
//   routes,
// });

const app = new Vue({
  el: '#app',
  render: (h) => h(App),
});

export default app;
