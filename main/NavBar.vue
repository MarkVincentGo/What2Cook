<template>
  <div>
    <b-navbar class="navbar" toggleable="lg" type="dark" variant="danger">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
          <b-nav-item-dropdown text="Cuisine">
            <b-dropdown-item class="dropdown" href="#">Asian</b-dropdown-item>
            <b-dropdown-item href="#">Italian</b-dropdown-item>
            <b-dropdown-item href="#">Indian</b-dropdown-item>
            <b-dropdown-item href="#">Mexican</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item>
              <a v-if="loggedIn">Sign Out</a>
              <a v-else >Log In</a>
              </b-dropdown-item>

          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Vue from 'vue';
import { BootstrapVue, BNavbar } from 'bootstrap-vue';
import Router from 'vue-router';

Vue.use(BootstrapVue);
Vue.component('b-navbar', BNavbar);
Vue.component('router-link', Router);

export default Vue.extend({
  props: {
    loggedIn: { type: Boolean },
  },
  data: () => ({
  }),
});
</script>

<style scoped src="bootstrap/dist/css/bootstrap.css"></style>
<style scoped src="bootstrap-vue/dist/bootstrap-vue.css"></style>
<style scoped>
  .navbar {
    background-color: #B7282F;
    font-size: 20px;
    margin-bottom: 0;
    border-radius: 0;
  }
  .dropdown {
    width: 100px;
  }
</style>
