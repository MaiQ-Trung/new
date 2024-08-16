<script setup lang="ts">
import { defineEmits } from "vue";

const emit = defineEmits([
  "dashboard-click",
  "projects-click",
  "calendar-click",
  "docs-click",
  "settings-click",
  "trash-click",
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
const handleTrashClick = () => {
  emit("trash-click");
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
            <!-- Trash -->
            <li>
              <button
                type="button"
                @click="handleTrashClick"
                class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 hover:text-white rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-controls="dropdown-crud"
                data-collapse-toggle="dropdown-crud"
              >
                <svg
                  class="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
                  />
                </svg>
                <span class="ml-3" sidebar-toggle-item>Trash</span>
              </button>
            </li>
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
        </div>
      </div>
    </div>
  </div>
</template>
