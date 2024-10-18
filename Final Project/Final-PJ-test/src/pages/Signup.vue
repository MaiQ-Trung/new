<script setup>
import { onMounted, ref } from "vue";
import SignupValidation from "../service/SignupValidation";
import { LOADING_BAR_SHOW_MUTATION } from "../store/modules/storeconstans";
import { useStore } from "vuex";
import axios from "axios";

const email = ref("");
const password = ref("");
const error = ref("");
const existingUser = ref("");
const success = ref("");

const fetchUser = async () => {
  try {
    const res = await axios.get("http://localhost:3000/users");
    existingUser.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const store = useStore();

const showLoading = () => {
  store.commit(LOADING_BAR_SHOW_MUTATION);
};

const onSign = async () => {
  if (!existingUser.value || existingUser.value.length === 0) {
    await fetchUser();
  }
  const existingEmails = existingUser.value.map((user) => user.email);
  const validation = new SignupValidation(email.value, existingEmails);
  const validationErrors = validation.checkValidations();
  error.value = validationErrors;
  if (existingEmails.includes(email.value)) {
    error.value = "Email already exists";
    return false;
  }
  error.value = "";
  success.value = "";
  try {
    showLoading();
    await store.dispatch("auth/signup", {
      email: email.value,
      password: password.value,
    });
    success.value = "User created successfully";
  } catch (er) {
    error.value = er;
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <form
    class="flex justify-center w-screen h-screen bg-gradient-to-br from-emerald-500 to-sky-500"
    @submit.prevent="onSign"
  >
    <div
      class="fixed flex justify-center bg-white shadow rounded-3xl top-20 w-7/12 h-4/5"
    >
      <div class="p-12">
        <div class="flex flex-col items-center">
          <h1 class="text-3xl font-semibold font-roboto">Sign up</h1>
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
                <div
                  class="flex bg-red-400 rounded-lg px-4 text-red-900 font-roboto"
                  v-if="error"
                >
                  {{ error }}
                </div>
                <div
                  class="flex bg-green-400 rounded-lg px-4 text-green-900 font-roboto"
                  v-if="success"
                >
                  {{ success }}
                </div>
              </div>
              <router-link
                class="text-blue-700 hover:text-indigo-700 hover:underline duration-100"
                to="/login"
                >Already have account</router-link
              >
              <button
                type="submit"
                class="tracking-wide font-semibold bg-emerald-500 text-gray-100 w-full py-4 rounded-lg hover:bg-emerald-700 duration-300"
              >
                <span class="ml-3"> Sign up </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex-1 bg-indigo-100 rounded-tr-3xl rounded-br-3xl text-center hidden lg:flex"
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
