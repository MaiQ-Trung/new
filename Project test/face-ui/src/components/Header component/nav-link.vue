<template>
<div class="nav-links">
      <span class="span1">
        <a href="#">
            <button class="but1" @click.prevent="handleClickWithoutScroll">
              <svg xmlns="http://www.w3.org/2000/svg" height="30" width="32.5" viewBox="0 0 576 512"><path fill="#ffffff" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24zM352 224a64 64 0 1 0 -128 0 64 64 0 1 0 128 0zm-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H256z"/></svg>
            </button>
        </a>
      </span>
      <span class="span1">
        <a href="#">
            <button class="but1" @click.prevent="handleClickWithoutScroll">
              <svg xmlns="http://www.w3.org/2000/svg" height="40" width="28" viewBox="0 0 640 512"><path fill="#ffffff" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/></svg>
            </button>
        </a>
      </span>
      <span class="span1">
        <a href="#">
            <button class="but1" @click.prevent="handleClickWithoutScroll">
              <svg xmlns="http://www.w3.org/2000/svg" height="30" width="25" viewBox="0 0 512 512"><path fill="#ffffff" d="M448 32H361.9l-1 1-127 127h92.1l1-1L453.8 32.3c-1.9-.2-3.8-.3-5.8-.3zm64 128V96c0-15.1-5.3-29.1-14-40l-104 104H512zM294.1 32H201.9l-1 1L73.9 160h92.1l1-1 127-127zM64 32C28.7 32 0 60.7 0 96v64H6.1l1-1 127-127H64zM512 192H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192z"/></svg>
            </button>
        </a>
      </span>
      <span class="span1">
        <a href="#">
            <button class="but1" @click.prevent="handleClickWithoutScroll">
              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="32.5" viewBox="0 0 576 512"><path fill="#ffffff" d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z"/></svg>
            </button>
        </a>
      </span>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.nav-links {
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: space-between;
  height: 100%;
}
.but1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #313131;
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  transition: 1s;
  margin-top: 10px;
}
.but1:hover{
    background-color: #888888;
}
.but1:after {
  content: "";
  position: absolute;
  margin: 0 5px 0 5px;
  width: 100%;
  height: 5px;
  bottom: -10px;
  left: -4px;
  transform: scaleX(0);
  background: #0080ff;
  transform-origin: bottom top;
  transition: transform 0.5s;
}
.but1:hover:after {
  background-color: #0080ff;
  transform: scaleX(1);
  transform-origin: bottom top;
}
</style>