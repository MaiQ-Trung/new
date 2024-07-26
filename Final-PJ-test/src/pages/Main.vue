<script setup>
import { useRoute, useRouter } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";

const route = useRoute();
const router = useRouter();
const userId = route.params?.userId;
const showComponent = (component, userId = null) => {
  if (userId !== null)
    router.push(`/main/${component.toLowerCase()}/${userId}`);
  else router.push(`/main/${component.toLowerCase()}`);
};
</script>

<template>
  <div class="flex flex-wrap">
    <!-- Add the sidebar here -->
    <Sidebar
      @dashboard-click="() => showComponent('Dashboard', userId)"
      @projects-click="() => showComponent('Projects', userId)"
      @calendar-click="() => showComponent('Calendar')"
      @docs-click="() => showComponent('Docs')"
      @settings-click="() => showComponent('Settings')"      
    />
    <!-- Main -->
    <div class="ml-64">
      <router-view />
    </div>
  </div>
</template>
