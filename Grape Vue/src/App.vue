<script setup>
import { ref } from 'vue';
import WebBuilder from './components/WebBuilder.vue';
const msg  = ref('');
</script>

<template>
  <div id="app">
    <h3>{{ msg }}</h3>
    <WebBuilder v-model:message="msg"/>
  </div>
</template>
