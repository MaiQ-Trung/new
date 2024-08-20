<template>
    <div class="flex flex-col w-full h-svh bg-blue-50 items-center p-20">
      <div class="lv1 bg-white rounded-xl w-max h-max p-4 shadow-lg">
        <h1 class="text-xl font-mono font-bold text-cyan-800 px-10 py-2">Ban Giám đốc</h1>
        <hr />
        <div class="flex flex-row justify-center items-center">
          <i class="pi pi-users text-blue-600"></i>
          <h1 class="font-sans">100 thành viên</h1>
        </div>
      </div>
      <ol class="lv2-wrap relative flex flex-row mt-16 gap-20">
        <li class="lv2 relative bg-white rounded-xl w-max h-max p-4 shadow-lg">
          <h1 class="text-xl font-mono font-bold text-cyan-800 px-10 py-2">Ban Kinh Doanh</h1>
          <hr />
          <div class="flex flex-row justify-center gap-2 items-center">
            <i class="pi pi-users text-blue-600"></i>
            <h1 class="font-sans">20 thành viên</h1>
          </div>
        </li>
        <li class="bg-white rounded-xl w-max h-max p-4 shadow-lg">
          <h1 class="text-xl font-mono font-bold text-cyan-800 px-10 py-2">Ban Công Nghệ</h1>
          <hr />
          <div class="flex flex-row justify-center gap-2 items-center">
            <i class="pi pi-users text-blue-600"></i>
            <h1 class="font-sans">50 thành viên</h1>
          </div>
        </li>
        <li class="lv3 relative bg-white rounded-xl w-max h-max p-4 shadow-lg">
          <h1 class="text-xl font-mono font-bold text-cyan-800 px-10 py-2">Ban Vận Hành</h1>
          <hr />
          <div class="flex flex-row justify-center gap-2 items-center">
            <i class="pi pi-users text-blue-600"></i>
            <h1 class="font-sans">30 thành viên</h1>
          </div>
        </li>
      </ol>
      <ol class="lv2-wrap relative flex flex-row mt-16 gap-20">
        <li class="lv2 relative bg-white rounded-xl w-max h-max p-4 shadow-lg">
          <h1 class="text-xl font-mono font-bold text-cyan-800 px-10 py-2">Ban Kinh Doanh</h1>
          <hr />
          <div class="flex flex-row justify-center gap-2 items-center">
            <i class="pi pi-users text-blue-600"></i>
            <h1 class="font-sans">20 thành viên</h1>
          </div>
        </li>
        <li class="bg-white rounded-xl w-max h-max p-4 shadow-lg">
          <h1 class="text-xl font-mono font-bold text-cyan-800 px-10 py-2">Ban Công Nghệ</h1>
          <hr />
          <div class="flex flex-row justify-center gap-2 items-center">
            <i class="pi pi-users text-blue-600"></i>
            <h1 class="font-sans">50 thành viên</h1>
          </div>
        </li>
        <li class="lv3 relative bg-white rounded-xl w-max h-max p-4 shadow-lg">
          <h1 class="text-xl font-mono font-bold text-cyan-800 px-10 py-2">Ban Vận Hành</h1>
          <hr />
          <div class="flex flex-row justify-center gap-2 items-center">
            <i class="pi pi-users text-blue-600"></i>
            <h1 class="font-sans">30 thành viên</h1>
          </div>
        </li>
      </ol>
    </div>
  </template>
  
  <script setup>
  import "primeicons/primeicons.css";
  </script>
  
  <style>
  .lv1::after{
    content: "";
    position: absolute;
    margin-top: 3px;
    top: 25%;
    left: 50%;
    width: 1px;
    height: 230px;
    background-color: #555555;
    transform: translateX(-50%);
  }
  
  .lv2-wrap::before{
    content: "";
    position: absolute;
    top: -40%;
    left: 49%;
    width: 72%;
    margin-left: 7px;
    height: 1px;
    background-color: #555555;
    transform: translateX(-49%);
  }
  
  .lv2::before{
    content: "";
    position: absolute;
    top: -40%;
    left: 50%;
    width: 1px;
    height: 40px;
    background-color: #555555;
  }
  
  .lv3::before{
    content: "";
    position: absolute;
    top: -40%;
    left: 49%;
    width: 1px;
    height: 40px;
    background-color: #555555;
  }
  </style>