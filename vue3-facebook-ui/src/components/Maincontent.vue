<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="sidebar">
    <span>
      <a href="#">
        <button class="sb-but">
          <img class="round" src="../assets/face icon.webp" />
          Profile
        </button>
      </a>
    </span>
    <span>
      <a href="#">
        <button class="sb-but">
          <img class="round" src="../assets/game.png"  />
          Facebook Gaming
        </button>
      </a>
    </span>
    <span>
      <a href="#">
        <button class="sb-but">
          <img class="round" src="../assets/friends.png"  />
          Friends
        </button>
      </a>
    </span>
    <ul class="dropdown-menu" v-show="isDropdownOpen" style="list-style: none">
      <button class="drop-item">
        <img src="../assets/face icon.webp" width="40px" height="40px"/>drop1
      </button>
      <button class="drop-item">
        <img src="../assets/face icon.webp" width="40px" height="40px"/>drop2
      </button>
      <button class="drop-item">
        <img src="../assets/face icon.webp" width="40px" height="40px"/>drop3
      </button>
      <button class="drop-item">
        <img src="../assets/face icon.webp" width="40px" height="40px"/>drop4
      </button>
      <li>
        <button class="less-btn" @click="toggleDropdown">
          Thu gon
          <img class="up-img" src="../assets/up.png" alt="less" width="40px" height="40px" />
        </button>
      </li>
    </ul>
    <button
      class="dropdown-btn"
      v-show="!isDropdownOpen"
      @click="toggleDropdown"
    >
      Xem them
      <img class="down-img" src="../assets/down.webp" alt="more" width="40px" height="40px"/>
    </button>
  </div>
  <div class="main-cont">
    <div class="story">
      <div class="story-img1">
          <img src="../assets/story1.jpg" width="160px" height="270px" />
        </div>
        <div class="story-img">
          <img src="../assets/story2.jpg" width="160px" height="270px" />
        </div>
        <div class="story-img">
          <img src="../assets/story3.jpg" width="160px" height="270px" />
        </div>
        <div class="story-img">
          <img src="../assets/story4.jpg" width="160px" height="270px" />
        </div>
    </div>
    <div class="post-bar">
      <div class="post-s">
        <img src="../assets/face icon.webp" width="50px" height="50px" />
        <input type="text" placeholder="What's in your mind?" />
      </div>
      <div class="but-list">
        <button>
          <img src="../assets/cam.jpg" width="30px" height="30px" />
          <span>Live Video</span>
        </button>
        <button>
          <img src="../assets/photo.png" width="30px" height="30px" />
          <span>Photo/Video</span>
        </button>
        <button>
          <img src="../assets/emo.png" width="30px" height="30px" />
          <span>Feeling/Activity</span>
        </button>
      </div>
    </div>
    <div class="view">
      <div class="view1">
        <div class="view-sp">
        <img src="../assets/face icon.webp" width="50px" height="50px"  style="display: inline"/>
        <p>Mai Quoc Trung</p>
        </div>
        <img src="../assets/logo.png" width="600px" height="360px" />
        <div class="button-view">
          <button>
            <img src="../assets/like.jpg" width="50px" height="50px" />Like
          </button>
          <button>
            <img src="../assets/comment.png" width="50px" height="50px" />Comment
          </button>
          <button>
            <img src="../assets/share.png" width="50px" height="50px" />Share
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="online">
    <span>
      <a href="https://www.facebook.com/">
        <button class="sb-but">
          <img src="../assets/face icon.webp" width="30px" height="30px" />
          Tu
        </button>
      </a>
    </span>
    <span>
      <a href="https://www.facebook.com/">
        <button class="sb-but">
          <img src="../assets/face icon.webp" width="30px" height="30px" />
          Nathan
        </button>
      </a>
    </span>
    <span>
      <a href="https://www.facebook.com/">
        <button class="sb-but">
          <img src="../assets/face icon.webp" width="30px" height="30px" />
          Hang
        </button>
      </a>
    </span>
    <span>
      <a href="https://www.facebook.com/">
        <button class="sb-but">
          <img src="../assets/face icon.webp" width="30px" height="30px" />
          Some1
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
  background-color: #cbcbd7;
  width: 200px;
  height: 1000vh;
  margin-top: 10px;
  border-radius: 25px;
}
.round {
  width: 45px;
  height: 40px;
  border-radius: 50%;
}
.sb-but {
  margin: 10px;
  display: flex;
  align-items: center;
  background-color: #ededed;
  border: none;
  border-radius: 25px;
  width: 180px;
  cursor: pointer;
}
.dropdown-btn {
  display: flex;
  align-items: center;
  background-color: #ededed;
  border: none;
  border-radius: 25px;
  width: 180px;
  cursor: pointer;
  margin-left: 10px;
}
.less-btn {
  display: inline;
  justify-content: flex-start;
  background-color: #ededed;
  border: none;
  border-radius: 25px;
  width: 180px;
  cursor: pointer;
  margin-left: 10px;
}
.dropdown-menu {
  display: inline;
  justify-content: flex-start;
  background-color: #a9a9b0;
  border: none;
  border-radius: 25px;
  width: 180px;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 0%;
  cursor: pointer;
}
.drop-item {
  display: flex;
  align-items: center;
  background-color: #ededed;
  border: none;
  border-radius: 25px;
  width: 180px;
  margin: 10px 10px 5px 0px;
  left: 0;
  cursor: pointer;
}
.down-img {
  float: right;
}
.online {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 75px;
  right: -60px;
  background-color: #1a1ab5;
  width: 200px;
  height: 1000vh;
  margin-top: 10px;
  border-radius: 25px;
}
.main-cont {
  display: flex;
  flex-direction: column;
  background-color: #4b4b4c;
  width: 1110px;
  height: 1000vh;
  position: absolute;
  top: 75px;
  margin: 10px 0 0 210px;
  border-radius: 25px;
}
.story {
  display: inline-flex;
  background-color: #606465;
  position: absolute;
  width: 1110px;
  height: 290px;
  border-radius: 25px;
  box-shadow: 10px 10px 15px #343232;
}
.story-img {
  display: inline-flex;
  background-color: #606465;
  margin: 20px 20px 0 0;
}
.story-img1 {
  display: inline-flex;
  background-color: #606465;
  margin: 20px 20px 0 20%;
}
.post-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1818da;
  width: 1110px;
  height: 100px;
  margin: 300px 0 0 0;
  border-radius: 20px;
  box-shadow: 10px 10px 18px #343232;
}
.post-s {
  display: inline-flex;
  align-items: center;
  width: 1100px;
  height: 60px;
  margin-left: 60%;
  margin-top: 20px;
}
.but-list {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1818da;
  width: 1110px;
  height: 40px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.view {
  display: flex;
  flex-direction: column;
  background-color: #606465;
  margin-top: 40px;
  border-radius: 20px;
  width: 1110px;
  height: 1000vh;
  box-shadow: 10px 10px 18px #343232;
}
.view-sp {
  display: flex; /* Use flexbox */
  align-items: center; /* Align items vertically */
  width: 600px;
  height: 60px;
}
.view1 {
  display: flex;
  flex-direction: column;
  background-color: #8e8e8e;
  width: 950px;
  height: 500px;
  margin: 20px 0 0 80px;
  border-radius: 20px;
  box-shadow: 10px 10px 18px #343232;
}
.button-view {
  /* display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #606465;
  width: 1110px;
  height: 60px;
  border: none;
  margin-top: 10px; */
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 60px 60px 60px;
  margin: 20px;
}
.button-view button {
  /* text-align: center;
  background-color: #606465;
  border: #343232;
  border-radius: 25px;
  box-shadow: 10px 10px 18px #343232; */
  margin: 0;
  background: #343232;
  border-radius: 25px;
  text-align: center;
}
input {
  width: 190px;
  height: 30px;
  border: none;
  border-radius: 25px;
  margin-left: 10px;
}
</style>
