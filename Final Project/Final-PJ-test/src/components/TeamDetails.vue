<template>
  <div>
    <div
      class="relative h-dvh bg-slate-50 max-h-dvh overflow-y-auto"
      @click.stop="showMenu = false"
    >
      <div class="container p-5">
        <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl mb-5">
          {{ groupName }}
        </h2>
        <div
          class="flex flex-row justify-center gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div class="bg-white shadow-md rounded-lg p-5 w-1/4">
            <h1 class="text-gray-900 text-lg">Team members:</h1>
            <!--Number of team-member-->
            <div v-if="teamMembers.length === 0" class="text-gray-500">
              No team members found
            </div>
            <div v-else-if="teamMembers.length < 2" class="text-gray-500">
              {{ teamMembers.length }} member
            </div>
            <div v-else class="text-gray-500">
              {{ teamMembers.length }} members
            </div>
            <div
              v-for="member in teamMembers"
              :key="member.id"
              class="p-2 rounded-lg cursor-pointer hover:bg-gray-200"
            >
              <div class="flex items center">
                <img
                  :src="member.imgageURL"
                  alt="profile"
                  class="w-10 h-10 rounded-full"
                />
                <h3 class="text-lg font-semibold text-gray-900 ml-2">
                  {{ member.name }}
                </h3>
              </div>
            </div>
          </div>
          <div class="bg-white shadow-md rounded-lg p-5 w-2/4">
            <h1 class="text-gray-900 text-lg">Team projects</h1>
            <div
              v-for="project in signedProjects"
              :key="project.id"
              class="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
              @click="navigatetoProjectDetails(project)"
            >
              <h3 class="font-semibold text-gray-900">
                {{ project.name }}
              </h3>
              <p class="text-gray-500 text-sm">
                Created at: {{ project.createdAt }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

const store = useStore();
const route = useRoute();
const router = useRouter();
const signedProjects = ref([]);
const groupName = route.params.groupName;
const teamMembers = ref([]);

const fetchSignedProject = async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/signed-projects/${groupName}`
    );
    signedProjects.value = res.data.map((project) => {
      return {
        id: project.id,
        name: project.name,
        userId: project.user_id,
        createdAt: project.created_at,
      };
    });
    console.log("Signed projects fetched successfully", signedProjects.value);
  } catch (error) {
    console.error("Error fetching signed projects:", error);
  }
};

const fetchTeamMembers = async () => {
  const teamId = route.params.groupId;
  try {
    const res = await axios.get(`http://localhost:3000/team-members/${teamId}`);
    teamMembers.value = res.data.map((member) => {
      return {
        id: member.id,
        name: member.email,
        imgageURL: member.profilePicture,
      };
    });
  } catch (error) {
    console.error("Error fetching team members:", error);
  }
};

//navigate to todo list page with project id parameter
const navigatetoProjectDetails = (project) => {
  router.push({
    name: "todoList",
    params: { projectId: project.id },
  });
};

onMounted(() => {
  fetchTeamMembers();
  fetchSignedProject();
});
</script>
