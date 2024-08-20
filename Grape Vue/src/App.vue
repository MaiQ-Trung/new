<script setup>
import WebBuilder from './components/WebBuilder.vue';
import Sơđồ from './components/Sơđồ.vue';

function HandleClick(msg) {
  console.log(msg);
}
</script>

<template>
  <div id="app">
    <WebBuilder @save="HandleClick" :default="`<div class='text-block'>Text here...</div>`"/>
    <!-- <Sơđồ /> -->
  </div>
</template>
