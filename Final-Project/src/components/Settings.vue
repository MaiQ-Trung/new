<script setup>
import { ref, watch, onMounted } from 'vue';

// Tạo biến reactive để lưu trữ dữ liệu form
const formData = ref({
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  address: '',
  email: '',
  phoneNumber: '',
  birthday: '',
  organization: '',
  role: ''
});

// Hàm để lưu dữ liệu vào localStorage
const saveFormDataToLocalStorage = () => {
  localStorage.setItem('formData', JSON.stringify(formData.value));
  alert('Data saved successfully!');
};

// Tải dữ liệu từ localStorage khi component mount
onMounted(() => {
  const savedData = localStorage.getItem('formData');
  if (savedData) {
    formData.value = JSON.parse(savedData);
  }
});
</script>

<template>
  <main class="relative w-[1280px] h-full overflow-y-auto bg-gray-50 ml-64">
    <div class="flex overflow-hidden bg-gray-50">
      <div
        class="fixed inset-0 z-10 hidden bg-gray-900/50/90"
        id="sidebarBackdrop"
      ></div>

      <div
        id="main-content"
        class="relative w-full h-full overflow-y-auto bg-gray-50"
      >
        <main>
          <div class="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4">
            <div class="mb-4 col-span-full xl:mb-2">
              <h1
                class="text-xl font-semibold text-gray-900 sm:text-2xltext-white"
              >
                User settings
              </h1>
            </div>
            <!-- Right Content -->
            <div class="col-span-full xl:col-auto">
              <div
                class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2border-gray-700 sm:p-6bg-gray-800"
              >
                <div
                  class="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4"
                >
                  <img
                    class="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                    src="https://flowbite-admin-dashboard.vercel.app/images/users/bonnie-green-2x.png"
                    alt="Jese picture"
                  />
                  <div>
                    <h3 class="mb-1 text-xl font-bold text-gray-900text-white">
                      Profile picture
                    </h3>
                    <div class="mb-4 text-sm text-gray-500text-gray-400">
                      JPG, GIF or PNG. Max size of 800K
                    </div>
                    <div class="flex items-center space-x-4">
                      <button
                        type="button"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300bg-primary-600"
                      >
                        <svg
                          class="w-4 h-4 mr-2 -ml-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"
                          ></path>
                          <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
                        </svg>
                        Upload picture
                      </button>
                      <button
                        type="button"
                        class="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200focus:ring-gray-700bg-gray-800text-gray-400border-gray-600hover:text-whitehover:bg-gray-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2border-gray-700 sm:p-6bg-gray-800"
              >
                <h3 class="mb-4 text-xl font-semiboldtext-white">Language</h3>
                <div class="mb-4">
                  <label
                    for="settings-language"
                    class="block mb-2 text-sm font-medium text-gray-900text-white"
                    >Select language</label
                  >
                  <select
                    id="settings-language"
                    name="countries"
                    class="bg-gray-50 border-2 border-gray-800 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  >
                    <option>English (US)</option>
                    <option>Italiano</option>
                    <option>Français (France)</option>
                    <option>正體字</option>
                    <option>Español (España)</option>
                    <option>Deutsch</option>
                    <option>Português (Brasil)</option>
                  </select>
                </div>
                <div>
                  <button
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Save all
                  </button>
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <div
                class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2"
              >
                <h3 class="mb-4 text-xl font-semiboldtext-white">
                  General information
                </h3>
                <form @submit.prevent>
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="first-name"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >First Name</label
                      >
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="Bonnie"
                        required
                        v-model="formData.firstName"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="last-name"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >Last Name</label
                      >
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="Green"
                        required
                        v-model="formData.lastName"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="country"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >Country</label
                      >
                      <input
                        type="text"
                        name="country"
                        id="country"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="United States"
                        required
                        v-model="formData.country"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="city"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >City</label
                      >
                      <input
                        type="text"
                        name="city"
                        id="city"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="e.g. San Francisco"
                        required
                        v-model="formData.city"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="address"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >Address</label
                      >
                      <input
                        type="text"
                        name="address"
                        id="address"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="e.g. California"
                        required
                        v-model="formData.address"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >Email</label
                      >
                      <input
                        type="email"
                        name="email"
                        id="email"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="example@company.com"
                        required
                        v-model="formData.email"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="phone-number"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >Phone Number</label
                      >
                      <input
                        type="number"
                        name="phone-number"
                        id="phone-number"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="e.g. +(12)3456 789"
                        required
                        v-model="formData.phoneNumber"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="birthday"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >Birthday</label
                      >
                      <input
                        type="date"
                        name="birthday"
                        id="birthday"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="15/08/1990"
                        required
                        v-model="formData.birthday"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="organization"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >Organization</label
                      >
                      <input
                        type="text"
                        name="organization"
                        id="organization"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="Company Name"
                        required
                        v-model="formData.organization"
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="role"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >Role</label
                      >
                      <input
                        type="text"
                        name="role"
                        id="role"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="React Developer"
                        required
                        v-model="formData.role"  
                      />
                    </div>
                    <div class="col-span-6 sm:col-full">
                      <button
                        @click="saveFormDataToLocalStorage"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Save all
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div
                class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2border-gray-700 sm:p-6bg-gray-800"
              >
                <h3 class="mb-4 text-xl font-semiboldtext-white">
                  Password information
                </h3>
                <form @submit.prevent>
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="current-password"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >Current password</label
                      >
                      <input
                        type="text"
                        name="current-password"
                        id="current-password"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="password"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >New password</label
                      >
                      <input
                        data-popover-target="popover-password"
                        data-popover-placement="bottom"
                        type="password"
                        id="password"
                         class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="••••••••"
                        required
                      />
                      <div
                        data-popover
                        id="popover-password"
                        role="tooltip"
                        class="absolute z-10 invisible inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72bg-gray-800border-gray-600text-gray-400"
                      >
                        <div class="p-3 space-y-2">
                          <h3 class="font-semibold text-gray-900text-white">
                            Must have at least 6 characters
                          </h3>
                          <div class="grid grid-cols-4 gap-2">
                            <div class="h-1 bg-orange-300bg-orange-400"></div>
                            <div class="h-1 bg-orange-300bg-orange-400"></div>
                            <div class="h-1 bg-gray-200bg-gray-600"></div>
                            <div class="h-1 bg-gray-200bg-gray-600"></div>
                          </div>
                          <p>It’s better to have:</p>
                          <ul>
                            <li class="flex items-center mb-1">
                              <svg
                                class="w-4 h-4 mr-2 text-green-400text-green-500"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              Upper & lower case letters
                            </li>
                            <li class="flex items-center mb-1">
                              <svg
                                class="w-4 h-4 mr-2 text-gray-300text-gray-400"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              A symbol (#$&)
                            </li>
                            <li class="flex items-center">
                              <svg
                                class="w-4 h-4 mr-2 text-gray-300text-gray-400"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              A longer password (min. 12 chars.)
                            </li>
                          </ul>
                        </div>
                        <div data-popper-arrow></div>
                      </div>
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="confirm-password"
                        class="block mb-2 text-sm font-medium text-gray-900text-white"
                        >Confirm password</label
                      >
                      <input
                        type="text"
                        name="confirm-password"
                        id="confirm-password"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div class="col-span-6 sm:col-full">
                      <button
                        @click="saveFormDataToLocalStorage"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Save all
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </main>
</template>
