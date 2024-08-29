<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="sidebar">
    <div class="up">
        <button class="sb-but">
            <img :src= "ava" width="50" height="50">  
            <p>Profile</p>
        </button>
        <button class="sb-but">
            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 640 512"><path fill="#ffffff" d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/></svg>
            <p>Facebook Gaming</p>
        </button>
        <button class="sb-but">
            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 640 512"><path fill="#ffffff" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/></svg>
            <p>Friends</p>
        </button>
        <ul>
            <div class="dropdown-menu"  v-show= "isDropOpen">
                <button class="dropitem">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#0091ff" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
                    <p>drop1</p></button>
                <button class="dropitem">
                     <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#0091ff" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
                    <p>drop1</p></button>
                <button class="dropitem">
                     <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#0091ff" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
                    <p>drop1</p></button>
                <button class="less" @click= "toggleDrop">
                    <p>See less</p>
                    <svg style="margin-left:5px"
                    xmlns="http://www.w3.org/2000/svg" height="34" width="28.75" viewBox="0 0 320 512">
                    <path fill="#ffffff" d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/>
                    </svg>
                </button>
            </div>
        </ul>
        <button class="more" v-show= "!isDropOpen" @click= "toggleDrop">
            <p>See Mores</p>
            <svg style="margin-left:5px"
            xmlns="http://www.w3.org/2000/svg" height="30" width="26.25" viewBox="0 0 320 512">
            <path fill="#ffffff" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
        </button>
    </div>
    <div class="down">
    </div>
  </div>
</template>

<script>
import ava from "../Main component/assets/Images/face icon.webp";
export default {
    data() {
        return {
            ava,
            isDropOpen: false,
        }
    },
    methods: {
        toggleDrop() {
            this.isDropOpen = !this.isDropOpen;
        },
        toggleDown() {
            this.isDropOpen = !this.isDropOpen;
        },
        handleClickWithoutScroll() {
            window.scrollTo(0, 0);
        },
    }
}
</script>

<style>
@import './assets/Css/side.css';
</style>