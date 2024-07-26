<script setup>
import Navigation from "./components/Navigation.vue";
import Loader from "./components/Loader.vue";
import { AUTO_LOGIN_ACTION, IS_USER_AUTHENTICATED_GETTER } from "./store/modules/storeconstans";
import { useStore } from "vuex";
import { computed,onMounted } from "vue";

const store = useStore();
const showLoading = computed(() => store.state.showLoading);
const isAuthenticated = computed(
  () => store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
);

components: {
  Navigation;
  Loader;
}
onMounted(() => {
  store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
});
</script>

<template>
  <navigation v-if="!isAuthenticated"></navigation>
  <loader v-if="showLoading"></loader>
  <div>
    <router-view></router-view>
  </div>
</template>
