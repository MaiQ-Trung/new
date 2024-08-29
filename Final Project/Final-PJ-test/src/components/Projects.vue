<template>
  <div class="h-screen" @click.stop="showMenuForProject = null">
    <main>
      <div class="px-4 pt-2">
        <div class="grid grid-rows-2 w-[1235px]">
          <div id="header" class="flex flex-row mt-4 justify-between">
            <div class="text-xl font-semibold text-gray-900 sm:text-2xl">
              Your Work
            </div>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search projects..."
              class="w-60 border border-gray-300 rounded-md mr-10 px-2"
            />
          </div>
          <hr class="h-px my-4 bg-gray-400 border-0" />
          <div id="projects-card" class="text-gray-600 font-bs mb-4">
            <div class="flex flex-row justify-between">
              <h5>Recent Projects</h5>
              <!-- Modal toggle -->
              <button
                class="block mr-10 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg mb-3 text-sm px-5 py-2.5 text-center"
                @click="togglemodalCreate"
              >
                New Task
              </button>

              <!-- Main modal -->
              <div
                id="crud-modal"
                tabindex="-1"
                class="absolute z-50 bg-gray-900 bg-opacity-10 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full"
                v-if="modalCreate"
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
                        @click="togglemodalCreate"
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
                        @click="addProject(index)"
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
                    @click="handleProjectitemClick(project.id)"
                    class="cursor-pointer items-start py-1 h-[200px] min-w-64 max-w-64 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg hover:border-gray-300"
                  >
                    <div class="flex mt-2 justify-between">
                      <h5 class="my-2 mx-4 text-xl font-semibold text-gray-900">
                        {{ project.name }}
                      </h5>
                      <button
                        @click.stop="toggleMenu(project.id)"
                        class="relative flex w-5 mx-2 px-4 justify-center items-center hover:bg-gray-300 rounded-lg duration-200"
                      >
                        <i class="pi pi-ellipsis-v"></i>
                      </button>
                      <div
                        v-if="showMenuForProject === project.id"
                        class="absolute mt-10 ml-52 border rounded-t-tr-lg bg-gray-500 w-48 animate-dropdown"
                      >
                        <button
                          type="button"
                          @click.stop="togglemodalSign(project.id)"
                          class="flex bg-white p-2 h-full w-full text-gray-600 hover:text-gray-500 hover:bg-gray-300 duration-300 shadow-lg"
                        >
                          Sign to
                        </button>
                        <button
                          type="button"
                          class="flex bg-white p-2 h-full w-full text-gray-600 hover:text-gray-500 hover:bg-gray-300 duration-300 shadow-lg"
                          @click.stop="deleteProject(project.id)"
                        >
                          Delete Project
                        </button>
                        <button
                          type="button"
                          class="flex bg-white p-2 h-full w-full text-gray-600 hover:text-gray-500 hover:bg-gray-300 duration-300 shadow-lg"
                          @click.stop="markProject(project)"
                        >
                          Mark Project
                        </button>
                      </div>
                    </div>
                    <hr class="h-px mt-1 bg-gray-400 border-0" />
                    <!-- Details for each project-->
                    <div class="flex flex-col font-normal my-4">
                      <ul class="min-h-20">
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
        <nav class="px-4">
          <div class="flex flex-row justify-between">
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
          </div>
          <div
            id="nav-underline"
            class="absolute bottom-0 left-4 w-[1260px] h-0.5 bg-gray-300"
          >
            <span
              class="block w-16 h-0.5 bg-blue-500 transition-transform duration-300"
              :style="{
                transform:
                  selectedNavItem === 'work-on'
                    ? 'translateX(0)'
                    : 'translateX(115%)',
              }"
            ></span>
          </div>
        </nav>
      </div>
      <div
        class="w-full mt-2 overflow-y-auto min-h-max max-h-[185px]"
        v-if="selectedNavItem === 'work-on'"
      >
        <div v-for="(project, index) in filteredProjects" :key="index">
          <a
            @click="handleProjectitemClick(project.id)"
            class="flex flex-col pl-4 min-h-[52px] w-full items-start cursor-pointer bg-gray-50 hover:bg-gray-200 duration-150"
          >
            <div class="flex flex-row w-full justify-between items-center">
              <h1 class="text-lg font-semibold text-gray-900">
                {{ project.name }}
              </h1>
              <button
                type="button"
                class="flex mx-2 p-2 h-full"
                @click.stop="markProject(project)"
              >
                <svg
                  v-if="project.isMarked"
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
                <svg
                  v-else
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
            <span>
              Created at:
              {{ new Date(project.created_at).toLocaleDateString() }}</span
            >
          </a>
        </div>
      </div>
      <div
        class="w-full mt-2 overflow-y-auto min-h-max max-h-[185px]"
        v-if="selectedNavItem === 'marked'"
      >
        <a
          v-for="markedProject in filteredMarkedProjects"
          :key="markedProject.id"
          @click="handleProjectitemClick(markedProject.id)"
          class="flex flex-col pl-4 min-h-[52px] w-full items-start cursor-pointer bg-gray-50 hover:bg-gray-200 duration-150"
        >
          <div class="flex flex-row w-full justify-between items-center">
            <h1 class="text-lg font-semibold text-gray-900">
              {{ markedProject.name }}
            </h1>
            <button
              class="flex p-2 h-full text-gray-600 hover:text-gray-500 mx-5"
              @click.stop="unmarkProject(markedProject.id)"
            >
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
        </a>
      </div>
    </main>
    <!-- modalSign content -->
    <div
      id="crud-modal"
      tabindex="-1"
      class="absolute z-50 bg-gray-900 bg-opacity-10 w-full md:inset-0 h-[calc(100%-1rem)] md:h-full"
      v-if="modalSign"
    >
      <div
        class="relative bg-white py-4 rounded-lg w-full h-max max-w-md max-h-full top-[15%] left-1/3"
      >
        <div
          class="flex flex-row justify-between text-lg font-semibold px-4 mb-2"
        >
          <h3 class="mt-1">Sign this project to</h3>
          <button
            @click.stop="togglemodalSign"
            class="rounded-lg py-1 px-2 hover:bg-gray-400 duration-150"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
        <hr class="h-px mx-4 bg-gray-800" />
        <div class="my-4 mx-4 py-2 rounded-lg flex justify-center">
          <a-space direction="vertical">
            <a-select
              v-model:value="value"
              class="w-full min-w-96"
              :options="teams"
              mode="multiple"
              allowClear
              @deselect="removeTeam"
              placeholder="Select users"
              @popupScroll="popupScroll"
            >
              <!-- Custom option template -->
              <template #option="{ value }">
                <div class="flex items-center" @click="signProject(value)">
                  <span class="text-lg">{{ value }}</span>
                </div>
              </template>
            </a-select>
          </a-space>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

const store = useStore();
const router = useRouter();

const projects = ref([]);
const projectTaskCounts = ref({});
const markedProjects = ref([]);
const signedProjects = ref([]);
const searchTerm = ref("");
const selectedNavItem = ref("work-on");

const showMenuForProject = ref(null);
const modalCreate = ref(false);
const modalSign = ref(false);
const selectedProjects = ref([]);
const teams = ref([]);
const signedTeams = ref([]);

const value = ref([]);
const loading = ref(true);

// Fetch projects
const fetchProjects = async () => {
  const userId = store.state.auth.userId;
  try {
    const response = await axios.get(
      `http://localhost:3000/main/projects/${userId}`
    );
    projects.value = response.data;
    await fetchProjectTaskCounts();

    const markedresponse = await axios.get(
      `http://localhost:3000/markedProject/${userId}`
    );
    markedProjects.value = markedresponse.data;

    projects.value.forEach((project) => {
      project.isMarked = markedProjects.value.some(
        (markedProject) => markedProject.id === project.id
      );
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

// Add new project
const addProject = async () => {
  const name = document.getElementById("name").value;
  const userId = store.state.auth.userId;
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
    togglemodalCreate();
  } catch (error) {
    console.error("Error adding project:", error);
  }
};

// Delete project
const deleteProject = async (projectId) => {
  const userId = store.state.auth.userId;
  try {
    await axios.put(
      `http://localhost:3000/delete-project/${projectId}/${userId}`
    );
    fetchProjects();
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};

// Fetch marked projects
const fetchMarkedProject = async () => {
  const userId = store.state.auth.userId;
  try {
    const response = await axios.get(
      `http://localhost:3000/markedProject/${userId}`
    );
    markedProjects.value = response.data;
  } catch (error) {
    console.error("Error fetching marked projects:", error);
  }
};

// Mark project
const markProject = async (project) => {
  const userId = store.state.auth.userId;
  try {
    await axios.post(`http://localhost:3000/mark-project/${userId}`, {
      id: project.id,
      name: project.name,
    });
    await fetchMarkedProject();
    toggleMenu();
    fetchProjects();
    console.log("Project marked successfully");
  } catch (error) {
    console.error("Error marking project:", error);
  }
};

// Unmark project
const unmarkProject = async (id) => {
  if (!id) {
    console.error("Project ID is required");
    return;
  }

  try {
    await axios.delete("http://localhost:3000/unmark-project", {
      data: { id },
    });
    await fetchMarkedProject();
    fetchProjects();
  } catch (error) {
    console.error("Error unmarking project:", error);
  }
};

// Fetch task counts for projects
const fetchProjectTaskCounts = async () => {
  const promises = projects.value.map(async (project) => {
    const projectId = project.id;
    try {
      const response = await axios.get(
        `http://localhost:3000/projects/${projectId}/tasks`
      );
      const tasks = response.data;

      if (Array.isArray(tasks)) {
        projectTaskCounts.value[projectId] = tasks.length
          ? tasks
          : [
              { status: "Todo", count: 0 },
              { status: "In progress", count: 0 },
              { status: "Done", count: 0 },
            ];
      } else {
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
  });

  await Promise.all(promises);
  loading.value = false;
};

//Fetch teams
const fetchTeams = async () => {
  const userId = store.state.auth.userId;

  try {
    const query = await axios.get(`http://localhost:3000/teams/${userId}`);
    teams.value = query.data.map((team) => ({
      value: team.name,
    }));
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};

//Fetch Signed Teams
const fetchSignedTeams = async () => {
  for (const project of selectedProjects.value) {
    const projectId = project.id;
    try {
      const res = await axios.get(`http://localhost:3000/signed/${projectId}`);
      signedTeams.value = res.data.map((team) => ({
        id: team.id,
        team: team.team,
      }));
      value.value = signedTeams.value.map((team) => team.team);
    } catch (error) {
      console.error("Error fetching signed teams:", error);
    }
  }
};

const signProject = async (team) => {
  if (selectedProjects.value.length === 0) {
    console.log("No projects selected.");
    return;
  }
  for (const project of selectedProjects.value) {
    const projectId = project.id;
    try {
      await axios.post(`http://localhost:3000/sign-project/${projectId}`, {
        team,
      });
      fetchSignedTeams();
    } catch (error) {
      console.error(`Error signing project ${projectId} for ${team}:`, error);
    }
  }
};

const removeTeam = async (team) => {
  if (selectedProjects.value.length === 0) {
    console.log("No projects selected.");
    return;
  }
  const teams = signedTeams.value.find((teams) => teams.team === team);
  if (!teams) {
    console.error(`teams ${team} not found in signed teams`);
    return;
  }
  const id = teams.id;
  for (const project of selectedProjects.value) {
    const projectId = project.id;
    try {
      await axios.delete(
        `http://localhost:3000/delete-signed/${id}/${projectId}`,
        {
          data: { team },
        }
      );
      console.log(`project ${projectId} removed from team ${team}`);
    } catch (error) {
      console.error(
        `Error removing project ${projectId} from teams ${team}:`,
        error
      );
    }
  }
};

// Function to navigate to todo list
const handleProjectitemClick = (projectId) => {
  router.push({ name: "todoList", params: { projectId } });
};

const togglemodalCreate = () => {
  modalCreate.value = !modalCreate.value;
};

const togglemodalSign = async (projectId) => {
  await fetchSignedTeams(projectId);
  modalSign.value = !modalSign.value;
  toggleMenu();
};

const toggleMenu = async (projectId) => {
  if (showMenuForProject.value === projectId) {
    // If the same project menu is toggled again, close it and clear selection
    showMenuForProject.value = null;
    selectedProjects.value = [];
  } else {
    // Open menu for the selected project and update selectedProjects
    showMenuForProject.value = projectId;
    const selectedProject = projects.value.find((p) => p.id === projectId);
    if (selectedProject) {
      selectedProjects.value = [selectedProject];
    }
  }
};

// Set selected navbar item
const setSelectedNavItem = (item) => {
  selectedNavItem.value = item;
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

const popupScroll = () => {
  console.log("popupScroll");
};

onMounted(() => {
  fetchProjects();
  fetchMarkedProject();
  fetchTeams();
});
</script>

<style>
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
.p-multiselect-list-container {
  padding: 10px;
}

.p-multiselect-overlay {
  left: 565px !important;
  border: 2px solid #e9e9e9 !important;
  border-radius: 8px !important;
  width: 340px !important;
  margin-top: 18px !important;
  padding: 10px;
  box-shadow: 10px 10px 5px 0 rgba(0, 0, 0, 0.5) !important;
}
.p-iconfield {
  display: flex;
  flex-direction: row;
  border: 2px solid #e9e9e9;
  border-radius: 8px;
  padding: 4px;
}
.p-iconfield span {
  position: unset;
  margin-top: 5px;
  margin-right: 5px;
}
.p-multiselect-list-container ul li .p-checkbox {
  padding: 3px;
  margin-right: 3px;
  border: 2px solid #e9e9e9;
  width: 25px !important;
  height: 23px !important;
  border-radius: 5px;
}
.p-multiselect-chip-item {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 15px;
  background-color: #f1f5f9;
  border-radius: 5px !important;
  margin-right: 10px;
  padding: 3px;
}
.p-chip-label {
  margin-right: 4px !important;
}
.p-multiselect-header .p-checkbox {
  display: none;
}
</style>
