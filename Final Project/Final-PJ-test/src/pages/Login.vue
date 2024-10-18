<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import LoginValidation from "../service/LoginValidation";

import {
  LOADING_BAR_SHOW_MUTATION,
  SET_USER_TOKEN_DATA_MUTATION,
} from "../store/modules/storeconstans";

const email = ref("");
const password = ref("");
const error = ref("");

const store = useStore();
const router = useRouter();
const showLoading = () => {
  store.commit(LOADING_BAR_SHOW_MUTATION);
};
const onLogin = async () => {
  const validations = new LoginValidation(email.value, password.value);

  const validationErrors = validations.checkValidations();
  error.value = validationErrors;

  if ("email" in validationErrors || "password" in validationErrors) {
    return false;
  }
  error.value = "";
  try {
    showLoading();
    const res = await store.dispatch("auth/login", {
      email: email.value,
      password: password.value,
    });
    const userId = res.userId;
    store.commit(SET_USER_TOKEN_DATA_MUTATION, { userId });
    router.push({ name: "dashboard" });
  } catch (er) {
    error.value = er;
  }
};
</script>

<template>
  <form
    class="flex justify-center w-screen h-screen bg-gradient-to-br from-emerald-500 to-sky-500"
    @submit.prevent="onLogin"
  >
    <div
      class="fixed flex justify-center bg-white shadow rounded-3xl top-20 w-7/12 h-4/5"
    >
      <div class="p-12">
        <div class="flex flex-col items-center">
          <h1 class="text-3xl font-semibold font-roboto">Log in</h1>
          <img
            class="w-28 h-28 mt-8"
            src="https://www.svgrepo.com/show/192244/man-user.svg"
            alt="user"
          />
          <div class="w-full flex-1 mt-4">
            <div class="grid gap-3 w-72 mt-5">
              <div>
                <input
                  class="w-full px-4 py-1 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-lg font-roboto focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  v-model.trim="email"
                />
                <input
                  class="w-full px-4 py-1 mb-4 rounded-lg bg-gray-100 border border-gray-200 placeholder-gray-500 text-lg font-roboto focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Password"
                  v-model.trim="password"
                />
                <div class="flex bg-red-400 rounded-lg px-4 text-red-900 font-roboto" v-if="error">{{ error }}</div>
              </div>
              <div>
                <router-link class="text-blue-700 hover:text-indigo-700 hover:underline duration-100" to="/signup">Don't have account</router-link>
                <button
                  type="submit"
                  class="mt-2 tracking-wide font-semibold bg-emerald-500 text-gray-100 w-full py-4 rounded-lg hover:bg-emerald-700 duration-300"
                >
                  <span class="ml-3"> Log in </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex-1 bg-indigo-100 text-center rounded-tr-3xl rounded-br-3xl hidden lg:flex"
      >
        <div
          class="m-12 w-full bg-contain bg-center bg-no-repeat"
          style="
            background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');
          "
        ></div>
      </div>
    </div>
  </form>
</template>