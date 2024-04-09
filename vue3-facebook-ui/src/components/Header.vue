<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="nav-bar">
    <div class="logo">
      <img alt="Vue logo" src="../assets/face icon.webp" width="50px" height="50px" />
      <input type="text" placeholder="Search..." width="240px" height="10px" />
    </div>
    <div class="nav-links">
      <span>
        <a href="#">
            <button class="but">
              <img class="round" src="../assets/home.png" width="50px" height="50px"/>
            </button>
        </a>
      </span>
      <span>
        <a href="#">
            <button class="but">
              <img class="round" src="../assets/friend.png" width="50px" height="50px" />
            </button>
        </a>
      </span>
      <span>
        <a href="#">
            <button class="but">
              <img class="round" src="../assets/video.png" width="50px" height="50px" />
            </button>
        </a>
      </span>
      <span>
        <a href="#">
            <button class="but">
              <img class="round" src="../assets/market.png" width="50px" height="50px" />
            </button>
        </a>
      </span>
    </div>
    <div class="nav-menu">
      <span>
        <a href="#">
            <button class="but">
              <img class="round" src="../assets/menu.png" width="50px" height="50px" />
            </button>
        </a>
      </span>
      <span>
        <a href="#">
            <button class="but">
              <img class="round" src="../assets/chat.png" width="50px" height="50px" />
            </button>
        </a>
      </span>
      <span>
        <a href="#">
            <button class="but">
              <img class="round" src="../assets/reng.png" width="50px" height="50px" />
            </button>
        </a>
      </span>
      <span>
        <a href="#">
            <button class="but">
              <img class="round" src="../assets/face icon.webp" width="50px" height="50px" />
            </button>
        </a>
      </span>
    </div>
  </div>
</template>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between; /* To evenly distribute the content */
  align-items: center; /* To vertically center align the items */
  height: 65px;
  width: 100%;
  padding: 0 20px; /* Adjust padding as needed */
  border-radius: 25px;
  background-color: #4b4b4c;
  box-shadow: 5px 10px 18px #383636;
}
.logo {
  display: flex;
  align-items: center;
}
input {
  width: 190px;
  height: 30px;
  border: none;
  border-radius: 25px;
  margin-left: 10px; /* Adjust margin as needed */
}
.nav-links,
.nav-menu {
  display: flex;
}
.but {
  background-color: #4b4b4c;
  border: none;
  border-radius: 25px;
  margin-left: 10px; /* Adjust margin as needed */
}
.round {
  border-radius: 25px;
  cursor: pointer;
}
</style>
