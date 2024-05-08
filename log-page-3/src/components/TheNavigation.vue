<template>
  <div class="nav-bar">
    <router-link to="/home" v-if="isAuthenticated" class="link">Home</router-link>
    <router-link to="/login" v-if="!isAuthenticated" class="link">Login</router-link>
    <router-link to="/Signup" v-if="!isAuthenticated" class="link">Sign-up</router-link>
    <router-link to="/post" v-if="isAuthenticated" class="link">Post</router-link>
    <a href="#" @click.prevent="onLogout()" v-if="isAuthenticated" class="link">Logout</a>
  </div>
</template>

<script>
import { IS_USER_AUTHENTICATED_GETTER } from '@/store/modules/storeconstants';
import { LOGOUT_ACTION } from '@/store/modules/storeconstants';
import { mapActions, mapGetters } from 'vuex';

export default{
  computed: {
    ...mapGetters('auth',{
      isAuthenticated: IS_USER_AUTHENTICATED_GETTER
    })
  },
  methods: {
    ...mapActions('auth', {
      logout: LOGOUT_ACTION,
    }),
    onLogout(){
      this.logout();
      this.$router.replace('/login');
    },
  }
  }
</script>

<style>
  .nav-bar{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: #9000ff;
    box-shadow: #000000 0 5px 10px;
    padding: 10px;
    height: 60px;
  }
  .link{
    font-family: "Josefin Sans", sans-serif;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    color:#ffffff
  }
</style>