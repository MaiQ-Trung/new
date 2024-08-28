<template>
  <div class="flex flex-col w-full h-svh bg-blue-50 items-center p-20">
    <div class="lv1 relative bg-white rounded-xl w-max h-max p-4 shadow-lg">
      <h1 class="text-xl font-mono font-bold text-cyan-800 px-10 py-2">
        {{ users[0].name }}
      </h1>
      <hr />
      <div class="flex flex-row justify-center items-center">
        <i class="pi pi-users text-blue-600"></i>
        <h1 class="font-sans">{{ users[0].member }} thành viên</h1>
      </div>
    </div>
    <ol class="lv2-wrap relative flex flex-col mt-16 gap-20">
      <div class="grid grid-flow-col gap-10">
        <li
          v-for="user in users.slice(1, 4)"
          :key="user.id"
          class="lv2 relative bg-white rounded-xl w-max h-max p-4 shadow-lg"
        >
          <h1 class="text-xl font-mono font-bold text-cyan-800 px-10 py-2">
            {{ user.name }}
          </h1>
          <hr />
          <div class="flex flex-row justify-center items-center gap-2">
            <i class="pi pi-users text-blue-600"></i>
            <h1 class="font-sans">{{ user.member }} thành viên</h1>
          </div>
        </li>
      </div>
    </ol>
    <ol class="lv2-wrap relative flex flex-col mt-16 gap-20">
      <div class="grid grid-flow-col gap-10">
        <li
          v-for="user in users.slice(4)"
          :key="user.id"
          class="lv2 relative bg-white rounded-xl w-max h-max p-4 shadow-lg"
        >
          <h1 class="text-xl font-mono font-bold text-cyan-800 px-10 py-2">
            {{ user.name }}
          </h1>
          <hr />
          <div class="flex flex-row justify-center items-center gap-2">
            <i class="pi pi-users text-blue-600"></i>
            <h1 class="font-sans">{{ user.member }} thành viên</h1>
          </div>
        </li>
      </div>
    </ol>
  </div>
</template>

<script setup>
import { ref } from "vue";
import "primeicons/primeicons.css";

const users = ref([
  { id: 1, lv: 1, name: "Ban Giám Đốc", member: 100 },
  { id: 2, lv: 2, name: "Ban Kinh Doanh", member: 20 },
  { id: 3, lv: 2, name: "Ban Vận Hành", member: 50 },
  { id: 4, lv: 2, name: "Ban Kỹ Thuật", member: 30 },
  { id: 5, lv: 3, name: "Ban Kinh Doanh", member: 20 },
  { id: 6, lv: 3, name: "Ban Vận Hành", member: 50 },
  { id: 7, lv: 3, name: "Ban Kỹ Thuật", member: 30 },
]);
</script>

<style scoped>
.lv1::after {
  content: "";
  position: absolute;
  margin-top: 3px;
  top: 97%;
  left: 50%;
  width: 1px;
  height: 250px;
  background-color: #555555;
  transform: translateX(-50%);
}

.lv2-wrap::before {
  content: "";
  position: absolute;
  top: -40%;
  left: 49%;
  width: 69%;
  margin-left: 7px;
  height: 1px;
  background-color: #555555;
  transform: translateX(-49%);
}

.lv2::before {
  content: "";
  position: absolute;
  top: -40%;
  left: 50%;
  width: 1px;
  height: 40px;
  background-color: #555555;
}

.lv2:nth-child(2)::before {
  display: none;
}
</style>
