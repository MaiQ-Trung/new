<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div class="online">
    <button class="on-but">
        <img src:="onPath" width="40" height="40">  
        <p>Profile</p>
    </button>
    <button class="on-but">
        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#0091ff" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
        </svg>
        <p>Facebook Gaming</p>
    </button>
    <button class="on-but">
        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#0091ff" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
        </svg>
        <p>Friends</p>
    </button>
    <button class="on-but">
        <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#0091ff" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/>
        </svg>
        <p>Friends</p>
    </button>
</div>
</template>

<script>
export default {

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
    border-radius: 25px;
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
</style>