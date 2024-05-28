<!-- App.vue -->
<script setup>
import PlayArea from "./views/PlayArea.vue";
import SideBar from "./views/SideBar.vue";
</script>

<template>
  <div id="app">
    <PlayArea />
    <SideBar />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  width: 100%;
  height: 100vh;
}
</style>
