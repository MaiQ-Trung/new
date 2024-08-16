<template>
  <div class="w-full h-svh bg-gray-50 max-h-dvh overflow-y-auto">
    <div class="px-4 py-2">
      <div class="flex flex-col gap-2">
        <div class="w-full h-1/2 flex flex-row gap-4">
          <a
            href="/main/projects"
            class="flex flex-col w-[612px] max-w-[612px] min-w-60 overflow-auto resize h-72 max-h-[562px] min-h-48 items-start px-4 py-1 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:border-gray-300 mt-2"
          >
            <div class="flex flex-row justify-between w-full">
              <h5 class="my-2 text-bs font-semibold text-gray-900">
                Recent Projects
              </h5>
              <button
                type="button"
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex flex-col font-normal mx-3 w-full overflow-auto">
              <table class="w-full">
                <thead>
                  <tr
                    class="text-gray-800 text-sm font-roboto font-semibold grid grid-cols-3 px-4 py-2 border-b border-gray-500"
                  >
                    <td>Name</td>
                    <td class="ml-24">Created at</td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in recentProjects"
                    :key="item.id"
                    class="relative grid grid-cols-3 px-4 py-2 border-b border-gray-500 hover:bg-gray-300 duration-100 cursor-pointer"
                  >
                    <td class="py-2">
                      <span
                        class="text-gray-800 text-base font-roboto font-semibold"
                      >
                        {{ item.name }}
                      </span>
                    </td>
                    <td
                      class="py-2 ml-24 text-gray-800 text-base font-roboto font-semibold"
                    >
                      {{ new Date(item.created_at).toLocaleString() }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </a>
          <a
            href="/main/calendar"
            class="flex flex-col w-1/2 h-72 max-h-[562px] min-h-72 overflow-auto resize-y items-start px-4 pb-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:border-gray-300 mt-2"
          >
            <div class="flex flex-row justify-between w-full">
              <h5 class="my-2 text-bs font-semibold text-gray-900">Calendar</h5>
              <button
                type="button"
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="w-full">
              <FullCalendar :options="calendarOptions" />
            </div>
          </a>
        </div>
        <div class="w-full h-1/2 flex flex-row gap-4">
          <a
            href="/main/docs"
            class="flex flex-col w-[612px] max-w-[612px] min-w-[417px] overflow-auto resize h-[300px] max-h-[300px] min-h-48 items-start px-4 py-1 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:border-gray-300 mt-2"
          >
            <div class="flex flex-row justify-between w-full">
              <h5 class="my-2 text-bs font-semibold text-gray-900">Docs</h5>
              <button
                type="button"
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex w-full overflow-auto">
              <table class="w-full">
                <thead>
                  <tr
                    class="text-gray-800 text-base font-roboto font-semibold grid grid-cols-3 justify-start px-4 py-2 border-b border-gray-500"
                  >
                    <td>Name</td>
                    <td>Latest Change</td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in filesAndFolders"
                    :key="item.id"
                    class="relative grid grid-cols-3 px-4 py-2 border-b border-gray-500 hover:bg-gray-300 duration-100 cursor-pointer"
                  >
                    <td class="py-2">
                      <span
                        class="text-gray-800 text-sm font-roboto font-semibold"
                        >{{ item.name }}</span
                      >
                    </td>
                    <td
                      class="py-2 text-gray-800 text-sm font-roboto font-semibold"
                    >
                      {{ new Date(item.updated_at).toLocaleString() }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </a>
          <a
            href="/main/trash"
            class="flex flex-col w-[612px] max-w-[612px] min-w-[428px] overflow-auto resize h-[300px] max-h-[300px] min-h-48 items-start px-4 py-1 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:border-gray-300 mt-2"
          >
            <div class="flex flex-row justify-between w-full">
              <h5 class="my-2 text-bs font-semibold text-gray-900">Trash</h5>
              <button
                type="button"
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex w-full overflow-auto">
              <table class="w-full">
                <thead>
                  <tr
                    class="text-gray-800 text-base font-roboto font-semibold grid grid-cols-3 px-4 py-2 border-b border-gray-500"
                  >
                    <td>Name</td>
                    <td class="ml-24">Deleted at</td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in DeletedFiles"
                    :key="item.id"
                    class="relative grid grid-cols-3 px-4 py-2 border-b border-gray-500 hover:bg-gray-300 duration-100 cursor-pointer"
                  >
                    <td class="py-2">
                      <span
                        class="text-gray-800 text-base font-roboto font-semibold"
                      >
                        {{ item.name }}
                      </span>
                    </td>
                    <td
                      class="py-2 ml-24 text-gray-800 text-base font-roboto font-semibold"
                    >
                      {{ new Date(item.deleted_at).toLocaleString() }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

const store = useStore();
const recentProjects = ref([]);
const calendarEvents = ref([]);
const filesAndFolders = ref([]);
const DeletedFiles = ref([]);

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    left: "title",
    center: "",
    right: "today prev,next",
  },
  events: calendarEvents.value,
});


const fetchData = async () => {
  try {
    const userId = store.state.auth.userId;
    const [projectsRes] = await Promise.all([
      axios.get(`http://localhost:3000/main/projects/${userId}`),
    ]);
    recentProjects.value = projectsRes.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchDeletedFile = async () => {
  try {
    const userId = store.state.auth.userId;
    const response = await axios.get(`http://localhost:3000/trash/${userId}`);
    DeletedFiles.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchProjects = async () => {
  const userId = store.state.auth.userId;
  try {
    const response = await axios.get(
      `http://localhost:3000/main/projects/${userId}`
    );
    calendarEvents.value = response.data.map((project) => ({
      id: project.id,
      title: project.name,
      start: project.start_date,
      end: project.end_date,
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

const fetchFilesAndFolders = async () => {
  try {
    const userId = store.state.auth.userId;
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

watch(
  calendarEvents,
  (newEvents) => {
    calendarOptions.events = newEvents;
  },
  { immediate: true }
);
onMounted(() => {
  fetchData();
  fetchProjects();
  fetchDeletedFile();
  fetchFilesAndFolders();
});
</script>

<style>
.fc-scroller.fc-scroller-liquid-absolute {
  overflow: hidden !important;
}
</style>
