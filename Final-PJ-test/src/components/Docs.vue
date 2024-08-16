<template>
  <div
    class="relative h-full bg-slate-50 min-h-[640px] max-h-[640px] overflow-auto"
    @click.stop="showMenu = false"
  >
    <div class="container p-5">
      <h2 class="text-2xl font-bold mb-5">Docs Management</h2>
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
      <!--Menu button for upload, new file, new folder-->
      <div
        v-if="showMenu"
        class="absolute -mt-9 w-40 bg-white border z-50 border-gray-200 rounded shadow-lg"
      >
        <!-- Upload files -->
        <input
          type="file"
          ref="fileInput"
          @change="onFileChange"
          class="hidden"
        />
        <a
          href="#"
          @click="triggerFileInput"
          class="block px-4 py-2 hover:bg-gray-100 duration-200 ease-in-out"
        >
          Upload File
        </a>
        <!-- New Folder -->
        <a
          href="#"
          @click="toggleModal"
          class="block px-4 py-2 hover:bg-gray-100 duration-200 ease-in-out"
        >
          Create Folder
        </a>
      </div>
      <!-- Modal for creating a new folder -->
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div
          class="bg-white p-4 rounded-lg shadow-lg w-1/3"
          @keydown.enter="createFolder"
        >
          <h3 class="text-xl font-bold mb-4">Create New Folder</h3>
          <input
            type="text"
            v-model="newFolderName"
            placeholder="Folder Name"
            class="border rounded px-2 py-1 w-full mb-4"
          />
          <div class="flex justify-end">
            <button
              @click="cancelModal"
              class="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              @click="createFolder"
              class="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </div>
      </div>

      <!--table-->
      <table class="w-full">
        <thead>
          <tr
            class="text-gray-800 text-xl font-roboto font-semibold grid grid-cols-3 justify-start px-4 py-2 border-b border-gray-500"
          >
            <td>Name</td>
            <td class="ml-48">Latest Change</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filesAndFolders"
            :key="item.id"
            class="relative grid grid-cols-3 px-4 py-2 border-b border-gray-500 hover:bg-gray-300 duration-100 cursor-pointer"
            v-bind:class="{ dragging: item.dragging }"
            draggable="true"
            @dragstart="onDragStart(item)"
            @dragend="onDragEnd(item)"
            @drop="onDrop(item)"
            @dragover.prevent
            @dblclick="HandleDBClick(item)"
          >
            <td class="py-2">
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
                v-if="item.type === 'file'"
                @click="downloadFile(item.id, item.name)"
                class="flex p-2 text-slate-500 text-2xl rounded-xl hover:bg-slate-200 duration-200 ease-in-out"
              >
                <i class="pi pi-arrow-circle-down"></i>
              </button>
              <button
                v-if="item.type === 'file'"
                @click="deleteItem(item.id)"
                class="flex p-2 text-slate-500 text-2xl rounded-xl hover:bg-slate-200 duration-200 ease-in-out"
              >
                <i class="pi pi-trash"></i>
              </button>
              <button
                v-if="item.type === 'folder'"
                @click="deleteItem(item.id)"
                class="flex p-2 text-slate-500 text-2xl rounded-xl hover:bg-slate-200 duration-200 ease-in-out"
              >
                <i class="pi pi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- Modal xem trước nội dung -->
  <div
    v-if="previewFile"
    class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center"
  >
    <div
      class="relative top-10 bg-white py-3 px-4 rounded-lg shadow-lg w-3/4 h-[650px] overflow-auto"
    >
      <div class="sticky flex flex-row justify-between items-center">
        <h3 class="text-xl font-bold mb-4">{{ previewFile.name }}</h3>
        <button
          @click="closePreview"
          class="hover:bg-gray-500 mb-4 px-2 py-2 rounded mr-2 duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>
      <div
        class="absolute flex justify-center w-full h-full max-w-[1120px] max-h-[570px] overflow-auto rounded-md shadow-2xl backdrop-opacity-45"
      >
        <div v-if="previewFile.type === 'text'">
          {{ previewContent }}
        </div>
        <img
          v-if="previewFile.type === 'image'"
          :src="previewContent"
          alt="File Preview"
          class="flex"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const selectedFile = ref(null);
const filesAndFolders = ref([]);
const editingFileId = ref(null);
const newFileName = ref("");
const fileInput = ref(null);
const showMenu = ref(false);
const showModal = ref(false);
const newFolderName = ref("");
const previewFile = ref(null);
const previewContent = ref("");

const HandleDBClick = (item) => {
  if (item.type === "folder") {
    navigateToFolder(item);
  } else {
    previewItem(item);
  }
};

// Mở modal xem trước nội dung
const previewItem = async (item) => {
  if (item.type === "file") {
    try {
      const response = await axios.get(
        `http://localhost:3000/files/${item.id}/preview`,
        {
          responseType: "blob", // Để nhận dữ liệu dưới dạng blob
        }
      );

      const contentType = response.headers["content-type"];
      if (contentType.includes("text")) {
        previewContent.value = await response.data.text();
      } else if (contentType.includes("image")) {
        previewContent.value = URL.createObjectURL(response.data);
      } else {
        previewContent.value = "Unsupported file type";
      }

      previewFile.value = {
        id: item.id,
        type: contentType.includes("text")
          ? "text"
          : contentType.includes("image")
          ? "image"
          : "other",
        name: item.name,
      };
    } catch (error) {
      console.error("Error previewing file:", error);
    }
  }
};

// Đóng modal xem trước
const closePreview = () => {
  previewFile.value = null;
  previewContent.value = "";
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const onFileChange = async (event) => {
  selectedFile.value = event.target.files[0];
  await uploadFile();
};

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const createFolder = async () => {
  if (newFolderName.value) {
    const userId = store.state.auth.userId;
    try {
      const response = await axios.post(
        `http://localhost:3000/create-folder/${userId}`,
        {
          name: newFolderName.value,
        }
      );
      console.log("Folder created successfully:", response.data);
      fetchFilesAndFolders(); // Reload files and folders after creating folder
      newFolderName.value = ""; // Reset folder name
      toggleModal(); // Close modal
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  }
};

const navigateToFolder = (folder) => {
  if (folder.type === "folder") {
    router.push({
      name: "FolderDetails",
      params: { folderId: folder.id, folderName: folder.name },
    });
  }
};

const cancelModal = () => {
  newFolderName.value = ""; // Reset folder name
  toggleModal(); // Close modal
};

const uploadFile = async () => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append("file", selectedFile.value);

    try {
      const response = await axios.post(
        `http://localhost:3000/upload/${store.state.auth.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      fetchFilesAndFolders(); // Reload files and folders after uploading
      selectedFile.value = null; // Reset selected file after upload
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const fetchFilesAndFolders = async () => {
  const userId = store.state.auth.userId;
  try {
    const [filesResponse, foldersResponse] = await Promise.all([
      axios.get(`http://localhost:3000/files/${userId}`),
      axios.get(`http://localhost:3000/folders/${userId}`),
    ]);
    filesAndFolders.value = [
      ...filesResponse.data.map((file) => ({ ...file, type: "file" })),
      ...foldersResponse.data.map((folder) => ({ ...folder, type: "folder" })),
    ];
  } catch (error) {
    console.error("Error fetching files and folders:", error);
  }
};

const deleteItem = async (itemId) => {
  try {
    const item = filesAndFolders.value.find((item) => item.id === itemId);
    if (item.type === "file") {
      await axios.delete(`http://localhost:3000/files/${itemId}`);
    } else if (item.type === "folder") {
      await axios.delete(`http://localhost:3000/folders/${itemId}`);
    }
    fetchFilesAndFolders(); // Reload files and folders after deletion
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

const downloadFile = async (fileId, fileName) => {
  try {
    const response = await axios.get(`http://localhost:3000/files/${fileId}`, {
      responseType: "blob", // Important: return data as blob
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // File name when downloading
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    fetchFilesAndFolders();
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

const startEditing = (item) => {
  editingFileId.value = item.id;
  newFileName.value = item.name;
};

const renameItem = async (itemId) => {
  if (newFileName.value) {
    try {
      const item = filesAndFolders.value.find((item) => item.id === itemId);
      if (item.type === "file") {
        await axios.put(`http://localhost:3000/files/${itemId}`, {
          name: newFileName.value,
        });
      } else if (item.type === "folder") {
        await axios.put(`http://localhost:3000/folders/${itemId}`, {
          name: newFileName.value,
        });
      }
      fetchFilesAndFolders(); // Reload files and folders after renaming
      editingFileId.value = null;
      newFileName.value = "";
    } catch (error) {
      console.error("Error renaming item:", error);
    }
  }
};

// Draggable setup
const onDragStart = (item) => {
  item.dragging = true;
};

const onDragEnd = (item) => {
  item.dragging = false;
};

const onDrop = async (targetFolder) => {
  const draggedItem = filesAndFolders.value.find((item) => item.dragging);
  if (draggedItem && targetFolder.type === "folder") {
    try {
      await axios.put("http://localhost:3000/move-file", {
        fileId: draggedItem.id,
        folderId: targetFolder.id,
      });
      // Xóa file khỏi bảng
      filesAndFolders.value = filesAndFolders.value.filter(
        (item) => item.id !== draggedItem.id
      );
      fetchFilesAndFolders(); // Reload files and folders after moving file
    } catch (error) {
      console.error("Error moving file:", error);
    }
  }
};

onMounted(fetchFilesAndFolders);
</script>
