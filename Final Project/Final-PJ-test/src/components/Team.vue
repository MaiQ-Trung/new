<template>
  <div
    class="relative h-full bg-slate-50 min-h-[640px] max-h-[640px] overflow-auto"
  >
    <div class="page-content p-5">
      <header>
        <div class="flex flex-row justify-between">
          <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl">
            People and Teams
          </h1>
          <div class="flex px-3 gap-2">
            <button
              class="bg-blue-500 p-2 text-sm font-roboto text-white font-semibold rounded-md hover:bg-blue-600"
              @click="toggleCreate"
            >
              Create team
            </button>
            <!-- Modal create team -->
            <div
              id="crud"
              tabindex="-1"
              class="absolute z-50 bg-gray-900 bg-opacity-10 w-full md:inset-0 h-[calc(100%-1rem)] md:h-screen"
              v-if="createTeam"
            >
              <div
                class="relative p-4 w-full max-w-md max-h-full top-[15%] left-1/3"
              >
                <div class="relative bg-white rounded-lg shadow">
                  <div
                    class="flex items-center justify-between p-3 border-b rounded-t"
                  >
                    <h3 class="font-semibold text-gray-900">Create new team</h3>
                    <button
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      @click="toggleCreate"
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
                  <form class="p-4 md:p-5" @submit.prevent>
                    <div class="grid gap-4 mb-4 grid-cols-2">
                      <div class="col-span-2">
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Team Name</label
                        >
                        <input
                          type="text"
                          name="name"
                          id="name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder="Type name here..."
                          required=""
                        />
                        <label
                          for="name"
                          class="block my-2 text-sm font-medium text-gray-900"
                          >Add user to team</label
                        >
                        <a-select
                          v-model:value="state.value"
                          mode="multiple"
                          label-in-value
                          placeholder="Select users"
                          class="w-full"
                          :filter-option="false"
                          :not-found-content="state.fetching ? undefined : null"
                          :options="state.data"
                          @search="fetchUser"
                        >
                          <template v-if="state.fetching" #notFoundContent>
                            <a-spin size="small" />
                          </template>
                        </a-select>
                      </div>
                    </div>
                    <button
                      class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      @click.stop="newTeam()"
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
                      Create new team
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <button
              @click="toggleAdd"
              class="bg-blue-500 p-2 text-sm font-roboto text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Add person
            </button>
          </div>
          <!-- Modal add user -->
          <div
            id="crud-modal"
            tabindex="-1"
            class="absolute z-50 bg-gray-900 bg-opacity-10 w-full md:inset-0 h-[calc(100%-1rem)] md:h-screen"
            v-if="addUsers"
          >
            <div
              class="relative p-4 w-full max-w-md max-h-full top-[15%] left-1/3"
            >
              <!-- Modal content -->
              <div class="relative bg-white rounded-lg shadow">
                <!-- Modal header -->
                <div
                  class="flex items-center justify-between p-3 border-b rounded-t"
                >
                  <h3 class="font-semibold text-gray-900">Add Users</h3>
                  <button
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    @click="toggleAdd"
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
                <form class="p-4 md:p-5" @submit.prevent>
                  <div class="grid gap-4 mb-4 grid-cols-2">
                    <div class="col-span-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Email</label
                      >
                      <input
                        type="email"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Type email of user..."
                        required=""
                      />
                    </div>
                  </div>
                  <button
                    class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    @click.stop="addPerson()"
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
                    Add new person
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <input
          v-model="filters"
          class="border-b-2 bg-slate-50 p-2 w-full my-3 border-gray-500 focus:outline-none focus:border-b-blue-500 hover:border-b-blue-500"
          type="text"
          placeholder="Search for people and teams"
        />
      </header>
      <main>
        <div class="grid grid-rows-2 gap-4 mt-5">
          <div class="flex flex-col">
            <h1>People</h1>
            <div class="flex flex-row p-3 gap-4 max-w-[1232px] overflow-auto">
              <div
                v-for="person in filteredPeople"
                :key="person.name"
                class="flex flex-col gap-8 justify-center items-center bg-white h-48 min-w-40 shadow rounded-md p-2 hover:shadow-lg duration-300"
              >
                <img
                  class="w-20 h-20 rounded-full"
                  :src="person.imageURL"
                  alt="person"
                />
                {{ person.name }}
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <h1>Teams</h1>
            <div class="flex flex-row p-3 gap-4 max-w-[1232px] overflow-auto cursor-pointer">
              <div
                v-for="(group, index) in filteredGroups"
                :key="group.name"
                class="flex flex-col gap-8 items-center bg-white h-48 min-w-40 shadow rounded-md hover:shadow-lg duration-300"
                @click="NavigateToTeam(group)"
              >
                <span
                  class="w-full h-16 rounded-t-md"
                  :style="{ background: groupGradients[index] }"
                />
                {{ group.name }}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { debounce } from "lodash-es";

const router = useRouter();
const store = useStore();

const filters = ref("");
const id = ref([]);
const addUsers = ref(false);
const createTeam = ref(false);
const people = ref([]);
const Groups = ref([]);
const groupGradients = ref([]);

let lastFetchId = 0;
const state = reactive({
  data: [],
  value: [],
  fetching: false,
});
const fetchUser = debounce(async (value) => {
  console.log("fetching user", value);
  lastFetchId += 1;
  const fetchId = lastFetchId;
  state.data = [];
  state.fetching = true;

  try {
    const userId = store.state.auth.userId; // Lấy userId từ Vuex store
    const res = await axios.get(`http://localhost:3000/teammates/${userId}`);

    if (fetchId !== lastFetchId) {
      return;
    }

    const filteredData = res.data
      .filter((user) => user.email.toLowerCase().includes(value.toLowerCase())) // Lọc dữ liệu dựa trên giá trị tìm kiếm
      .map((user) => ({
        label: `${user.email}`, // Hiển thị email trong dropdown
        value: user.id, // Sử dụng id làm giá trị
      }));

    state.data = filteredData;
  } catch (error) {
    console.error(error);
  } finally {
    state.fetching = false;
  }
}, 300);

watch(state.value, () => {
  state.data = [];
  state.fetching = false;
});

const newTeam = async () => {
  const teamName = document.getElementById("name").value; // Lấy tên team từ input
  const userIds = state.value.map((user) => user.value); // Lấy danh sách user đã chọn trong select

  if (!teamName || userIds.length === 0) {
    // Kiểm tra nếu tên team hoặc danh sách user không hợp lệ
    alert("Please provide a team name and select at least one user.");
    return;
  }

  const userId = store.state.auth.userId; // Lấy userId từ Vuex store

  try {
    // Gọi API để tạo team và thêm user vào team
    await axios.post(`http://localhost:3000/create-team/${userId}`, {
      teamName,
      emails: state.value.map((user) => user.label), // Chuyển danh sách user thành email
    });

    // Nếu tạo team thành công, thực hiện các hành động sau
    getTeams(); // Cập nhật danh sách team
    toggleCreate(); // Đóng modal
  } catch (error) {
    console.error("Error creating team:", error);
    alert("There was an error creating the team. Please try again.");
  }
};

//Call API để lấy id của user theo email đã nhập
const addPerson = async () => {
  const email = document.getElementById("name").value;
  const userId = store.state.auth.userId;

  try {
    const res = await axios.get(`http://localhost:3000/get-id/${email}`);
    id.value = res.data.id;
    await axios.post(
      `http://localhost:3000/add-teammate/${userId}/${id.value}`
    );
    getTeammates();
    toggleAdd();
  } catch (err) {
    console.log(err);
  }
};

//API để lấy tt của teammates
const getTeammates = async () => {
  const userId = store.state.auth.userId;

  try {
    const res = await axios.get(`http://localhost:3000/teammates/${userId}`);
    people.value = res.data.map((person) => ({
      name: person.email,
      imageURL: person.profilePicture,
    }));
  } catch (err) {
    console.log(err);
  }
};

//API để lấy ds teams
const getTeams = async () => {
  const userId = store.state.auth.userId;

  try {
    const res = await axios.get(`http://localhost:3000/teams/${userId}`);
    Groups.value = res.data.map((group, index) => {
      // Kiểm tra nếu chưa có gradient cho nhóm này thì tạo mới
      if (!groupGradients.value[index]) {
        groupGradients.value.push(generateRandomGradient());
      }
      return { id: group.id, name: group.name };
    });
    console.log(Groups.value);
  } catch (err) {
    console.log(err);
  }
};

const toggleAdd = () => {
  addUsers.value = !addUsers.value;
};

const toggleCreate = () => {
  createTeam.value = !createTeam.value;
};

const filteredPeople = computed(() => {
  return people.value.filter((person) =>
    person.name.toLowerCase().includes(filters.value.toLocaleLowerCase())
  );
});

const filteredGroups = computed(() => {
  return Groups.value.filter((group) =>
    group.name.toLowerCase().includes(filters.value.toLocaleLowerCase())
  );
});

const generateRandomGradient = () => {
  const colors = ["#10b981", "#0ea5e9", "#6366f1", "#f87171", "#fde047"];

  const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
  const randomColor2 = "#ffffff";

  return `linear-gradient(135deg, ${randomColor1} 0%, ${randomColor2} 100%)`;
};

const NavigateToTeam = (group) => {
  router.push({
    name: "TeamDetail",
    params: { groupId: group.id, groupName: group.name },
  });
};

onMounted(() => {
  getTeammates();
  getTeams();
});
</script>
