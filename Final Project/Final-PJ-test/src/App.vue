<script lang="ts" setup>
import Loader from "./components/Loader.vue";
import { AUTO_LOGIN_ACTION } from "./store/modules/storeconstans";
import { useStore } from "vuex";
import { computed, onMounted} from "vue";

const store = useStore();
const showLoading = computed(() => store.state.showLoading);

onMounted(() => {
  store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
});

</script>

<template>
  <div>
    <loader v-if="showLoading"></loader>
    <div class="sticky">
      <router-view></router-view>
    </div>
  </div>
</template>
