<template>
  <!-- Table -->
  <div class="relative h-dvh bg-slate-50 max-h-dvh overflow-y-auto">
    <div class="container p-5">
      <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl mb-5">Trash</h2>
      <table class="w-full">
        <thead>
          <tr
            class="text-gray-800 text-xl font-roboto font-semibold grid grid-cols-3 px-4 py-2 border-b border-gray-500"
          >
            <td>Name</td>
            <td class="ml-48">Deleted at</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in DeletedFiles"
            :key="item.id"
            class="relative grid grid-cols-3 px-4 py-2 border-b border-gray-500 hover:bg-gray-300 duration-100 cursor-pointer"
          >
            <td class="py-2">
              <span class="text-gray-800 text-base font-roboto font-semibold">
                {{ item.name }}
              </span>
            </td>
            <td
              class="py-2 ml-48 text-gray-800 text-base font-roboto font-semibold"
            >
              {{ new Date(item.deleted_at).toLocaleString() }}
            </td>
            <td class="flex justify-end mr-28 gap-2">
              <button
                @click="restoreFile(item.id)"
                class="flex p-2 text-slate-500 text-2xl rounded-xl hover:bg-slate-200 duration-200 ease-in-out"
              >
                <i class="pi pi-replay"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {useStore} from "vuex";
import axios from "axios";


const store = useStore();
const DeletedFiles = ref([]);

const getDeletedFiles = async () => {
  const userId = store.state.auth.userId;
  try {
    const response = await axios.get(`http://localhost:3000/trash/${userId}`);
    DeletedFiles.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const restoreFile = async (id) => {
  try {
    const userId = store.state.auth.userId;
    await axios.put(`http://localhost:3000/restore-project/${id}/${userId}`);
    // Cập nhật danh sách sau khi restore thành công
    getDeletedFiles();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getDeletedFiles();
});
</script>
