<template>
  <main>
    <div>
      <div
        id="main-content"
        class="relative w-full h-screen overflow-y-auto bg-gray-50"
      >
        <main>
          <div class="grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4">
            <div class="mb-4 col-span-full xl:mb-2">
              <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">
                User Profile
              </h1>
            </div>
            <!-- Right Content -->
            <div class="col-span-full xl:col-auto">
              <div
                class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2"
              >
                <div
                  class="flex flex-col items-start sm:flex xl:block 2xl:flex gap-4"
                >
                  <h3 class="mb-2 text-xl font-bold text-gray-900">
                    Profile picture
                  </h3>
                  <img
                    :src="avatarUrl"
                    class="mb-4 rounded-lg w-40 h-36 sm:mb-0 xl:mb-4 2xl:mb-0"
                  />
                  <div>
                    <input
                      type="file"
                      @change="handleFileUpload"
                      ref="fileInput"
                      hidden
                      class="mt-3 text-sm font-medium text-center"
                    />
                    <a
                      href="#"
                      @click="triggerFileInput"
                      class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 bg-primary-600"
                      ><svg
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
                      Upload picture</a
                    >
                  </div>
                </div>
              </div>
              <a
                href="#"
                @click="toggleChangePasswordModal"
                class="px-5 font-mono text-blue-400 hover:text-blue-700 duration-500"
              >
                Change Password
              </a>
            </div>
            <div
              v-if="showChangePasswordModal"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            >
              <div class="bg-white p-8 w-[436px] rounded-lg shadow-lg">
                <h3 class="text-xl font-semibold mb-4">Change Password</h3>
                <form @submit.prevent="changePassword">
                  <div class="mb-4">
                    <label
                      for="current-password"
                      class="block text-sm font-medium text-gray-700"
                      >Current Password</label
                    >
                    <input
                      type="password"
                      id="current-password"
                      v-model="passwordData.currentPassword"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      required
                    />
                    <span
                      v-if="errors.currentPassword"
                      class="text-red-500 text-sm"
                      >{{ errors.currentPassword }}</span
                    >
                  </div>
                  <div class="mb-4">
                    <label
                      for="new-password"
                      class="block text-sm font-medium text-gray-700"
                      >New Password</label
                    >
                    <input
                      type="password"
                      id="new-password"
                      v-model="passwordData.newPassword"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      required
                    />
                    <span
                      v-if="errors.newPassword"
                      class="text-red-500 text-sm"
                      >{{ errors.newPassword }}</span
                    >
                  </div>
                  <div class="flex justify-end">
                    <button
                      type="button"
                      @click="toggleChangePasswordModal"
                      class="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-span-2">
              <div
                class="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2"
              >
                <h3 class="mb-4 text-xl font-semibold">General information</h3>
                <form>
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="first-name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >First Name</label
                      >
                      <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        v-model="userData.first_name"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="Bonnie"
                        required
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="last-name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Last Name</label
                      >
                      <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        v-model="userData.last_name"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="Green"
                        required
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="phone-number"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Phone Number</label
                      >
                      <input
                        type="tel"
                        pattern="[0-9]{4}[0-9]{3}[0-9]{3}"
                        v-model="userData.phone_number"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="e.g. +(12)3456 789"
                        required
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="birthday"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Birthday</label
                      >
                      <input
                        type="date"
                        v-model="formattedBirthday"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        required
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="organization"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Organization</label
                      >
                      <input
                        type="text"
                        name="organization"
                        id="organization"
                        v-model="userData.organization"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="Company Name"
                        required
                      />
                    </div>
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="role"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Role</label
                      >
                      <input
                        type="text"
                        name="role"
                        id="role"
                        v-model="userData.role"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        placeholder="React Developer"
                        required
                      />
                    </div>
                    <div class="col-span-6 sm:col-full">
                      <button
                        type="submit"
                        @click="saveData"
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

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";

const store = useStore();
const avatarUrl = ref("");
const fileInput = ref(null);
const showChangePasswordModal = ref(false);

const passwordData = ref({
  currentPassword: "",
  newPassword: "",
});

const errors = ref({
  currentPassword: "",
  newPassword: "",
});

const userData = ref({
  first_name: "",
  last_name: "",
  phone_number: "",
  birthday: "",
  organization: "",
  role: "",
});

const toggleChangePasswordModal = () => {
  showChangePasswordModal.value = !showChangePasswordModal.value;
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const userId = store.state.auth.userId;

  if (!file) return;

  // Kiểm tra định dạng file
  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
  if (!validImageTypes.includes(file.type)) {
    console.error("Invalid file type. Only JPEG, PNG and GIF are allowed.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    await axios.post(
      `http://localhost:3000/upload-avatar/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Avatar uploaded successfully");
    fetchAvatar();
  } catch (error) {
    console.error("Error uploading avatar:", error);
    console.log("Failed to upload avatar");
  }
};

const fetchAvatar = async () => {
  const userId = store.state.auth.userId;
  try {
    const response = await axios.get(`http://localhost:3000/avatar/${userId}`, {
      responseType: "arraybuffer",
    });
    const blob = new Blob([response.data], { type: "image/jpeg" });
    avatarUrl.value = URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error fetching avatar:", error);
  }
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const formatFromUTC = (dateString) => {
  const date = new Date(dateString);
  // Chuyển đổi sang múi giờ GMT+7
  date.setHours(date.getHours() + 7);
  return date.toISOString().split("T")[0]; // Trả về định dạng yyyy-MM-dd
};

const fetchUserData = async () => {
  const userId = store.state.auth.userId;
  try {
    const response = await axios.get(
      `http://localhost:3000/user-data/${userId}`
    );
    userData.value = response.data;
    userData.value.birthday = formatFromUTC(userData.value.birthday);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const formattedBirthday = computed({
  get() {
    return userData.value.birthday;
  },
  set(value) {
    userData.value.birthday = value;
  },
});

// Api để lưu thay đổi thông tin người dùng
const saveData = async () => {
  const userId = store.state.auth.userId;
  try {
    await axios.put(
      `http://localhost:3000/update-user/${userId}`,
      userData.value
    );
    console.log("User data saved successfully");
    fetchUserData();
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

// Api để thay đổi mật khẩu
const changePassword = async () => {
  const userId = store.state.auth.userId;
  const { currentPassword, newPassword } = passwordData.value;

  // Reset lỗi
  errors.value = {
    currentPassword: "",
    newPassword: "",
  };

  if (currentPassword === newPassword) {
    errors.value.newPassword =
      "New password cannot be the same as the current password";
    return;
  }

  try {
    await axios.put(`http://localhost:3000/change-password`, {
      userId,
      currentPassword,
      newPassword,
    });
    console.log("Password changed successfully");
    toggleChangePasswordModal();
    fetchUserData();
  } catch (error) {
    if (error.response && error.response.data) {
      const { error: errorMessage } = error.response.data;
      if (errorMessage === "Current password is incorrect") {
        errors.value.currentPassword = errorMessage;
      } else if (
        errorMessage ===
        "New password cannot be the same as the current password"
      ) {
        errors.value.newPassword = errorMessage;
      } else {
        console.error("Error changing password:", error);
      }
    }
  }
};

onMounted(() => {
  fetchAvatar();
  fetchUserData();
});
</script>
