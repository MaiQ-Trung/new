<script lang="ts" setup>
import Navigation from "./components/Navigation.vue";
import Loader from "./components/Loader.vue";
import { AUTO_LOGIN_ACTION } from "./store/modules/storeconstans";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, onMounted} from "vue";

const store = useStore();
const router = useRouter();
const showLoading = computed(() => store.state.showLoading);
const isLoggedIn = computed(() => store.state.auth.isLoggedIn);

onMounted(() => {
  store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
});

</script>

<template>
  <div>
    <navigation v-if="isLoggedIn"></navigation>
    <loader v-if="showLoading"></loader>
    <div class="sticky">
      <router-view></router-view>
    </div>
  </div>
</template>
