<script setup>
import Navigation from "./components/Navigation.vue";
import Loader from "./components/Loader.vue";
import { AUTO_LOGIN_ACTION } from "./store/modules/storeconstans";
import { useStore } from "vuex";
import { computed,onMounted } from "vue";

const store = useStore();
const showLoading = computed(() => store.state.showLoading);

components: {
  Navigation;
  Loader;
}
onMounted(() => {
  store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
});
</script>

<template>
  <navigation></navigation>
  <loader v-if="showLoading"></loader>
  <div>
    <router-view></router-view>
  </div>
</template>