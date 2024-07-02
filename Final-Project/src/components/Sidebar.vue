<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const emit = defineEmits([
  "dashboard-click",
  "projects-click",
  "calendar-click",
  "docs-click",
  "settings-click",
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
const handleSettingsClick = () => {
  emit("settings-click");
};
</script>
<template>
  <aside
    id="sidebar"
    class="fixed top-3 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
    aria-label="Sidebar"
  >
    <div
      class="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-300"
    >
      <div class="flex flex-col flex-1 overflow-y-auto">
        <div
          class="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:divide-gray-300"
        >
          <ul class="pb-2 space-y-2">
            <!-- Dash Board -->
            <li>
              <a
                @click="handleDashboardClick"
                href="#"
                class="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span class="ml-3" sidebar-toggle-item>Dashboard</span>
              </a>
            </li>
            <!-- Projects -->
            <li>
              <button
                type="button"
                @click="handleProjectsClick"
                class="flex items-center w-full p-2 text-base hover:text-white text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700"
                data-collapse-toggle="dropdown-layouts"
              >
                <svg
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M448 160H320V128H448v32zM48 64C21.5 64 0 85.5 0 112v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zM448 352v32H192V352H448zM48 288c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V336c0-26.5-21.5-48-48-48H48z"
                  />
                </svg>
                <span
                  class="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item
                  >Projects</span
                >
              </button>
            </li>
            <!-- Timeline -->
            <li>
              <button
                type="button"
                @click="handleCalendarClick"
                class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 hover:text-white rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-controls="dropdown-crud"
                data-collapse-toggle="dropdown-crud"
              >
                <svg
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path
                    d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
                  />
                </svg>
                <span
                  class="flex-1 ml-3 text-left whitespace-nowrap"
                  sidebar-toggle-item
                  >Calendar</span
                >
              </button>
            </li>

            <!-- Docs -->
            <button
            type="button"
                @click="handleDocsClick"
                class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 hover:text-white rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-controls="dropdown-crud"
                data-collapse-toggle="dropdown-crud"
            >
              <svg
                class="flex-shrink-0 w-7 h-7 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fill-rule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-3" sidebar-toggle-item>Docs</span>
            </button>
            <!-- Settings -->
            <li>
              <button
              type="button"
                @click="handleSettingsClick"
                class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 hover:text-white rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-controls="dropdown-crud"
                data-collapse-toggle="dropdown-crud"
            >
                <svg
                  class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span class="ml-3" sidebar-toggle-item>Settings</span>
              </button>
            </li>
          </ul>
          <div class="pt-2 space-y-2">
            <!-- GitHub Repository -->
            <a
              href="https://github.com/MaiQ-Trung/new"
              target="_blank"
              class="flex items-center p-2 text-base hover:text-white text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:hover:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
              >
                <path
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                />
              </svg>
              <span class="ml-3" sidebar-toggle-item>GitHub Repository</span>
            </a>
            <!-- Support -->
            <a
              href="https://github.com/themesberg/flowbite-admin-dashboard/issues"
              target="_blank"
              class="flex items-center p-2 text-base hover:text-white text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:hover:bg-gray-700"
            >
              <svg
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-3" sidebar-toggle-item>Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
