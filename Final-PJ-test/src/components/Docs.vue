<template>
  <div class="relative w-[1280px] overflow-y-auto bg-gray-50">
    <div class="container p-5 w-full h-full">
      <h2 class="text-2xl font-bold mb-5">Upload File</h2>
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded relative z-10"
        @click="toggleMenu"
        aria-haspopup="true"
        :aria-expanded="showMenu"
      >
        New
      </button>
      <div
        v-if="showMenu"
        class="absolute left-0 p-0 -mt-9 ml-[110px] w-40 bg-white border z-100 border-gray-200 rounded shadow-lg transition-transform duration-300 ease-in-out"
      >
        <button
          class="block w-full text-left px-4 py-2 text-sm hover:bg-blue-100 transition-all duration-300 ease-in-out"
          @click="toggleModal('file')"
        >
          File
        </button>
        <hr />
        <button
          class="block w-full text-left px-4 py-2 text-sm hover:bg-blue-100 transition-all duration-300 ease-in-out"
          @click="toggleModal('folder')"
        >
          Folder
        </button>
        <hr />
        <input ref="fileInput" hidden type="file" @change="onFileChange" />
        <button
          @click="() => $refs.fileInput.click()"
          class="block w-full text-left px-4 py-2 text-sm hover:bg-blue-100 transition-all duration-300 ease-in-out"
        >
          Upload
        </button>
      </div>

      <div
        class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        v-if="showModal"
        aria-modal="true"
        role="dialog"
      >
        <div
          class="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow"
        >
          <!-- Modal content -->
          <div>
            <!-- Modal header -->
            <div
              class="flex items-center justify-between px-4 pt-4 border-b rounded-t"
            >
              <h3 class="text-xl font-semibold text-gray-900">
                Create {{ modalType === "file" ? "File" : "Folder" }}
              </h3>
              <button
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                @click="toggleModal"
                aria-label="Close modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <!-- Modal body -->
            <div class="mt-3">
              <label class="ml-9 text-sm font-medium text-gray-900">
                {{
                  modalType === "file" ? "Your File Name" : "Your Folder Name"
                }}
              </label>
              <input
                type="text"
                v-model="newFolderName"
                class="bg-gray-50 border ml-12 border-gray-300 text-gray-900 text-sm rounded-lg block w-10/12 p-2.5"
                :placeholder="
                  modalType === 'file' ? 'File Name...' : 'Folder Name...'
                "
              />
            </div>
            <!-- Modal footer -->
            <div class="p-4 md:p-5 ml-96 border-gray-200 rounded-b">
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                @click="createItem"
              >
                Create
              </button>
              <button
                type="button"
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                @click="toggleModal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="mt-5" v-if="!currentFolder">
        <table class="w-[1230px]">
          <thead>
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Latest Change</th>
              <th class="px-4 py-2">Uploader</th>
            </tr>
          </thead>
          <tbody v-for="(file, index) in uploadedFiles" :key="index">
            <tr
              v-if="!file.parent"
              draggable="true"
              @dragstart="startDrag($event, file, index)"
              @dragover.prevent
              @dragenter.prevent="dragOverItem = index"
              @dragleave="dragOverItem = null"
              @drop="onDrop($event, index)"
              :class="{ 'bg-gray-200': dragOverItem === index }"
              @dblclick="navigateIntoFolder(file)"
            >
              <td class="border-y border-black cursor-pointer">
                <i :class="`fas ${getFileIcon(file.type)} mr-2`"></i>
                {{ file.name }}
              </td>
              <td class="border-y border-black">{{ file.latestChange }}</td>
              <td class="border-y border-black">{{ file.uploader }}</td>
              <td class="border-y border-black py-3">
                <button @click="downloadFile(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    fill="currentColor"
                    class="bg-slate-50 w-9 h-9 p-2 rounded-xl hover:bg-slate-300 transition-all duration-300 ease-in-out"
                  >
                    <path
                      d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    />
                  </svg>
                </button>
                <button id="delete" @click="deleteFile(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                    class="bg-slate-50 w-9 h-9 p-2 rounded-xl hover:bg-slate-300 transition-all duration-300 ease-in-out"
                  >
                    <path
                      d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                    />
                  </svg>
                </button>
                <button id="delete" @click="changeFileName(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    class="bg-slate-50 w-9 h-9 p-2 rounded-xl hover:bg-slate-300 transition-all duration-300 ease-in-out"
                  >
                    <path
                      d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          v-if="showEditModal"
          aria-modal="true"
          role="dialog"
        >
          <div
            class="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow overflow-y-auto"
          >
            <div>
              <!-- Modal header -->
              <div
                class="flex items-center justify-between px-4 pt-4 border-b rounded-t"
              >
                <h3 class="text-xl font-semibold text-gray-900">
                  Edit {{ isEditable === "word" ? "Word" : "Text" }} File
                </h3>
                <button
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  @click="toggleEditModal"
                  aria-label="Close modal"
                >
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              <!-- Modal body -->
              <div class="mt-3">
                <textarea
                  v-model="editingFileContent"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-4"
                  rows="10"
                ></textarea>
              </div>
              <!-- Modal footer -->
              <div class="p-4 md:p-5">
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  @click="saveFileContent"
                >
                  Save
                </button>
                <button
                  type="button"
                  class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  @click="toggleEditModal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- Hiển thị tên thư mục hiện tại và button quay lại -->
        <div class="flex items-center mb-3">
          <button
            @click="backToParentFolder"
            class="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
          <h2 class="text-2xl font-bold ml-5">{{ currentFolder.name }}</h2>
        </div>
        <!-- Table cho folder con -->
        <table class="w-[1230px]">
          <thead>
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Latest Change</th>
              <th class="px-4 py-2">Uploader</th>
            </tr>
          </thead>
          <tbody v-for="(file, index) in currentFolder.folder" :key="index">
            <tr
              draggable="true"
              @dragstart="startDrag($event, file, index)"
              @dragover.prevent
              @dragenter.prevent="dragOverItem = index"
              @dragleave="dragOverItem = null"
              @drop="onDrop($event, index)"
              :class="{ 'bg-gray-200': dragOverItem === index }"
            >
              <td class="border-y border-black cursor-pointer">
                <i :class="`fas ${getFileIcon(file.type)} mr-2`"></i>
                {{ file.name }}
              </td>
              <td class="border-y border-black">{{ file.latestChange }}</td>
              <td class="border-y border-black">{{ file.uploader }}</td>
              <td class="border-y border-black py-3">
                <button @click="downloadFile(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    fill="currentColor"
                    class="bg-slate-50 w-9 h-9 p-2 rounded-xl hover:bg-slate-300 transition-all duration-300 ease-in-out"
                  >
                    <path
                      d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    />
                  </svg>
                </button>
                <button id="delete" @click="deleteFile(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                    class="bg-slate-50 w-9 h-9 p-2 rounded-xl hover:bg-slate-300 transition-all duration-300 ease-in-out"
                  >
                    <path
                      d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                    />
                  </svg>
                </button>
                <button id="delete" @click="changeFileName(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    class="bg-slate-50 w-9 h-9 p-2 rounded-xl hover:bg-slate-300 transition-all duration-300 ease-in-out"
                  >
                    <path
                      d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
                    />
                  </svg>
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
import { useStore } from "vuex";
import "@fortawesome/fontawesome-free/css/all.css";

const store = useStore();
const editingFileIndex = ref(-1);
const editingFileContent = ref("");
const showMenu = ref(false);
const showModal = ref(false);
const modalType = ref("");
const newFolderName = ref("");
const files = ref([]);
const uploadedFiles = ref([]);
const currentFolder = ref(null);
const showEditModal = ref(false);
const dragOverItem = ref(null);
let dragStartIndex = null;

const navigateIntoFolder = (folder) => {
  if (folder.type === "folder" && Array.isArray(folder.folder)) {
    currentFolder.value = folder;
  }
};

const backToParentFolder = () => {
  currentFolder.value = null;
};

const startDrag = (event, file, index) => {
  dragStartIndex = index;
  console.log("Drag start:", file);
};

const onDrop = (event, index) => {
  if (dragStartIndex !== null && index !== null) {
    const draggedItem = uploadedFiles.value[dragStartIndex];
    const targetFolder = uploadedFiles.value[index];

    if (draggedItem.type === "folder") {
      return; // Prevent dropping the folder onto itself
    }
    // Ensure the target is a folder and has a 'folder' array
    if (targetFolder.type === "folder" && Array.isArray(targetFolder.folder)) {
      // Add the dragged item to the folder's 'folder' array
      targetFolder.folder.push(draggedItem);
      // Remove the dragged item from its original position
      uploadedFiles.value.splice(dragStartIndex, 1);
    }

    dragStartIndex = null;
    dragOverItem.value = null;

    // Update local storage after modification
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles.value));
  }
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const toggleModal = (type) => {
  modalType.value = type;
  showModal.value = !showModal.value;
  showMenu.value = false;
};

const onFileChange = (event) => {
  files.value = Array.from(event.target.files);
  uploadFiles();
};

const isEditable = (file) => {
  return (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.type === "text/plain"
  );
};

const toggleEditModal = (index) => {
  if (uploadedFiles.value[index]) {
    editingFileIndex.value = index;
    editingFileContent.value = uploadedFiles.value[index].content || "";
  }
  showEditModal.value = !showEditModal.value;
};

const saveFileContent = () => {
  const index = editingFileIndex.value;
  if (index !== -1 && uploadedFiles.value[index]) {
    uploadedFiles.value[index].content = editingFileContent.value;
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles.value));
    showEditModal.value = false;
  }
  toggleEditModal();
};

const uploadFiles = () => {
  const currentTime = new Date().toLocaleString();
  files.value.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileDetails = {
        name: file.name,
        latestChange: currentTime,
        uploader: store.state.auth.email,
        content: e.target.result,
        type: file.type,
      };
      uploadedFiles.value.push(fileDetails);
      localStorage.setItem(
        "uploadedFiles",
        JSON.stringify(uploadedFiles.value)
      );
      console.log(fileDetails);
    };
    reader.readAsDataURL(file);
  });
  files.value = [];
};

const createItem = () => {
  const currentTime = new Date().toLocaleString();
  if (!newFolderName.value.trim()) {
    alert("Name cannot be empty.");
    return;
  }

  let itemType;
  let itemDetails;

  if (modalType.value === "file") {
    itemType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    itemDetails = {
      name: newFolderName.value,
      latestChange: currentTime,
      uploader: store.state.auth.email,
      type: itemType,
    };
  } else {
    itemType = "folder";
    itemDetails = {
      name: newFolderName.value,
      latestChange: currentTime,
      uploader: store.state.auth.email,
      type: itemType,
      folder: [],
    };
  }

  try {
    uploadedFiles.value.push(itemDetails);
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles.value));
    newFolderName.value = "";
    showModal.value = false;
  } catch (error) {
    console.error("Failed to create item:", error);
    alert("An error occurred while creating the item. Please try again.");
  }
  console.log(itemDetails);
};

const deleteFile = (index) => {
  uploadedFiles.value.splice(index, 1);
  localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles.value));
};
const changeFileName = (index) => {
  const newName = prompt("Enter the new name for the file/folder:");
  if (newName && newName.trim()) {
    uploadedFiles.value[index].name = newName.trim();
    uploadedFiles.value[index].latestChange = new Date().toLocaleString(); // Cập nhật latestChange khi thay đổi tên
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles.value));
  }
};

const downloadFile = (index) => {
  const file = uploadedFiles.value[index];
  const link = document.createElement("a");
  link.href = file.content;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  uploadedFiles.value[index].latestChange = new Date().toLocaleString();
  localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles.value));
};

const getFileIcon = (fileType) => {
  switch (fileType) {
    case fileType.startsWith("image/png"):
      return "fa-file-image";
    case fileType.startsWith("video/"):
      return "fa-file-video";
    case fileType.startsWith("audio/"):
      return "fa-file-audio";
    case "application/pdf":
      return "fa-file-pdf";
    case "application/zip":
    case "application/x-rar-compressed":
      return "fa-file-archive";
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return "fa-file-text";
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return "fa-file-excel";
    case "application/vnd.ms-powerpoint":
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return "fa-file-powerpoint";
    case "text/html":
    case "text/css":
    case "application/javascript":
    case "text/javascript":
    case "application/json":
    case "application/x-vue":
    case "application/vnd.angular":
    case "application/x-react":
    case "application/nodejs":
      return "fa-file-code";
    case "folder":
      return "fa-folder";
    default:
      return "fa-file";
  }
};

onMounted(() => {
  const storedFiles = localStorage.getItem("uploadedFiles");
  if (storedFiles) {
    uploadedFiles.value = JSON.parse(storedFiles);
  }
});
</script>

<style scoped>
[aria-expanded="true"] .submenu {
  transform: scaleY(1);
  transform-origin: top;
}

[aria-expanded="false"] .submenu {
  transform: scaleY(0);
  transform-origin: top;
}

.drag-over {
  background-color: #f0f0f0;
}
</style>
