<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="sidebar">
    <div class="up">
      <span>
      <a href="#">
        <button class="sb-but" @click.prevent="handleClickWithoutScroll">
          <img class="round" src="../assets/face icon.webp" />
          <p>Profile</p>
        </button>
      </a>
    </span>
    <span>
      <a href="#">
        <button class="sb-but" @click.prevent="handleClickWithoutScroll">
          <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 640 512"><path fill="#ffffff" d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/></svg>
          <p>Facebook gaming</p>
        </button>
      </a>
    </span>
    <span>
      <a href="#">
        <button class="sb-but" @click.prevent="handleClickWithoutScroll">
          <svg style="margin-left:3px"
          xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 640 512"><path fill="#ffffff" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/></svg>
          <p>Friends</p>
        </button>
      </a>
    </span>
    <ul class="dropdown-menu" v-show= "isDropdownOpen" style="list-style: none">
      <button class="drop-item">
        <img src="../assets/face icon.webp" width="40px" height="40px"/><p>drop1</p>
      </button>
      <button class="drop-item">
        <img src="../assets/face icon.webp" width="40px" height="40px"/><p>drop2</p>
      </button>
      <button class="drop-item">
        <img src="../assets/face icon.webp" width="40px" height="40px"/><p>drop3</p>
      </button>
      <button class="drop-item">
        <img src="../assets/face icon.webp" width="40px" height="40px"/><p>drop4</p>
      </button>
      <li>
        <button class="less-btn" v-on:click = "toggleDropdown">
          <p>See Less</p>
         <svg style="margin-left:5px"
         xmlns="http://www.w3.org/2000/svg" height="34" width="28.75" viewBox="0 0 320 512">
         <path fill="#ffffff" d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/>
         </svg>
        </button>
      </li>
    </ul>
    <button class="dropdown-btn" v-show= "!isDropdownOpen" @click= "toggleDropdown">
      <p>See More</p>
      <svg style="margin-left:5px"
       xmlns="http://www.w3.org/2000/svg" height="30" width="26.25" viewBox="0 0 320 512">
      <path fill="#ffffff" d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
    </button>
    </div>
    <div class="down">
      <span>
      <a href="#">
        <button class="sb-but" @click.prevent="handleClickWithoutScroll">
          <img class="round" src="../assets/face icon.webp" />
          <p>Profile</p>
        </button>
      </a>
    </span>
    <span>
      <a href="#">
        <button class="sb-but" @click.prevent="handleClickWithoutScroll">
          <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 640 512"><path fill="#ffffff" d="M192 64C86 64 0 150 0 256S86 448 192 448H448c106 0 192-86 192-192s-86-192-192-192H192zM496 168a40 40 0 1 1 0 80 40 40 0 1 1 0-80zM392 304a40 40 0 1 1 80 0 40 40 0 1 1 -80 0zM168 200c0-13.3 10.7-24 24-24s24 10.7 24 24v32h32c13.3 0 24 10.7 24 24s-10.7 24-24 24H216v32c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h32V200z"/></svg>
          <p>Facebook gaming</p>
        </button>
      </a>
    </span>
    <span>
      <a href="#">
        <button class="sb-but" @click.prevent="handleClickWithoutScroll">
          <svg style="margin-left:3px"
          xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 640 512"><path fill="#ffffff" d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"/></svg>
          <p>Friends</p>
        </button>
      </a>
    </span>
    </div>
  </div>
  <div class="sticky-div" :class="{ 'sticky': isSticky }">
      <div class="main-cont">
    <div class="story">
      <div class="story-img-sp">
        <div class="story-img">
          <img class="img1" src="../assets/face icon.png" width="30px" height="30px" />
          <img class="img2" src="../assets/story1.jpg" />
          <h3>Nguyen Van A</h3>
        </div>
        <div class="story-img">
          <img class="img1" src="../assets/face icon.png" width="30px" height="30px" />
          <img class="img2" src="../assets/story2.jpg" />
          <h3>Nguyen Van B</h3>
        </div>
        <div class="story-img">
          <img class="img1" src="../assets/face icon.png" width="30px" height="30px" />
          <img class="img2" src="../assets/story3.jpg" />
          <h3>Nguyen Van C</h3>
        </div>
        <div class="story-img">
          <img class="img1" src="../assets/face icon.png" width="30px" height="30px" />
          <img class="img2" src="../assets/story4.jpg" />
          <h3>Nguyen Van D</h3>
        </div>
      </div>
    </div>
    <div class="post-bar">
      <div class="post-s">
        <img src="../assets/face icon.webp" width="50px" height="50px" />
        <input type="text" placeholder="What's in your mind?" />
      </div>
      <div class="but-list">
        <button class="button" style="border-bottom-left-radius:10px">
          <svg style="margin:3px"
          xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512"><path fill="#ffffff" d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/>
          </svg>
          <p1 class="buttton-p">Live Video</p1>
        </button>
        <button class="button">
          <svg style="margin:3px" 
          xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512">
          <path fill="#ffffff" d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/></svg>
          <p1 class="buttton-p">Photo/Video</p1>
        </button>
        <button class="button" style="border-bottom-right-radius:10px"> 
          <svg style="margin:3px" 
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  width="30" height="30">
          <path fill="#ffffff" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
          </svg>
          <p1 class="buttton-p">Feeling/Activity</p1>
        </button>
      </div>
    </div>
    <div class="view">
      <div class="view1">
        <div class="view-sp">
        <img src="../assets/face icon.webp" width="50px" height="50px"/>
        <p1>Mai Quoc Trung</p1>
        </div>
        <img src="../assets/view-pic.jpg" width="500px" height="630px"
        />
        <div class="button-view">
          <button class="but2" style="border-bottom-left-radius: 10px ;" @click= "toggleClick1" v-show= "!isClick1">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512">
            <path fill="#ffffff" d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"/></svg>
            <p2>Like</p2>
          </button>
          <button class="but2-2" style="border-bottom-left-radius: 10px ;" @click= "toggleClick1" v-show= "isClick1">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512">
            <path fill="#0080ff" d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"/></svg>
            <p2>Like</p2>
          </button>
          <button class="but2">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512"><path fill="#ffffff" d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/></svg>
            <p2>Comment</p2>
          </button>
          <button class="but2" style="border-bottom-right-radius: 10px ;">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512"><path fill="#ffffff" d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/></svg>
            <p2>Share</p2>
          </button>
        </div>
      </div>
      <div class="view1">
        <div class="view-sp">
        <img src="../assets/face icon.webp" width="50px" height="50px"/>
        <p1>Ngo Anh Tu</p1>
        </div>
        <img src="../assets/vi-pic.jpg" width="500px" height="630px"/>
        <div class="button-view">
          <button class="but2" style="border-bottom-left-radius: 10px ;" @click= "toggleClick2" v-show= "!isClick2">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512">
            <path fill="#ffffff" d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"/></svg>
            <p2>Like</p2>
          </button>
          <button class="but2-2" style="border-bottom-left-radius: 10px ;" @click= "toggleClick2" v-show= "isClick2">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512">
            <path fill="#0080ff" d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"/></svg>
            <p2>Like</p2>
          </button>
          <button class="but2">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512"><path fill="#ffffff" d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/></svg>
            <p2>Comment</p2>
          </button>
          <button class="but2" style="border-bottom-right-radius: 10px ;">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512"><path fill="#ffffff" d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/></svg>
            <p2>Share</p2>
          </button>
        </div>
      </div>
      <div class="view1">
        <div class="view-sp">
        <img src="../assets/face icon.webp" width="50px" height="50px"/>
        <p1>Bui Quoc Trung</p1>
        </div>
        <img src="../assets/view-p.jpg" width="500px" height="630px"
        />
        <div class="button-view">
          <button class="but2" style="border-bottom-left-radius: 10px ;" @click= "toggleClick3" v-show= "!isClick3">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512">
            <path fill="#ffffff" d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"/></svg>
            <p2>Like</p2>
          </button>
          <button class="but2-2" style="border-bottom-left-radius: 10px ;" @click= "toggleClick3" v-show= "isClick3">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512">
            <path fill="#0080ff" d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z"/></svg>
            <p2>Like</p2>
          </button>
          <button class="but2">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512"><path fill="#ffffff" d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"/></svg>
            <p2>Comment</p2>
          </button>
          <button class="but2" style="border-bottom-right-radius: 10px ;">
            <svg xmlns="http://www.w3.org/2000/svg" height="35" width="35" viewBox="0 0 512 512"><path fill="#ffffff" d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/></svg>
            <p2>Share</p2>
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div class="online">
    <span>
      <a href="#">
        <button class="sb-but" @click.prevent="handleClickWithoutScroll">
          <img src="../assets/face icon.webp" width="30px" height="30px" />
          <p>Ngo Anh Tu</p>
        </button>
      </a>
    </span>
    <span>
      <a href="#">
        <button class="sb-but" @click.prevent="handleClickWithoutScroll">
          <img src="../assets/face icon.webp" width="30px" height="30px" />
          <p>Bui Quoc Trung</p>
        </button>
      </a>
    </span>
    <span>
      <a href="#">
        <button class="sb-but" @click.prevent="handleClickWithoutScroll">
          <img src="../assets/face icon.webp" width="30px" height="30px" />
          <p>Nathan</p>
        </button>
      </a>
    </span>
    <span>
      <a href="#">
        <button class="sb-but" @click.prevent="handleClickWithoutScroll">
          <img src="../assets/face icon.webp" width="30px" height="30px" />
          <p>Some one</p>
        </button>
      </a>
    </span>
  </div>
</template>

<script>
export default {
  name: "MainContent",
  data() {
    return {
      isDropdownOpen: false,
      isClick1: false,
      isClick2: false,
      isClick3: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleClick1() {
      this.isClick1 = !this.isClick1;
    },
    toggleClick2() {
      this.isClick2 = !this.isClick2;
    },
    toggleClick3() {
      this.isClick3 = !this.isClick3;
    },
    handleClickWithoutScroll(event) {
      event.preventDefault();
    },
  },
};
</script>
