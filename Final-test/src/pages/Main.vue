<!-- Post.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { GET_USER_TOKEN_GETTER } from "@/store/modules/storeconstans";
import { useStore } from "vuex";
import axiosInstance from "../service/AxiosTokenstance";
import { computed } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Dashboard from "@/components/Dashboard.vue";
import Project from "@/components/Projects.vue";
import Calendar from "@/components/Calendar.vue";
import Docs from "@/components/Docs.vue";
import Settings from "@/components/Settings.vue";

// Define reactive variables
const posts = ref([]);
const store = useStore();

// Map getters
const token = computed(() => store.getters[GET_USER_TOKEN_GETTER]);

// Fetch posts on component mount
onMounted(() => {
  axiosInstance
    .get(`http://vue-completecourse.firebaseio.com/posts.json`)
    .then((response) => {
      formatPosts(response.data);
    });
  window.scrollTo(0, 0);
});

const isDashboardVisible = ref(true);
const isProjectsVisible = ref(false);
const isCalendarVisible = ref(false);
const isDocsVisible = ref(false);
const isSettingsVisible = ref(false);

const showDashboard = () => {
  isDashboardVisible.value = true;
  isProjectsVisible.value = false;
  isCalendarVisible.value = false;
  isDocsVisible.value = false;
  isSettingsVisible.value = false;
};

const showProjects = () => {
  isDashboardVisible.value = false;
  isProjectsVisible.value = true;
  isCalendarVisible.value = false;
  isDocsVisible.value = false;
  isSettingsVisible.value = false;
};

const showCalendar = () => {
  isDashboardVisible.value = false;
  isProjectsVisible.value = false;
  isCalendarVisible.value = true;
  isDocsVisible.value = false;
  isSettingsVisible.value = false;
};

const showDocs = () => {
  isDashboardVisible.value = false;
  isProjectsVisible.value = false;
  isCalendarVisible.value = false;
  isDocsVisible.value = true;
  isSettingsVisible.value = false;
};

const showSettings = () => {
  isDashboardVisible.value = false;
  isProjectsVisible.value = false;
  isCalendarVisible.value = false;
  isDocsVisible.value = false;
  isSettingsVisible.value = true;
}

// Function to format posts
const formatPosts = (data) => {
  for (let key in data) {
    posts.value.push({ ...data[key], id: key });
  }
};
</script>

<template>
  <div class="container">
    <!-- Add the sidebar here -->
    <Sidebar @dashboard-click="showDashboard" @projects-click="showProjects" @calendar-click="showCalendar" @docs-click="showDocs" @settings-click="showSettings"/>
    <!-- Main -->
    <Dashboard v-if="isDashboardVisible"/>
    <Project v-if="isProjectsVisible"/>
    <Calendar v-if="isCalendarVisible"/>
    <Docs v-if="isDocsVisible"/>
    <Settings v-if="isSettingsVisible"/>
  </div>
</template>
