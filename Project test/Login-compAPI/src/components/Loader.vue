<script setup>
import { defineProps } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "Loading...",
  },
});
</script>

<template>
  <div class="load-box">
    <span class="loader"> </span>
  </div>
  <div class="text">{{ text }}</div>
</template>

<style scoped>
.load-box {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 999;
  background-color: rgba(152, 83, 255, 0.195);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px 0 #000;
}
.loader {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 6rem;
  margin-left: 46%;
  margin-top: 20%;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  animation: pulsOut 1.8s ease-in-out infinite;
  filter: drop-shadow(0 0 1rem rgba(221, 0, 255, 0.75));
}
.loader:before {
  width: 100%;
  padding-bottom: 100%;
  box-shadow: inset 0 0 0 1rem #fff;
  animation-name: pulsIn;
}
.loader:after {
  width: calc(100% - 2rem);
  padding-bottom: calc(100% - 2rem);
  box-shadow: 0 0 0 0 #fff;
}

@keyframes pulsIn {
  0% {
    box-shadow: inset 0 0 0 1rem #fff;
    opacity: 1;
  }
  50%,
  100% {
    box-shadow: inset 0 0 0 0 #fff;
    opacity: 0;
  }
}

@keyframes pulsOut {
  0%,
  50% {
    box-shadow: 0 0 0 0 #fff;
    opacity: 0;
  }
  100% {
    box-shadow: 0 0 0 1rem #fff;
    opacity: 1;
  }
}
.text {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: #fff;
}
</style>
