<script setup lang="ts">

const emit = defineEmits([
  "dashboard-click",
  "projects-click",
  "calendar-click",
  "docs-click",
  "trash-click",
  "teams-click",
]);

const handleDashboardClick = () => {
  emit("dashboard-click");
};

const handleProjectsClick = () => {
  emit("projects-click");
};
const handleCalendarClick = () => {
  emit("calendar-click");
};
const handleDocsClick = () => {
  emit("docs-click");
};
const handleTrashClick = () => {
  emit("trash-click");
};
const handleTeamsClick = () => {
  emit("teams-click");
};
</script>

<template>
  <div
    class="sticky left-0 z-20 min-w-60 h-screen font-normal border-r border-gray-200"
  >
    <div class="flex flex-col h-screen flex-1 bg-white">
      <div class="flex flex-col">
        <div
          class="flex-1 px-3 space-y-1 mt-4 bg-white divide-y divide-gray-400"
        >
          <ul class="pb-2 space-y-2">
            <!-- Dash Board -->
            <li>
              <a
                @click="handleDashboardClick"
                href="#"
                class="flex items-center p-2 text-xl text-gray-900 transition duration-75 rounded-lg group hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
              <i class="pi pi-chart-pie"></i>
                <span class="ml-3 text-base" sidebar-toggle-item>Dashboard</span>
              </a>
            </li>
            <!-- Projects -->
            <li>
              <button
                type="button"
                @click="handleProjectsClick"
                class="flex items-center w-full p-2 text-xl hover:text-white text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700"
                data-collapse-toggle="dropdown-layouts"
              >
              <i class="pi pi-server"></i>
                <span
                  class="ml-3 text-base"
                  sidebar-toggle-item
                  >Projects</span
                >
              </button>
            </li>
            <!-- Calendar -->
            <li>
              <button
                type="button"
                @click="handleCalendarClick"
                class="flex items-center w-full p-2 text-xl text-gray-900 transition duration-75 hover:text-white rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-controls="dropdown-crud"
                data-collapse-toggle="dropdown-crud"
              >
              <i class="pi pi-calendar"></i>
                <span
                  class="ml-3 text-base"
                  sidebar-toggle-item
                  >Calendar</span
                >
              </button>
            </li>

            <!-- Teams -->
            <button
              type="button"
              @click="handleTeamsClick"
              class="flex items-center w-full p-2 text-xl text-gray-900 transition duration-75 hover:text-white rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-controls="dropdown-crud"
              data-collapse-toggle="dropdown-crud"
            >
            <i class="pi pi-users"></i>
              <span class="ml-3 text-base" sidebar-toggle-item>Teams</span>
            </button>
            <!-- Docs -->
            <button
              type="button"
              @click="handleDocsClick"
              class="flex items-center w-full p-2 text-xl text-gray-900 transition duration-75 hover:text-white rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-controls="dropdown-crud"
              data-collapse-toggle="dropdown-crud"
            >
            <i class="pi pi-file"></i>
              <span class="ml-3 text-base" sidebar-toggle-item>Docs</span>
            </button>
            <!-- Trash -->
            <li>
              <button
                type="button"
                @click="handleTrashClick"
                class="flex items-center w-full p-2 text-xl text-gray-900 transition duration-75 hover:text-white rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-controls="dropdown-crud"
                data-collapse-toggle="dropdown-crud"
              >
              <i class="pi pi-trash"></i>
                <span class="ml-3 text-base" sidebar-toggle-item>Trash</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
