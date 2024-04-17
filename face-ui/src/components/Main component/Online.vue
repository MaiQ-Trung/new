<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div class="online">
    <button class="on-but">
        <img :src= "ava" width="50" height="50">  
        <p>Profile</p>
    </button>
    <button class="on-but">
        <img :src= "ava" width="50" height="50">  
        <p>Facebook Gaming</p>
    </button>
    <button class="on-but">
       <img :src= "ava" width="50" height="50">  
        <p>Friends</p>
    </button>
    <button class="on-but">
       <img :src= "ava" width="50" height="50">  
        <p>Friends</p>
    </button>
</div>
</template>

<script>
import ava from "../Main component/assets/Images/face icon.webp";
export default {
    data() {
        return {
            ava,
        }
    }
}
</script>

<style scoped>
.online {
    display: grid;
    grid-template-rows: 60px 60px 60px 60px;
    background-color: rgb(97, 95, 95);
    width: 350px;
    height: 100%;
    margin: 70px 0 0 1190px;
    position: fixed;
    z-index: 1;
  }
  .on-but{
      display: grid;
      grid-template-columns: auto auto;
      justify-content: flex-start;
      align-items: center;
      width: 350px;
      height: 75px;
      background-color: rgb(97, 95, 95);
      border-radius: 0px;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
    .on-but:hover {
      transition: 0.4s;
      background-color:#e0e0e0;
    }
    .on-but img, svg {
      margin-left: 10px;
    }
</style>