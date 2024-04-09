<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="nav-bar">
    <div class="logo">
      <img alt="Vue logo" src="../assets/logo.png" width="50px" height="50px" />
      <input type="text" placeholder="Search..." width="240px" height="10px" />
    </div>
    <div class="nav-links">
      <span>
        <a href="https://www.facebook.com/">
            <button>
              <img scr="../assets/user.png" width="30px" height="30px" />
            </button>
        </a>
      </span>
      <span>
        <a href="https://www.facebook.com/">
            <button>
              <img scr="../assets/user.png" width="30px" height="30px" />
            </button>
        </a>
      </span>
      <span>
        <a href="https://www.facebook.com/">
            <button>
              <img scr="../assets/user.png" width="30px" height="30px" />
            </button>
        </a>
      </span>
      <span>
        <a href="https://www.facebook.com/">
            <button>
              <img scr="../assets/user.png" width="30px" height="30px" />
            </button>
        </a>
      </span>
    </div>
    <div class="nav-menu">
      <span>
        <a href="https://www.facebook.com/">
            <button>
              <img scr="../assets/user.png" width="30px" height="30px" />
            </button>
        </a>
      </span>
      <span>
        <a href="https://www.facebook.com/">
            <button>
              <img scr="../assets/user.png" width="30px" height="30px" />
            </button>
        </a>
      </span>
      <span>
        <a href="https://www.facebook.com/">
            <button>
              <img scr="../assets/user.png" width="30px" height="30px" />
            </button>
        </a>
      </span>
      <span>
        <a href="https://www.facebook.com/">
            <button>
              <img scr="../assets/user.png" width="30px" height="30px" />
            </button>
        </a>
      </span>
    </div>
  </div>
</template>

<style scoped>
.nav-bar {
  display: inline-flex;
  width: 100vw;
  padding: 20px;
  background-color: #9fcfff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  top: 0;
  left: 0;
}
.logo {
  display: flex;
  align-items: center;
  border-radius: 25px;
}
.nav-links {
  display: inline flex;
  margin: 25px 260px;
  width: 100%;
}
.nav-menu {
  display: inline flex;
  justify-content: flex-end;
  margin: 25px 260px;
  width: 100%;
}
span + span {
  margin-left: 20px;
}
</style>
