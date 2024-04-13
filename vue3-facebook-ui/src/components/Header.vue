<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="nav-bar">
    <div class="logo">
      <img alt="Vue logo" src="../assets/face icon.webp" width="50px" height="50px" />
      <div class="search-bar">
        <div class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
        <path fill="#ffffff" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
        </svg>
      </div>
      <input type="text" placeholder="Search on Facebook..." @input= "filterSuggestions"/>
      <div v-if= "filteredSuggestions.length > 0" class="suggestion-box">
        <ul>
          <li v-for= "(suggestion, index) in filteredSuggestions" :key= "index" > {{ suggestion }}</li>
        </ul>
      </div>
      </div>
    </div>
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
    <div class="nav-menu">
      <span>
        <a href="#">
            <button class="but2" @click= "toggleMenu1" @click.prevent="handleClickWithoutScroll">
              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="22.5" viewBox="0 0 448 512"><path fill="#ffffff" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
            </button>
        </a>
      </span>
      <span>
        <a href="#">
            <button class="but2" @click= "toggleMenu2" @click.prevent="handleClickWithoutScroll">
              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="30" viewBox="0 0 512 512"><path fill="#ffffff" d="M256.6 8C116.5 8 8 110.3 8 248.6c0 72.3 29.7 134.8 78.1 177.9 8.4 7.5 6.6 11.9 8.1 58.2A19.9 19.9 0 0 0 122 502.3c52.9-23.3 53.6-25.1 62.6-22.7C337.9 521.8 504 423.7 504 248.6 504 110.3 396.6 8 256.6 8zm149.2 185.1l-73 115.6a37.4 37.4 0 0 1 -53.9 9.9l-58.1-43.5a15 15 0 0 0 -18 0l-78.4 59.4c-10.5 7.9-24.2-4.6-17.1-15.7l73-115.6a37.4 37.4 0 0 1 53.9-9.9l58.1 43.5a15 15 0 0 0 18 0l78.4-59.4c10.4-8 24.1 4.5 17.1 15.6z"/></svg>
            </button>
        </a>
      </span>
      <span>
        <a href="#">
            <button class="but2" @click= "toggleMenu3" @click.prevent="handleClickWithoutScroll">
              <svg xmlns="http://www.w3.org/2000/svg" height="25" width="27.5" viewBox="0 0 448 512"><path fill="#ffffff" d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"/></svg>
            </button>
        </a>
      </span>
      <span>
        <a href="#">
            <button class="but2" @click= "toggleMenu4" @click.prevent="handleClickWithoutScroll">
              <img class="round" src="../assets/face icon.webp" width="50px" height="50px" />
            </button>
        </a>
      </span>

      <div class="dropdown-menu" v-show= "menu1IsActive">
        <button class="d-but"><p>Menu1</p></button>
        <button class="d-but"><p>Menu2</p></button>
        <button class="d-but"><p>Menu3</p></button>
        <button class="d-but"><p>Menu4</p></button>
      </div>
      <div class="dropdown-menu" v-show= "menu2IsActive">
        <button class="d-but"><p>Chat1</p></button>
        <button class="d-but"><p>Chat2</p></button>
        <button class="d-but"><p>Chat3</p></button>
        <button class="d-but"><p>Chat4</p></button>
      </div>
      <div class="dropdown-menu" v-show= "menu3IsActive">
        <button class="d-but"><p>noti1</p></button>
        <button class="d-but"><p>noti1</p></button>
        <button class="d-but"><p>noti1</p></button>
        <button class="d-but"><p>noti1</p></button>
      </div>
      <div class="dropdown-menu" v-show= "menu4IsActive">
        <button class="d-but"><p>set1</p></button>
        <button class="d-but"><p>set1</p></button>
        <button class="d-but"><p>set1</p></button>
        <button class="d-but"><p>set1</p></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      suggestions: [
        "magma",
        "mama",
        "milk",
        "moon",
        "mountain",
        "mango",
        "case",
        "cage",
        "cane",
        "button",
      ],
      filteredSuggestions: [],
      showSuggestions: false,
      menu1IsActive: false,
      menu2IsActive: false,
      menu3IsActive: false,
      menu4IsActive: false,
    };
  },
  methods: {
    filterSuggestions(event) {
      const inputValue = event.target.value.toLowerCase();
      this.filteredSuggestions = this.suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue)
      );
      this.showSuggestions = true; // Show suggestion box when filtering
    },
    toggleMenu1() {
      this.menu1IsActive = !this.menu1IsActive;
    },
    toggleMenu2() {
      this.menu2IsActive = !this.menu2IsActive;
    },
    toggleMenu3() {
      this.menu3IsActive = !this.menu3IsActive;
    },
    toggleMenu4() {
      this.menu4IsActive = !this.menu4IsActive;
    },
    toggleSuggest() {
      this.showSuggestions = !this.showSuggestions;
    },
    handleClickWithoutScroll(event) {
      event.preventDefault();
    },
  },
};
</script>
<style scoped>
.nav-bar {
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  position: fixed;
  height: 65px;
  width: 1458px;
  background-color: #4b4b4c;
  margin: 0;
  padding: 0 20px;
}
.logo {
  display: grid;
  grid-template-columns: 50px auto;
  align-items: center;
}
.search-bar {
  display: grid;
  grid-template-columns: 50px auto;
  background-color: #4b4b4c;
  width: 300px;
  height: 45px;
}
.search-icon {
  display: none;
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  background-color: #777777;
}
input {
  font-family: "Tilt Neon", sans-serif;
  font-size: 20px;
  color: #ffffff;
  font-display: none;
  background: #777777;
  width: 240px;
  height: 25px;
  border: none;
}
input:focus {
  outline: none;
}
input:placeholder-shown {
  font-size: 20px;
  font-family: "Tilt Neon", sans-serif;
  background-color: #777777;
  border: none;
  border-radius: 25px;
  padding: 10px;
  margin-left: 10px;
}
::placeholder {
  color: rgb(255, 255, 255);
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
.nav-links,
.nav-menu {
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: center;
}
.span1 {
  padding: 10px;
}
.but1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4b4b4c;
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
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
.but2 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #777777;
  border: none;
  border-radius: 50%;
  margin-left: 20px;
}
.but2:hover {
  background-color: #989898;
}
.d-but {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4b4b4c;
  width: 330px;
  height: 50px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
}
.d-but:hover {
  background-color: #989898;
}
.but:hover {
  background-color: #989898;
}
.round {
  border-radius: 25px;
  cursor: pointer;
}
.dropdown-menu {
  display: grid;
  grid-template-rows: 60px 60px 60px 60px;
  list-style-type: none;
  position: absolute;
  margin: 55px 0 0 70px;
  width: 335px;
  height: 450px;
  background-color: #777777;
  border-radius: 10px;
}
</style>
