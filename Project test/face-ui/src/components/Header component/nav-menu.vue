<template>
  <div class="nav-menu">
    <button class="but2" @click= "toggleMenu1" @click.prevent= "handleClickWithoutScroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="25" width="22.5" viewBox="0 0 448 512"><path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
    </button>
    <button class="but2" @click= "toggleMenu2" @click.prevent= "handleClickWithoutScroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="25" width="30" viewBox="0 0 512 512"><path fill="#ffffff" d="M256.6 8C116.5 8 8 110.3 8 248.6c0 72.3 29.7 134.8 78.1 177.9 8.4 7.5 6.6 11.9 8.1 58.2A19.9 19.9 0 0 0 122 502.3c52.9-23.3 53.6-25.1 62.6-22.7C337.9 521.8 504 423.7 504 248.6 504 110.3 396.6 8 256.6 8zm149.2 185.1l-73 115.6a37.4 37.4 0 0 1 -53.9 9.9l-58.1-43.5a15 15 0 0 0 -18 0l-78.4 59.4c-10.5 7.9-24.2-4.6-17.1-15.7l73-115.6a37.4 37.4 0 0 1 53.9-9.9l58.1 43.5a15 15 0 0 0 18 0l78.4-59.4c10.4-8 24.1 4.5 17.1 15.6z"/></svg>
    </button>
    <button class="but2" @click= "toggleMenu3" @click.prevent= "handleClickWithoutScroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="25" width="27.5" viewBox="0 0 448 512"><path fill="#ffffff" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg>
    </button>
    <button class="but2" @click= "toggleMenu4" @click.prevent= "handleClickWithoutScroll">
      <img :src= "imgPath" height="50" width="50"/>
    </button>
    </div>
  <div id="drop-menu" v-show= "menu1IsActive">
    <button class="d-but"><p>Menu1</p></button>
    <button class="d-but"><p>Menu2</p></button>
    <button class="d-but"><p>Menu3</p></button>
    <button class="d-but"><p>Menu4</p></button>
  </div>
  <div id="drop-menu" v-show= "menu2IsActive">
    <button class="d-but"><p>Chat1</p></button>
    <button class="d-but"><p>Chat2</p></button>
    <button class="d-but"><p>Chat3</p></button>
    <button class="d-but"><p>Chat4</p></button>
  </div>
  <div id="drop-menu" v-show= "menu3IsActive">
    <button class="d-but"><p>noti1</p></button>
    <button class="d-but"><p>noti1</p></button>
    <button class="d-but"><p>noti1</p></button>
    <button class="d-but"><p>noti1</p></button>
  </div>
  <div id="drop-menu" v-show= "menu4IsActive">
    <button class="d-but"><p>set1</p></button>
    <button class="d-but"><p>set1</p></button>
    <button class="d-but"><p>set1</p></button>
    <button class="d-but"><p>set1</p></button>
  </div>
</template>

<script>
import imgPath from "../Header component/assets/Image/face icon.webp";
export default {
    data() {
        return {
            imgPath,
            menu1IsActive: false,
            menu2IsActive: false,
            menu3IsActive: false,
            menu4IsActive: false,
        }
    },
    methods:{
      toggleMenu1() {
            this.menu1IsActive = !this.menu1IsActive;
            this.menu2IsActive = false;
            this.menu3IsActive = false;
            this.menu4IsActive = false;
        },
        toggleMenu2() {
            this.menu2IsActive = !this.menu2IsActive;
            this.menu1IsActive = false;
            this.menu3IsActive = false;
            this.menu4IsActive = false;
        },
        toggleMenu3() {
            this.menu3IsActive = !this.menu3IsActive;
            this.menu1IsActive = false;
            this.menu2IsActive = false;
            this.menu4IsActive = false;
        },
        toggleMenu4() {
            this.menu4IsActive = !this.menu4IsActive;
            this.menu1IsActive = false;
            this.menu2IsActive = false;
            this.menu3IsActive = false;
        },
        handleClickWithoutScroll(event) {
        event.preventDefault();
        },
    }
}
</script>

<style>
.nav-menu {
  display: grid;
  grid-template-columns: auto auto auto auto;
  align-items: center;
  justify-content: flex-end;
  width: 480px;
  height: 100%;
  margin-right: 10px;
}
.but2 {
  display: grid; 
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  position: relative;
  background-color: #777777;
  border: none;
  border-radius: 50%;
  margin-left: 20px;
  z-index: 2;
}
.but2:hover {
  background-color: #989898;
}
.d-but {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4b4b4c;
  width: 310px;
  height: 100px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  font-family: "Tilt Neon", sans-serif;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings:
      "XROT" 0,
      "YROT" 0;
}
.d-but:hover {
  background-color: #989898;
}
.but:hover {
  background-color: #989898;
}
.suggestion-box {
  position: absolute;
  top: 100%; /* Position it just below the input */
  left: 80px;
  width: 250px;
  border-top: none;
  border: 2px solid #c0c0c0;
  background-color: #4b4b4c;
}
.suggestion-box ul {
  list-style-type: none;
  padding: 0;
}

.suggestion-box ul li {
  background-color: aqua;
  padding: 10px;
  cursor: pointer;
}

.suggestion-box ul li:hover {
  background-color: #f0f0f0;
}
#drop-menu{
  display: grid;
  grid-template-rows: auto auto auto auto;
  width: 318px;
  height: 450px;
  background-color: #4b4b4c;
  margin: 10px 0 0 1190px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-content: center;
  align-items: center;
  border: 2px solid #313131;
}
</style>