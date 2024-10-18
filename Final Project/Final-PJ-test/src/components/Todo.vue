<template>
  <div class="flex relative" @click="showMenu = false">
    <div class="flex flex-col justify-center py-5">
      <h3
        v-if="selectedNavItem === 'List'"
        class="font-semibold font-roboto text-xl ml-5"
      >
        {{ projects.name }}
      </h3>
      <input
        type="text"
        v-model="search"
        v-if="selectedNavItem === 'List'"
        placeholder="Search task name"
        class="border border-gray-300 rounded-md p-2 mt-2 w-1/4 mb-5 ml-5"
      />
      <h3 v-else class="font-semibold font-roboto text-3xl mt-5 ml-5 mb-2">
        {{ projects.name }}
      </h3>
      <div id="navbar" class="relative">
        <nav class="px-4">
          <div class="flex flex-row justify-between">
            <ul class="flex font-medium text-gray-600">
              <li
                class="w-16"
                :class="{ 'text-blue-500': selectedNavItem === 'List' }"
              >
                <a
                  href="#List"
                  @click.prevent="setSelectedNavItem('List')"
                  class="block pb-2"
                >
                  Tasks
                </a>
              </li>
              <li :class="{ 'text-blue-500': selectedNavItem === 'Docs' }">
                <a
                  href="#Docs"
                  @click.prevent="setSelectedNavItem('Docs')"
                  class="block pb-2"
                >
                  Files
                </a>
              </li>
            </ul>
          </div>
          <div
            id="nav-underline"
            class="absolute bottom-0 left-0 w-svw h-0.5 bg-gray-300"
          >
            <span
              class="block w-16 h-0.5 bg-blue-500 transition-transform duration-300"
              :style="{
                transform:
                  selectedNavItem === 'List'
                    ? 'translateX(0%)'
                    : selectedNavItem === 'Docs'
                    ? 'translateX(100%)'
                    : 'translateX(200%)',
              }"
            ></span>
          </div>
        </nav>
      </div>
      <div
        class="kanban-board mt-5 ml-5 flex flex-wrap gap-5 w-full max-w-7xl"
        v-if="selectedNavItem === 'List'"
      >
        <div
          v-for="(list, index) in filteredLists"
          :key="index"
          :class="[
            'kanban-column rounded-md p-3 flex-1 min-w-80 max-w-80',
            getColumnClass(list.title),
          ]"
        >
          <div
            class="kanban-column-header [text-shadow:_0_2px_0_rgb(0_0_0_/_10%)] text-white font-semibold flex justify-between mb-3"
          >
            <h2>{{ list.title }}</h2>
            <button @click="addNewItem(index)">Add New Task</button>
          </div>
          <vue-draggable
            :list="list.items"
            group="items"
            item-key="id"
            class="kanban-column-items h-[340px] max-h-[340px] overflow-y-auto scrollbar-none"
            @end="handleDrop(index)"
          >
            <template #item="{ element }">
              <div
                class="bg-white text-black border-gray-300 border rounded-md p-2 mb-3 min-h-20 cursor-pointer hover:shadow-md hover:bg-gray-200 transition-color duration-200 relative"
                @mousemove="element.showDelete = true"
                @mouseleave="element.showDelete = false"
              >
                {{ element.name }}
                <button
                  v-show="element.showDelete"
                  @click="deleteItem(element, index)"
                  class="absolute top-2 right-2 p-2 rounded-lg ease-in-out transition-all hover:bg-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="14"
                    width="10.5"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
                    />
                  </svg>
                </button>
              </div>
            </template>
          </vue-draggable>
          <div
            class="new-item flex justify-between mt-3 focus:outline-sky-600 focus:border-sky-600 focus:rounded-md"
            v-if="newItem && newItemList === index"
          >
            <input
              type="text"
              class="flex-1 mr-3"
              v-model="newItemText"
              @keyup.enter="addItemToList(index)"
            />
            <button @click="addItemToList(index)">Add</button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="file-container flex flex-wrap absolute top-32"
      v-if="selectedNavItem === 'Docs'"
    >
      <!-- previewFiles name-->
      <div v-if="previewFile">
        <h2 class="text-xl p-2 text-gray-800 font-semibold font-roboto">
          {{ previewFile.name }}
        </h2>
      </div>
      <div v-else>
        <h2 class="text-lg p-2 text-gray-800 font-semibold font-roboto">
          Files attached
        </h2>
      </div>
      <hr class="w-svw h-0.5 bg-gray-300" />
      <div class="flex flex-row w-full">
        <!-- Side bar -->
        <div class="file-sidebar w-56 py-2 h-svh border-r-2 border-gray-300">
          <div class="button flex justify-end px-2 pb-2">
            <input
              type="text"
              v-model="atsearch"
              placeholder="Search file"
              class="w-full p-2 border border-gray-300 rounded-2xl focus:outline-none"
            />
            <button
              @click.stop="toggleSearch"
              class="text-gray-500 inline-flex items-center rounded-lg text-xl px-2.5 py-2.5 text-center"
            >
              <i class="pi pi-search" />
            </button>
            <button
              @click.stop="toggleMenu"
              class="text-gray-500 inline-flex items-center hover:bg-gray-300 rounded-lg text-xl px-2.5 py-2.5 text-center"
            >
              <i class="pi pi-file-plus" />
            </button>
            <!-- Menu Files to attach -->
            <div
              v-if="showMenu"
              class="absolute left-52 top-20 z-50 bg-white border border-gray-200 shadow-lg w-52 min-h-24 p-2 flex flex-col rounded-lg"
            >
              <!-- Select file to attach -->
              <button
                @click="attachFiles(file)"
                v-if="files.length > 0"
                v-for="file in files"
                :key="file.id"
                class="w-full p-2 rounded-lg text-start hover:bg-gray-300"
              >
                {{ file.name }}
              </button>
              <div
                v-else
                class="flex w-full text-lg text-gray-700 font-semibold underline p-2 rounded-lg justify-center mt-4"
              >
                No file to attach.
              </div>
            </div>
          </div>
          <hr class="h-0.5 w-full bg-gray-300" />
          <ul class="px-0.5 py-1">
            <li
              v-for="file in filteredAttachFiles"
              v-if="attachfiles.length > 0"
              :key="file.id"
              class="flex items-center text-gray-800 font-medium justify-between px-2 cursor-pointer rounded-lg animate-dropdown group"
              @click="displayFileDetails(file)"
            >
              <span>
                <i :class="getFileIcon(file.name)" class="mr-2 text-lg"></i>
                {{ file.name }}
              </span>
              <button
                class="flex items-center justify-center rounded-lg hover:bg-slate-300 duration-200 w-10 h-10 opacity-0 group-hover:opacity-100"
                @click.stop="removeAttachedFile(file)"
              >
                <i class="pi pi-times" />
              </button>
            </li>
            <div
              v-else
              class="flex w-full text-lg text-gray-700 font-semibold underline p-2 rounded-lg justify-center mt-36"
            >
              No file attached.
            </div>
          </ul>
        </div>
        <!-- Files details -->
        <div class="bg-gray-100 shadow-inner shadow-slate-300 w-[1100px] h-svh">
          <div class="file-details">
            <div class="file-preview p-5 h-svh">
              <div v-if="previewFile">
                <div
                  class="bg-white w-[1030px] h-[430px] border-2 border-gray-200 rounded-lg"
                >
                  <div v-if="previewFile.type === 'text'">
                    <pre
                      class="text-gray-800 p-5 flex overflow-auto w-[1030px] max-w-[1020px] h-[420px]"
                      >{{ previewContent }}</pre
                    >
                  </div>
                  <div
                    v-else-if="previewFile.type === 'image'"
                    class="flex justify-center p-5"
                  >
                    <img
                      :src="previewContent"
                      alt="file preview"
                      class="w-[600px] h-[380px] rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import VueDraggable from "vuedraggable";
import { useRoute } from "vue-router";
import "primeicons/primeicons.css";

const store = useStore();
const route = useRoute();
const files = ref([]);
const attachfiles = ref([]);
const showMenu = ref(false);
const selectedFileId = ref(null);


const lists = ref([
  { title: "To Do", items: [] },
  { title: "In Progress", items: [] },
  { title: "Done", items: [] },
]);

let highestId = ref(0);
let newItem = ref(false);
let newItemList = ref(null);
let newItemText = ref("");
const search = ref("");
const atsearch = ref("");
const selectedNavItem = ref("List");
const previewContent = ref("");
const previewFile = ref(null);
const projects = ref([]);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const getColumnClass = (title) => {
  switch (title.toLowerCase()) {
    case "to do":
      return "bg-gradient-to-br from-gray-200 to-gray-500";
    case "in progress":
      return "bg-gradient-to-br from-sky-200 to-blue-500";
    case "done":
      return "bg-gradient-to-br from-teal-200 to-emerald-500";
    default:
      return "bg-gray-100";
  }
};

const filteredLists = computed(() => {
  if (!search.value) return lists.value;

  return lists.value.map((list) => ({
    ...list,
    items: list.items.filter((item) =>
      item.name.toLowerCase().includes(search.value.toLowerCase())
    ),
  }));
});

const fetchFiles = async () => {
  const userId = store.state.auth.userId;
  try {
    const query = await axios.get(`http://localhost:3000/all-files/${userId}`);
    if (query.data.length === 0) {
      console.log("Files", query.data);
    }
    files.value = query.data;
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};

const fetchProjectsDetails = async () => {
  const projectId = route.params.projectId;
  try {
    const response = await axios.get(
      `http://localhost:3000/projects/${projectId}`
    );
    projects.value = response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

// Api để add file vào project theo id của file được chọn
const attachFiles = async (file) => {
  const projectId = route.params.projectId;
  selectedFileId.value = file.id;
  try {
    await axios.put(
      `http://localhost:3000/add-files/${selectedFileId.value}/${projectId}`
    );
    fetchAttachedFiles();
  } catch (error) {
    console.error("Error attaching file:", error);
  }
};

// Hàm để lọc file trong attachfiles khi search
const filteredAttachFiles = computed(() => {
  if (!atsearch.value) return attachfiles.value;

  return attachfiles.value.filter((file) =>
    file.name.toLowerCase().includes(atsearch.value.toLowerCase())
  );
});

const fetchAttachedFiles = async () => {
  const userId = store.state.auth.userId;
  const projectId = route.params.projectId;
  try {
    const query = await axios.get(
      `http://localhost:3000/files/${userId}/${projectId}`
    );
    attachfiles.value = query.data;
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};

//api to remove attached file by project id
const removeAttachedFile = async (file) => {
  try {
    await axios.put(`http://localhost:3000/remove-file/${file.id}`);
    fetchAttachedFiles();
  } catch (error) {
    console.error("Error removing file:", error);
  }
};

const fetchData = async () => {
  const projectId = route.params.projectId;
  try {
    const { data } = await axios.get(`http://localhost:3000/todo/${projectId}`);
    const { todo = [], inprogress = [], done = [] } = data;

    // Merge all items into a single array
    const allItems = [].concat(todo, inprogress, done);

    // Restore order based on order_index from DB
    lists.value.forEach((list) => {
      list.items = allItems
        .filter((item) => item.status === list.title.toLowerCase())
        .sort((a, b) => a.order_index - b.order_index);
    });
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

const updateItemStatusAndOrder = async () => {
  const updatePromises = [];

  lists.value.forEach((list) => {
    list.items.forEach((item, index) => {
      if (
        item.status !== list.title.toLowerCase() ||
        item.order_index !== index
      ) {
        item.status = list.title.toLowerCase();
        item.order_index = index;

        // Add update promise to the array
        updatePromises.push(
          axios.put(`http://localhost:3000/update-task`, item)
        );
      }
    });
  });

  // Wait for all updates to complete
  await Promise.all(updatePromises);
};

const handleDrop = async () => {
  await updateItemStatusAndOrder();
};

const addNewItem = (listIndex) => {
  newItem.value = true;
  newItemList.value = listIndex;
  newItemText.value = "";
};

//api để add thêm task
const addItemToList = async (listIndex) => {
  if (newItemText.value.trim()) {
    const newItemObj = {
      id: highestId.value + 1,
      name: newItemText.value.trim(),
      status: lists.value[listIndex].title.toLowerCase(),
      project_id: route.params.projectId,
    };
    try {
      await axios.post("http://localhost:3000/add-task", newItemObj);
      highestId.value = newItemObj.id;
      lists.value[listIndex].items.push(newItemObj);
      newItemText.value = "";
      fetchData();
    } catch (error) {
      console.error("Error adding item:", error);
    }
    newItem.value = false;
    newItemList.value = null;
  }
};

// Delete task from list and database
const deleteItem = async (item, listIndex) => {
  try {
    await axios.delete(`http://localhost:3000/delete-task/${item.id}`);
    lists.value[listIndex].items = lists.value[listIndex].items.filter(
      (i) => i.id !== item.id
    );
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

// Function to display file details
const displayFileDetails = async (file) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/file/${file.id}/preview`,
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
      id: file.id,
      type: contentType.includes("text")
        ? "text"
        : contentType.includes("image")
        ? "image"
        : "other",
      name: file.name,
    };
  } catch (error) {
    console.error("Error fetching file details:", error);
  }
};

const getFileIcon = (fileName) => {
  const extension = fileName.split(".").pop().toLowerCase();
  switch (extension) {
    case "pdf":
      return "pi pi-file-pdf";
    case "doc":
    case "docx":
      return "pi pi-file-word";
    case "xls":
    case "xlsx":
      return "pi pi-file-excel";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
    case "webp":
    case "gif":
      return "pi pi-image";
    case "zip":
    case "rar":
      return "pi pi-server";
    case "txt":
      return "pi pi-file";
    case "mp4":
    case "avi":
    case "mkv":
      return "pi pi-video";
    default:
      return "pi pi-folder";
  }
};

// Function to set the selected navbar item
const setSelectedNavItem = (item) => {
  selectedNavItem.value = item;
};

onMounted(() => {
  fetchData();
  fetchFiles();
  fetchProjectsDetails();
  fetchAttachedFiles();
});
</script>
