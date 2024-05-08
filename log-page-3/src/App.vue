<template>
  <TheNavigation/>
  <the-loader v-if="showLoading"></the-loader>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavigation from './components/TheNavigation.vue'
import TheLoader from './components/TheLoader.vue'
import { mapState } from 'vuex'
import { AUTO_LOGIN_ACTION } from '@/store/modules/storeconstants'

export default {
  name: 'App',
  computed:
    mapState({
      showLoading: state => state.showLoading
    }),
  components: {
    TheNavigation,
    TheLoader,
  },
  created() {
    this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
  }
}
</script>

<style>
body{
  background-color: #ffffff;
  margin: 0;
}
</style>
