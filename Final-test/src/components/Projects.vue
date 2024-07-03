<script setup>
import { ref, onMounted } from "vue";
import { GET_USER_TOKEN_GETTER } from "@/store/modules/storeconstans";
import { useStore } from "vuex";
import axiosInstance from "../service/AxiosTokenstance";
import { computed } from "vue";

// Define reactive variables
const posts = ref([]);
const store = useStore();
const modalC = ref(false);
const projects = ref([
  {
    title: "Projects 1",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 2",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 3",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 4",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 1",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 2",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 3",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 4",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 1",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 2",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 3",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 4",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 1",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 2",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 3",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 4",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 1",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 2",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 3",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 4",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 1",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 2",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 3",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
  {
    title: "Projects 4",
    details: [
      "- This is a project",
      "- This is a project",
      "- This is a project",
      "- This is a project",
    ],
  },
]);

const toggleModalC = () => {
  modalC.value = !modalC.value;
};

// Map getters
const token = computed(() => store.getters[GET_USER_TOKEN_GETTER]);

// Fetch posts on component mount
onMounted(() => {
  axiosInstance
    .get(`http://vue-completecourse.firebaseio.com/posts.json`)
    .then((response) => {
      formatPosts(response.data);
    });
  window.scrollTo(0, 0);
});

// Function to format posts
const formatPosts = (data) => {
  for (let key in data) {
    posts.value.push({ ...data[key], id: key });
  }
};
// Reactive state for selected navbar item
const selectedNavItem = ref("work-on");
// Check localStorage for previously selected item
if (localStorage.getItem("selectedNavItem")) {
  selectedNavItem.value = localStorage.getItem("selectedNavItem");
}

// Function to set the selected navbar item
const setSelectedNavItem = (item) => {
  selectedNavItem.value = item;
  localStorage.setItem("selectedNavItem", item);
};
</script>

<template>
  <div
    id="main-content"
    class="fixed w-[1280px] h-full overflow-y-auto bg-gray-50 ml-64"
  >
    <main>
      <div class="px-4 pt-2" style="height: 100vh">
        <div class="grid grid-rows-3 w-[1280px]">
          <div
            id="header"
            class="text-gray-600 text-2xl row-span-3 font-semibold mt-4"
          >
            Your Work
            <hr class="h-px my-4 bg-gray-200 border-0 dark:bg-gray-400" />
          </div>
          <div id="projects-card" class="text-gray-600 font-bs mb-4">
            <div class = "flex flex-row justify-between">
              <h5>Recent Projects</h5>
              <!-- Modal toggle -->
              <button
                class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg mb-3 text-sm px-5 py-2.5 text-center"
                @click="toggleModalC"
              >
                New Task
              </button>

              <!-- Main modal -->
              <div
                id="crud-modal"
                tabindex="-1"
                class="overflow-y-auto overflow-x-hidden absolute bg-gray-800  bg-opacity-10 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                v-if="modalC"
              >
                <div
                  class="relative p-4 w-full max-w-md max-h-full top-[15%] left-1/3"
                >
                  <!-- Modal content -->
                  <div class="relative bg-white rounded-lg shadow">
                    <!-- Modal header -->
                    <div
                      class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
                    >
                      <h3 class="text-lg font-semibold text-gray-900">
                        Create New Task
                      </h3>
                      <button
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        @click="toggleModalC"
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
                        <span class="sr-only">Close modal</span>
                      </button>
                    </div>
                    <!-- Modal body -->
                    <form class="p-4 md:p-5">
                      <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                          <label
                            for="name"
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Name</label
                          >
                          <input
                            type="text"
                            name="name"
                            id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Type task name"
                            required=""
                          />
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                          <label
                            for="price"
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Price</label
                          >
                          <input
                            type="number"
                            name="price"
                            id="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="$2999"
                            required=""
                          />
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                          <label
                            for="category"
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Category</label
                          >
                          <select
                            id="category"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                          >
                            <option selected="">Select category</option>
                            <option value="TV">TV/Monitors</option>
                            <option value="PC">PC</option>
                            <option value="GA">Gaming/Console</option>
                            <option value="PH">Phones</option>
                          </select>
                        </div>
                        <div class="col-span-2">
                          <label
                            for="description"
                            class="block mb-2 text-sm font-medium text-gray-900"
                            >Product Description</label
                          >
                          <textarea
                            id="description"
                            rows="4"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write product description here"
                          ></textarea>
                        </div>
                      </div>
                      <button
                        type="submit"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        <svg
                          class="me-1 -ms-1 w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Add new product
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-row gap-4 overflow-x-auto max-w-[1280px]">
              <a
                v-for="(project, index) in projects"
                :key="index"
                href="#"
                class="flex flex-col items-start px-4 py-1 h-[200px] w-80 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:border-gray-300"
              >
                <div class="flex flex-row w-[1280px]">
                  <h5
                    class="my-2 text-bs font-semibold tracking-tight text-gray-900"
                  >
                    {{ project.title }}
                  </h5>
                  <button
                    type="button"
                    class="bg-white rounded-md ml-48 p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span class="sr-only">Close menu</span>
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
                <div class="flex flex-col font-normal mx-3">
                  Detail:
                  <span
                    v-for="(detail, i) in project.details"
                    :key="i"
                    class="ml-3"
                    >{{ detail }}</span
                  >
                </div>
              </a>
            </div>
          </div>
          <div id="navbar" class="relative">
            <nav>
              <ul class="flex font-medium space-x-3 text-gray-600 relative">
                <li
                  class="w-16"
                  :class="{ 'text-blue-500': selectedNavItem === 'work-on' }"
                >
                  <a
                    href="#work-on"
                    @click.prevent="setSelectedNavItem('work-on')"
                    class="block relative pb-2"
                  >
                    Work on
                  </a>
                </li>
                <li :class="{ 'text-blue-500': selectedNavItem === 'signed' }">
                  <a
                    href="#signed"
                    @click.prevent="setSelectedNavItem('signed')"
                    class="block relative pb-2"
                  >
                    Signed
                  </a>
                </li>
                <li :class="{ 'text-blue-500': selectedNavItem === 'marked' }">
                  <a
                    href="#marked"
                    @click.prevent="setSelectedNavItem('marked')"
                    class="block relative pb-2"
                  >
                    Marked
                  </a>
                </li>
              </ul>
              <div
                id="nav-underline"
                class="absolute bottom-0 left-0 w-[1260px] h-0.5 bg-gray-300"
              >
                <span
                  class="block w-16 h-0.5 bg-blue-500"
                  :style="{
                    transform:
                      selectedNavItem === 'work-on'
                        ? 'translateX(0)'
                        : selectedNavItem === 'signed'
                        ? 'translateX(100%)'
                        : 'translateX(200%)',
                  }"
                ></span>
              </div>
            </nav>
          </div>
          <div
            class="w-[1265px] mt-2 px-4 overflow-x-hidden overflow-y-auto max-h-60 "
            v-if="selectedNavItem === 'work-on'"
          >
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
            <h5>In the last month</h5>
          </div>
          <div v-if="selectedNavItem === 'signed'">
            <h1>Heo</h1>
          </div>
          <div v-if="selectedNavItem === 'marked'">
            <h1>Bye</h1>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
