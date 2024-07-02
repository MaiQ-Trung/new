<script setup>
import { ref, onMounted } from "vue";
import { GET_USER_TOKEN_GETTER } from "@/store/modules/storeconstans";
import { useStore } from "vuex";
import axiosInstance from "../service/AxiosTokenstance";
import { computed } from "vue";

// Define reactive variables
const posts = ref([]);
const store = useStore();
const showSideBar = ref(false);
const selectedItem = ref(null);
const dropdownDots = ref(false);

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
</script>

<template>
  <div
    id="main-content"
    class="relative w-[1280px] h-full overflow-y-auto bg-gray-50 ml-64"
  >
    <main>
      <div class="px-4 pt-2" style="height: 100vh">
        <div class="grid w-full grid-cols-2 gap-4">
          <a
            href="#"
            class="flex flex-col items-start px-4 py-1 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:border-gray-300 mt-2"
          >
            <div class="flex flex-row justify-between w-full">
              <h5
                class="my-2 text-bs font-semibold tracking-tight text-gray-900"
              >
                Recent Projects
              </h5>
              <button
                type="button"
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span class="sr-only">Close menu</span>
                <!-- Heroicon name: outline/x -->
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
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
            </div>
          </a>
        
          <a
            href="#"
            class="flex flex-col items-start px-4 py-1 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:border-gray-300 mt-2"
          >
            <div class="flex flex-row justify-between w-full">
              <h5
                class="my-2 text-bs font-semibold tracking-tight text-gray-900"
              >
                Agenda
              </h5>
              <button
                type="button"
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span class="sr-only">Close menu</span>
                <!-- Heroicon name: outline/x -->
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
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
            </div>
          </a>

          <a
            href="#"
            class="flex flex-col items-start px-4 py-1 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:border-gray-300 mt-2"
          >
            <div class="flex flex-row justify-between w-full">
              <h5
                class="my-2 text-bs font-semibold tracking-tight text-gray-900"
              >
                Docs
              </h5>
              <button
                type="button"
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span class="sr-only">Close menu</span>
                <!-- Heroicon name: outline/x -->
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
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
            </div>
          </a>

          <a
            href="#"
            class="flex flex-col items-start px-4 py-1 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:border-gray-300 mt-2"
          >
            <div class="flex flex-row justify-between w-full">
              <h5
                class="my-2 text-bs font-semibold tracking-tight text-gray-900"
              >
                Trash
              </h5>
              <button
                type="button"
                class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span class="sr-only">Close menu</span>
                <!-- Heroicon name: outline/x -->
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
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
              <span class="ml-3">- This is a project</span>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>
