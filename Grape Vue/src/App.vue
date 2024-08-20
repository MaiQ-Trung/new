<script setup>
import WebBuilder from './components/WebBuilder.vue';

function HandleClick(msg) {
  console.log(msg);
}
</script>

<template>
  <div id="app">
    <WebBuilder @save="HandleClick"/>
  </div>
</template>
