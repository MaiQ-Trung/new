<template>
    <div class="load-box">
        <div class="loader"></div> 
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: '', // Define the text property here
        };
    },
    prop: {
        text: {
            required: false,
            type: String,
            default: "Loading..."
        }
    }
}
</script>

<style>
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
  width: 120px;
  height: 22px;
  border-radius: 20px;
  color: #6a00ff;
  border: 2px solid;
  position: relative;
  margin-left: 46%;
  margin-top: 20%;
}
.loader::before {
  content: "";
  position: absolute;
  margin: 2px;
  inset: 0 100% 0 0;
  border-radius: inherit;
  background: currentColor;
  animation: l6 2s infinite;
}
@keyframes l6 {
    100% {inset:0}
}
</style>