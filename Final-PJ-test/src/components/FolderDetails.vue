<template>
  <div>
    <div
      class="relative h-dvh bg-slate-50 max-h-dvh overflow-y-auto"
      @click.stop="showMenu = false"
    >
      <div class="container p-5">
        <h2 class="text-2xl font-bold font-roboto mb-5">
          {{ route.params.folderName }}
        </h2>
        <button
          @click.stop="toggleMenu"
          class="relative bg-gray-50 text-white px-4 py-2 rounded-lg hover:bg-gray-400 duration-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 448 512"
          >
            <path
              d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
            />
          </svg>
        </button>
        <!-- Menu -->
        <div
          v-if="showMenu"
          class="absolute -mt-9 w-40 bg-white border z-50 border-gray-200 rounded shadow-lg"
        >
          <input
            type="file"
            ref="fileInput"
            @change="onFileChange"
            class="hidden"
          />
          <a
            href="#"
            @click="triggerFileInput"
            class="block px-4 py-2 hover:bg-gray-100"
            >Upload File</a
          >
        </div>
        <!-- Table -->
        <table class="w-full">
          <thead>
            <tr
              class="text-gray-800 text-xl font-roboto font-semibold grid grid-cols-3 px-4 py-2 border-b border-gray-500"
            >
              <td>Name</td>
              <td class="ml-48">Lastest change</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filesInFolder"
              :key="item.id"
              class="relative grid grid-cols-3 px-4 py-2 border-b border-gray-500 hover:bg-gray-300 duration-100 cursor-pointer"
            >
              <td class="py-2 ">
                <span
                  @click="startEditing(item)"
                  class="text-gray-800 text-base font-roboto font-semibold"
                  v-if="editingFileId !== item.id"
                  >{{ item.name }}</span
                >
                <input
                  v-else
                  type="text"
                  v-model="newFileName"
                  @keydown.enter="renameItem(item.id)"
                  @blur="cancelEditing"
                  class="bottom-1 border rounded px-2 py-1"
                />
              </td>
              <td
                class="py-2 ml-48 text-gray-800 text-base font-roboto font-semibold"
              >
                {{ new Date(item.updated_at).toLocaleString() }}
              </td>
              <td class="flex justify-end mr-28 gap-2">
                <button
                  @click="downloadFile(item.id, item.name)"
                  class="flex p-2 text-slate-500 text-2xl rounded-xl hover:bg-slate-200 duration-200 ease-in-out"
                >
                  <i class="pi pi-arrow-circle-down"></i>
                </button>
                <button
                  @click="deleteFile(item.id)"
                  class="flex p-2 text-slate-500 text-2xl rounded-xl hover:bg-slate-200 duration-200 ease-in-out"
                >
                  <i class="pi pi-trash"></i>
                </button>
                <button
                  @click="moveBackFile(item.id)"
                  class="flex p-2 text-slate-500 text-2xl rounded-xl hover:bg-slate-200 duration-200 ease-in-out"
                >
                  <RollbackOutlined />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { RollbackOutlined } from "@ant-design/icons-vue";
import store from "@/store/modules/store";

const route = useRoute();

const filesInFolder = ref([]);
const showMenu = ref(false);

const fileInput = ref(null);
const selectedFile = ref(null);
const editingFileId = ref(null);
const newFileName = ref("");


const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

// Api để lấy danh sách file trong folder
const fetchFilesInFolder = async () => {
  try {
    const [filesResponse] = await Promise.all([
      axios.get(`http://localhost:3000/folders/${route.params.folderId}/files`),
    ]);
    filesInFolder.value = filesResponse.data;
    console.log(route.params)
  } catch (error) {
    console.error("Error fetching files or folder:", error);
  }
};

// Api để upload file trong một folder
const onFileChange = async (event) => {
  selectedFile.value = event.target.files[0];
  await uploadFiles();
};

const uploadFiles = async () => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append("file", selectedFile.value);

    try {
      const response = await axios.post(
        `http://localhost:3000/upload-file/${route.params.folderId}/${store.state.auth.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      fetchFilesInFolder(); // Reload files in folder after uploading
      selectedFile.value = null; // Reset selected file after upload
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
};

// Api để trả file về main/docs
const moveBackFile = async (fileId) => {
  try {
    await axios.put(`http://localhost:3000/moveback-file/${fileId}/${store.state.auth.userId}`);
    fetchFilesInFolder();
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

// Api để xóa file trong folder
const deleteFile = async (fileId) => {
  try {
    await axios.delete(
      `http://localhost:3000/folders/${route.params.folderId}/files/${fileId}`
    );
    fetchFilesInFolder();
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

// Api để tải file trong folder
const downloadFile = async (fileId, fileName) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/folders/${route.params.folderId}/files/${fileId}`,
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    fetchFilesInFolder();
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

//Api để đổi tên file
const renameFile = async (fileId) => {
  if (newFileName.value) {
    try {
      await axios.put(`http://localhost:3000/files/${fileId}`, {
        name: newFileName.value,
      });
      fetchFilesInFolder();
      newFileName.value = "";
    } catch (error) {
      console.error("Error renaming file:", error);
    }
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const startEditing = (file) => {
  editingFileId.value = file.id;
  newFileName.value = file.name.replace(/\.[^/.]+$/, ""); // Remove extension from name
};

const renameItem = (fileId) => {
  const file = filesInFolder.value.find((file) => file.id === fileId);
  const fileExtension = file.name.split(".").pop(); // Get file extension
  renameFile(fileId, `${newFileName.value}.${fileExtension}`);
  editingFileId.value = null;
};

const cancelEditing = () => {
  editingFileId.value = null;
};

onMounted(() => {
  fetchFilesInFolder();
});
</script>

