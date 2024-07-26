<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

const router = useRouter();
const modalC = ref(false);
const projects = ref([]);
const store = useStore();
const projectTaskCounts = ref({});
const loading = ref(true);
const markedProjects = ref([]);
const searchTerm = ref("");

// Function to handle project item click and navigate to todo list
const handleProjectitemClick = (projectId) => {
  router.push({ name: "todoList", params: { projectId } });
};

// Fetch dữ liệu số lượng task chia theo status của project theo endpoint /projects/:projectId/tasks
const fetchProjectTaskCounts = async () => {
  for (const project of projects.value) {
    const projectId = project.id;
    try {
      const response = await axios.get(
        `http://localhost:3000/projects/${projectId}/tasks`
      );
      const tasks = response.data;

      // Nếu data là object với các status, chuyển đổi thành mảng
      if (Array.isArray(tasks)) {
        projectTaskCounts.value[projectId] = tasks.length
          ? tasks
          : [
              { status: "Todo", count: 0 },
              { status: "In progress", count: 0 },
              { status: "Done", count: 0 },
            ];
      } else {
        // Chuyển đổi nếu tasks là object với các key là status
        projectTaskCounts.value[projectId] = [
          { status: "Todo", count: tasks["Todo"] || 0 },
          { status: "In progress", count: tasks["In progress"] || 0 },
          { status: "Done", count: tasks["Done"] || 0 },
        ];
      }
    } catch (error) {
      console.error("Error fetching project task counts:", error);
      projectTaskCounts.value[projectId] = [
        { status: "Todo", count: 0 },
        { status: "In progress", count: 0 },
        { status: "Done", count: 0 },
      ];
    }
  }
  loading.value = false;
};

// Fetch dữ liệu từ backend
const fetchProjects = async () => {
  const userId = store.state.auth.userId;
  try {
    const response = await axios.get(
      `http://localhost:3000/main/projects/${userId}`
    );
    projects.value = response.data;
    await fetchProjectTaskCounts();
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

const toggleModalC = () => {
  modalC.value = !modalC.value;
};
const filteredProjects = computed(() => {
  return projects.value.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const filteredMarkedProjects = computed(() => {
  return markedProjects.value.filter((markedProject) =>
    markedProject.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
// Function to add new project
const addproject = async () => {
  const name = document.getElementById("name").value;
  const userId = store.state.auth.userId;
  console.log("Project added successfully", userId);
  try {
    await axios.post(
      "http://localhost:3000/add-project",
      { name },
      {
        headers: {
          user_id: userId,
        },
      }
    );
    toggleModalC();
    // console.log("Project added successfully", userId);
  } catch (error) {
    console.error("Error adding project:", error);
  }
};

// Function to delete project
const deleteProject = async (projectId) => {
  try {
    await axios.delete(`http://localhost:3000/delete-project/${projectId}`);
    fetchProjects();
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};

// Call api để get data từ bảng marked_projects
const fetchMarkedProject = async () => {
  try {
    const response = await axios.get("http://localhost:3000/markedProject");
    markedProjects.value = response.data;
  } catch (error) {
    console.error("Error fetching marked:", error);
  }
};

// Call api để mark project
const markProject = async (project) => {
  console.log("Marking project:", project.id); // Add logging here
  try {
    await axios.post("http://localhost:3000/mark-project", {
      id: project.id,
      name: project.name,
    });
    await fetchMarkedProject();
  } catch (error) {
    console.error("Error marking project:", error);
  }
};

const unmarkProject = async (id) => {
  if (!id) {
    console.error("Project ID is required");
    return;
  }

  try {
    await axios.delete("http://localhost:3000/unmark-project", {
      data: { id }, // Gửi dữ liệu id trong phần data
    });
    await fetchMarkedProject(); // Refresh the marked projects list
  } catch (error) {
    console.error("Error unmarking project:", error);
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

onMounted(() => {
  fetchProjects();
  fetchMarkedProject();
});
</script>
<template>
  <div
    id="main-content"
    class="flex flex-wrap max-w-full max-h-full bg-gray-50"
  >
    <main>
      <div class="px-4 pt-2">
        <div class="grid grid-rows-2 w-[1260px]">
          <div
            id="header"
            class="text-gray-600 text-2xl row-span-3 font-semibold mt-4 h-20"
          >
            Your Work
            <hr class="h-px my-4 bg-gray-400 border-0" />
          </div>
          <div id="projects-card" class="text-gray-600 font-bs mb-4">
            <div class="flex flex-row justify-between">
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
                class="overflow-y-auto overflow-x-hidden absolute bg-gray-800 bg-opacity-10 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
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
                        Create New Project
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
                          in
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
                            placeholder="Type project name"
                            required=""
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        @click="addproject(index)"
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
                        Add new project
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-row gap-4 overflow-x-auto min-w-[1247px] max-w-6xl"
            >
              <!-- Projects card section -->
              <div id="projects-card" class="text-gray-600 font-bs mb-4">
                <div
                  class="flex flex-row gap-4 overflow-x-auto min-w-[1247px] max-w-6xl"
                >
                  <!-- Skeleton screen for loading state -->
                  <div v-if="loading" class="skeleton-card">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                  </div>

                  <!-- Actual project list when data is available -->
                  <a
                    v-for="(project, index) in projects"
                    :key="index"
                    class="cursor-pointer items-start py-1 h-[200px] min-w-72 w-80 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:border-gray-300"
                  >
                    <div class="flex mt-2 px-4 justify-between">
                      <h5 class="my-2 text-xl font-semibold text-gray-900">
                        {{ project.name }}
                      </h5>
                      <button
                        type="button"
                        class="flex bg-white p-2 h-full text-gray-600 hover:text-gray-500 hover:bg-gray-300 rounded-lg duration-300"
                        @click.stop="deleteProject(project.id)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20"
                          width="15"
                          viewBox="0 0 384 512"
                        >
                          <path
                            d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
                          />
                        </svg>
                      </button>
                    </div>
                    <hr class="h-px mt-1 bg-gray-400 border-0" />
                    <!-- Details for each project-->
                    <div class="flex flex-col font-normal my-4">
                      <ul
                        class="min-h-20"
                        @click="handleProjectitemClick(project.id)"
                      >
                        <li
                          v-for="(taskCount, index) in projectTaskCounts[
                            project.id
                          ] || [
                            { status: 'Todo', count: 0 },
                            { status: 'In progress', count: 0 },
                            { status: 'Done', count: 0 },
                          ]"
                          :key="index"
                        >
                          <span
                            class="flex flex-row ml-3 items-center font-semibold text-pretty"
                          >
                            {{ taskCount.status }}: {{ taskCount.count }}
                          </span>
                        </li>
                      </ul>

                      <hr class="h-px bg-gray-400 border-0" />
                      <!-- Created time check theo real time-->
                      <div class="flex flex-row justify-between">
                        <span class="m-2">
                          Created at:
                          {{
                            new Date(project.created_at).toLocaleDateString()
                          }}</span
                        >
                        <button
                          type="button"
                          class="flex bg-white mx-2 p-2 h-full text-gray-600 hover:text-gray-500"
                          @click.stop="markProject(project)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="22.5"
                            viewBox="0 0 576 512"
                          >
                            <path
                              fill="#FFD43B"
                              d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="navbar" class="relative">
        <nav class="overflow-hidden px-4">
          <div class="flex flex-row justify-between px-2">
            <ul class="flex font-medium space-x-3 text-gray-600">
              <li
                class="w-16"
                :class="{ 'text-blue-500': selectedNavItem === 'work-on' }"
              >
                <a
                  href="#work-on"
                  @click.prevent="setSelectedNavItem('work-on')"
                  class="block pb-2"
                >
                  Work on
                </a>
              </li>
              <!-- <li :class="{ 'text-blue-500': selectedNavItem === 'signed' }">
              <a
                href="#signed"
                @click.prevent="setSelectedNavItem('signed')"
                class="block pb-2"
              >
                Signed
              </a>
            </li> -->
              <li :class="{ 'text-blue-500': selectedNavItem === 'marked' }">
                <a
                  href="#marked"
                  @click.prevent="setSelectedNavItem('marked')"
                  class="block pb-2"
                >
                  Marked
                </a>
              </li>
            </ul>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search projects..."
              class="w-64 p-2 border border-gray-300 rounded-md mb-4"
            />
          </div>
          <div
            id="nav-underline"
            class="absolute bottom-0 left-0 mx-4 w-[1260px] h-0.5 bg-gray-300"
          >
            <span
              class="block w-16 h-0.5 bg-blue-500 transition-transform duration-300"
              :style="{
                transform:
                  selectedNavItem === 'work-on'
                    ? 'translateX(10%)'
                    : selectedNavItem === 'marked'
                    ? 'translateX(128%)'
                    : 'translateX(200%)',
              }"
            ></span>
          </div>
        </nav>
      </div>
      <div
        class="w-[1260px] mt-2 overflow-y-auto min-h-48 max-h-48 bg-gray-50"
        v-if="selectedNavItem === 'work-on'"
      >
        <div v-for="(project, index) in filteredProjects" :key="index">
          <div
            class="flex flex-col pl-4 min-h-[52px] w-full items-start cursor-pointer bg-gray-50 hover:bg-gray-200 duration-150"
          >
            <h1 class="text-lg font-semibold text-gray-900">
              {{ project.name }}
            </h1>
            <span>
              Created at:
              {{ new Date(project.created_at).toLocaleDateString() }}</span
            >
          </div>
        </div>
      </div>
      <!-- <div v-if="selectedNavItem === 'signed'">
        <h1>Heo</h1>
      </div> -->
      <div
        class="w-[1260px] mt-2 overflow-y-auto min-h-48 max-h-48 bg-gray-50"
        v-if="selectedNavItem === 'marked'"
      >
        <ul>
          <li
            v-for="markedProject in filteredMarkedProjects"
            :key="markedProject.id"
            class="flex flex-col pl-4 min-h-[52px] w-full items-start cursor-pointer bg-gray-50 hover:bg-gray-200 duration-150"
          >
            <div class="flex flex-row w-full justify-between items-center">
              <h1 class="text-lg font-semibold text-gray-900">
                {{ markedProject.name }}
              </h1>
              <button class="mx-5" @click="unmarkProject(markedProject.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="22.5"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="#FFD43B"
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  />
                </svg>
              </button>
            </div>
            <span>
              Created at:
              {{ new Date(markedProject.created_at).toLocaleDateString() }}
            </span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* styles.css or within <style scoped> */
.skeleton {
  background: #e0e0e0;
  border-radius: 4px;
  margin: 8px 0;
}

.skeleton-text {
  height: 20px;
  width: 100%;
  margin-bottom: 10px;
}

.skeleton-title {
  height: 30px;
  width: 60%;
  margin-bottom: 10px;
}

.skeleton-card {
  padding: 16px;
  width: 300px;
  margin: 16px;
  background: #f0f0f0;
  border-radius: 8px;
}
</style>
