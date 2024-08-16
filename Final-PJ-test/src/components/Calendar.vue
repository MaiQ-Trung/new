<template>
  <div>
    <FullCalendar
      class="ca m-2 min-w-[555px] max-h-[620px] bg-slate-50 bg-opacity-75"
      :options="calendarOptions"
    />
    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-gray-500 bg-opacity-45 flex items-center justify-center z-50"
    >
      <div
        class="flex flex-col justify-between bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
      >
        <!-- Modal header -->
        <div class="flex items-center justify-between pb-2 border-b">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ selectedEvent?.title }}
          </h3>
          <button
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            @click="toggleModal"
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
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <hr class="h-px bg-gray-400 border-0" />
        <!-- Modal body -->
        <form @submit.prevent="saveChanges">
          <div class="grid gap-4 grid-cols-2">
            <div class="col-span-2 sm:col-span-1 mt-2">
              <label class="block mb-2 text-sm font-medium text-gray-900">
                From
              </label>
              <input
                type="date"
                v-model="eventStartDate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div class="col-span-2 sm:col-span-1 mt-2">
              <label class="block mb-2 text-sm font-medium text-gray-900">
                To
              </label>
              <input
                type="date"
                v-model="eventEndDate"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
          </div>
          <button
            type="submit"
            class="text-white mt-4 w-full flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import axios from "axios";
import { useStore } from "vuex";

const store = useStore();
const isModalOpen = ref(false);
const calendarEvents = ref([]);
const selectedEvent = ref(null);

const eventStartDate = ref("");
const eventEndDate = ref("");

const fetchProjects = async () => {
  const userId = store.state.auth.userId;
  try {
    const response = await axios.get(
      `http://localhost:3000/main/projects/${userId}`
    );
    calendarEvents.value = response.data.map((project) => ({
      id: project.id,
      title: project.name,
      start: project.start_date,
      end: project.end_date,
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

onMounted(() => {
  fetchProjects();
});

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    left: "title",
    center: "dayGridMonth,dayGridWeek,dayGridDay",
    right: "today prev,next",
  },
  selectable: true,
  events: calendarEvents.value,

  eventClick(info) {
    selectedEvent.value = info.event;
    eventStartDate.value = info.event.startStr.split("T")[0]; // Extract date part
    eventEndDate.value = info.event.endStr.split("T")[0]; // Extract date part
    toggleModal();
  },
});

const saveChanges = async () => {
  if (!selectedEvent.value) {
    // If no event is selected, do nothing
    return;
  }

  const updatedEvent = {
    id: selectedEvent.value.id,
    start_date: eventStartDate.value,
    end_date: eventEndDate.value,
  };

  try {
    await axios.put(
      `http://localhost:3000/update-project/${updatedEvent.id}`,
      updatedEvent
    );
    fetchProjects();
    toggleModal();
  } catch (error) {
    console.error("Error updating project:", error);
  }
};

watch(
  calendarEvents,
  (newEvents) => {
    calendarOptions.events = newEvents;
  },
  { immediate: true }
);
</script>

<style>
.fc-scroller.fc-scroller-liquid-absolute{
  overflow-y: auto !important;
}
.fc-scroller.fc-scroller-liquid-absolute::-webkit-scrollbar{
  width: 3px;
}
.fc-event-time{
  display: none;
}
.fc-h-event{
  border-radius: 0.5rem !important;
  border: none !important;
  padding: 5px !important;
  margin: 5px;
  cursor: pointer;
  background-image: linear-gradient(to right, #7096ff, #DDA0DD) !important;
}
.fc-event-title{
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.778) !important;
  color: rgb(255, 255, 255) !important;
  font-weight: bold !important;
}
/* .fc-dayGridMonth-view{
  background-color: rgba(208, 208, 208, 0.115) !important;
} */
</style>