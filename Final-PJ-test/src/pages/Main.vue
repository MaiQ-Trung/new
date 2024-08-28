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
  <div class="flex">
    <!-- Add the sidebar here -->
    <Sidebar
      @dashboard-click="() => showComponent('Dashboard', userId)"
      @projects-click="() => showComponent('Projects', userId)"
      @calendar-click="() => showComponent('Calendar')"
      @teams-click="() => showComponent('Teams')"
      @docs-click="() => showComponent('Docs')"
      @settings-click="() => showComponent('Settings')"
      @trash-click="() => showComponent('Trash')"      
    />
    <!-- Main -->
    <div class=" w-full h-full">
      <router-view />
    </div>
  </div>
</template>
