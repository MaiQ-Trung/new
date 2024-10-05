<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { LOGOUT_ACTION } from "../store/modules/storeconstans";
const store = useStore();
const router = useRouter();
const settings = ref(false);
const email = ref("");
const avatar = ref("");

const onLogout = async () => {
  await store.dispatch(`auth/${LOGOUT_ACTION}`);
  settings.value = false;
  router.push("/");
};

const fetchUserData = async () => {
  watchEffect(async () => {
    const userId = store.state.auth.userId;

    if (userId) {
      try {
        const res = await axios.get(`http://localhost:3000/users/${userId}`);
        email.value = res.data.email;
        avatar.value = res.data.profilePicture;
      } catch (error) {
        console.error(error);
      }
    }
  });
};

const toggleSettings = () => {
  settings.value = !settings.value;
};

onMounted(() => {
  fetchUserData();
});
</script>

<template>
  <nav
    class="relative w-full bg-gradient-to-r from-sky-500 to-purple-500 border-b border-gray-300"
    @click="settings = false"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <a
            href="http://localhost:5173/main/dashboard"
            class="flex ml-2 md:mr-24"
          >
            <img src="@/assets/logo.png" class="h-12 mr-3" />
            <span
              class="text-2xl sm:text-3xl text-white font-Matemasie self-center"
              >Flowy</span
            >
          </a>
        </div>
        <div class="flex items-center">
          <div class="flex items-center ml-3">
            <div>
              <button
                type="button"
                class="flex text-sm bg-gray-800 rounded-full hover:ring-4 dark:hover:ring-indigo-200"
                id="user-menu-button-2"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-2"
                @click.stop="toggleSettings"
              >
                <img
                  class="w-10 h-10 rounded-full"
                  :src="avatar"
                  alt="user photo"
                />
              </button>
            </div>

            <div
              class="absolute top-14 right-8 z-50 my-4 p-2 w-44 text-base bg-white list-none divide-y divide-gray-600 rounded-lg shadow-lg"
              v-if="settings"
            >
              <div class="p-4">
                <p
                  class="text-lg font-medium text-gray-900 font-mono truncate dark:text-gray-700"
                >
                  Welcome!
                </p>
                <p
                  class="font-medium text-gray-900 font-roboto truncate dark:text-gray-700"
                >
                  {{ email }}
                </p>
              </div>
              <ul class="py-1">
                <li class="flex flex-row px-4 py-2 items-center gap-2 cursor-pointer font-mono text-gray-700 hover:bg-red-500 hover:text-white duration-150 ease-in-out rounded-lg">
                  <i class="pi pi-sign-out"></i>
                  <a
                    href="#"
                    role="menuitem"
                    @click.prevent="onLogout()"
                    >Log out</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
