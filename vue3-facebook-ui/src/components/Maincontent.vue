<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="sidebar">
    <span>
      <a href="https://www.facebook.com/">
        <button class="sb-but">
          <img scr="../assets/user.png" width="30px" height="30px" />
        </button>
      </a>
    </span>
    <span>
      <a href="https://www.facebook.com/">
        <button class="sb-but">
          <img scr="../assets/user.png" width="30px" height="30px" />
        </button>
      </a>
    </span>
    <span>
      <a href="https://www.facebook.com/">
        <button class="sb-but">
          <img scr="../assets/user.png" width="30px" height="30px" />
        </button>
      </a>
    </span>
    <span>
      <a href="https://www.facebook.com/">
        <button class="sb-but">
          <img scr="../assets/user.png" width="30px" height="30px" />
        </button>
      </a>
    </span>
    <ul class="dropdown-menu" v-show="isDropdownOpen" style="list-style: none">
      <button class="sb-but">
        <img
          src="../assets/Avatar.jpg"
          alt="Profile"
          width="40px"
          height="40px"
        />Profile
      </button>
      <button class="sb-but">
        <img
          src="../assets/Avatar.jpg"
          alt="Friends"
          width="40px"
          height="40px"
        />New Friends
      </button>
      <button class="sb-but">
        <img
          src="../assets/Avatar.jpg"
          alt="Games"
          width="40px"
          height="40px"
        />Games
      </button>
      <button class="sb-but">
        <img
          src="../assets/Avatar.jpg"
          alt="Saves"
          width="40px"
          height="40px"
        />Saves
      </button>
      <li>
        <button class="less-btn" @click="toggleDropdown">
          Thu gon
          <img src="../assets/logo.png" alt="less" width="40px" height="40px" />
        </button>
      </li>
    </ul>
    <button
      class="dropdown-btn"
      v-show="!isDropdownOpen"
      @click="toggleDropdown"
    >
      Xem them
      <img src="../assets/logo.png" alt="more" width="40px" height="40px" />
    </button>
  </div>
  <div class="main-cont">
    <div class="story">
      <div class="story-cont">
        <div class="story-img">
          <img scr="../assets/user.png" width="160px" height="250px" />
        </div>
        <div class="story-img">
          <img scr="../assets/user.png" width="160px" height="250px" />
        </div>
        <div class="story-img">
          <img scr="../assets/user.png" width="160px" height="250px" />
        </div>
        <div class="story-img">
          <img scr="../assets/user.png" width="160px" height="250px" />
        </div>
      </div>
    </div>
    <div class="post-bar">
      <div class="post-s">
        <img scr="../assets/user.png" width="50px" height="50px" />
        <input type="text" placeholder="What's in your mind?" />
      </div>
      <div class="but-list">
        <button>
          <img scr="../assets/user.png" width="30px" height="30px" />
          <span>Live Video</span>
        </button>
        <button>
          <img scr="../assets/user.png" width="30px" height="30px" />
          <span>Photo/Video</span>
        </button>
        <button>
          <img scr="../assets/user.png" width="30px" height="30px" />
          <span>Feeling/Activity</span>
        </button>
      </div>
    </div>
    <div class="view">
      <div class="view-sp">
        <img scr="../assets/logo.png" width="50px" height="50px" />
        <p style="display: inline">Mai Quoc Trung</p>
        <img src="../assets/logo.png" width="600px" height="360px" />
      </div>
      <div class="button-view">
        <button>
          <img src="../assets/logo.png" width="50px" height="50px" />Like
        </button>
        <button>
          <img src="../assets/logo.png" width="50px" height="50px" />Comment
        </button>
        <button>
          <img src="../assets/logo.png" width="50px" height="50px" />Share
        </button>
      </div>
    </div>
  </div>
  <div class="online">
    <span>
      <a href="https://www.facebook.com/">
        <button class="sb-but">
          <img scr="../assets/user.png" width="30px" height="30px" />
        </button>
      </a>
    </span>
    <span>
      <a href="https://www.facebook.com/">
        <button class="sb-but">
          <img scr="../assets/user.png" width="30px" height="30px" />
        </button>
      </a>
    </span>
    <span>
      <a href="https://www.facebook.com/">
        <button class="sb-but">
          <img scr="../assets/user.png" width="30px" height="30px" />
        </button>
      </a>
    </span>
    <span>
      <a href="https://www.facebook.com/">
        <button class="sb-but">
          <img scr="../assets/user.png" width="30px" height="30px" />
        </button>
      </a>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
};
</script>
<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: #a9a9b0;
  width: 200px;
  height: 1000vh;
  margin-top: 10px;
}
.sb-but {
  margin: 10px;
  display: flex;
  background-color: #ededed;
  border: none;
  border-radius: 25px;
  width: 180px;
  cursor: pointer;
}
.online {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 139px;
  right: -60px;
  background-color: #1a1ab5;
  width: 200px;
  height: 1000vh;
  margin-top: 10px;
}
.main-cont {
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  width: 1110px;
  position: absolute;
  top: 139px;
  height: 100vh;
  margin: 10px 0 0 210px;
}
.story-cont {
  display: inline-flex;
  background-color: #f0f0f0;
  position: absolute;
  left: 25%;
  width: 277px;
  height: 100px;
  margin: 10px 0 0 0;
}
.story-img {
  display: inline-flex;
  background-color: #f0f0f0;
  margin: 0 20px 0 0;
  border: 10px;
  border-radius: 23px;
}
.post-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #959595;
  width: 1110px;
  height: 100px;
  margin: 280px 0 0 0;
}
.post-s {
  display: inline-flex;
  align-items: center;
  width: 1000px;
  height: 60px;
  margin-left: 60%;
}
.view-sp {
  display: grid;
  width: 600px;
  height: 60px;
  margin-left: 20%;
}
.button-view {
  display: flex;
  flex-direction: row;
  width: 1000px;
  height: 60px;
  margin-top: 40%;
  margin-left: 20%;
}
.view {
  display: grid;
  background-color: #f0f0f0;
  width: 1110px;
  height: 1000vh;
}
</style>
