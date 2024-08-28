<script setup>

const props = defineProps({
  text: {
    type: String,
    default: "Loading...",
  },
});
</script>

<template>
  <div class="overlay">
    <div class="load-box">
      <div class="spinner"></div>
    </div>
    <div class="text">{{ text }}</div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200000; /* Giá trị z-index lớn để đè lên các thành phần khác */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(85, 85, 255, 0.195);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px 0 #000;
}

.spinner {
  width: 56px;
  height: 56px;
  display: grid;
  animation: spinner-plncf9 4s infinite;
}

.spinner::before,
.spinner::after {
  content: "";
  grid-area: 1/1;
  border: 9px solid;
  border-radius: 50%;
  border-color: #474bff #474bff #0000 #0000;
  mix-blend-mode: darken;
  animation: spinner-plncf9 1s infinite linear;
}

.spinner::after {
  border-color: #0000 #0000 #ffffff #ffffff;
  animation-direction: reverse;
}

@keyframes spinner-plncf9 {
  100% {
    transform: rotate(1turn);
  }
}

.text {
  font-family: "Promt", sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  margin-top: 20px;
}
</style>
