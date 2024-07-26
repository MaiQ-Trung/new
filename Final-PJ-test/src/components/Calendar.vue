<template>
  <div class="mt-2">
    <div class="absolute z-50 h-full max-w-2xl" v-if="modal">
      <!-- Modal content -->
      <div class="relative max-h-full w-full bg-white shadow">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
        >
          <input
            type="text"
            class="text-lg font-semibold w-full text-gray-900"
            v-model="selectedItemLabel"
          />
          <button
            id="true-delete"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            @click="toggleDeleteModal"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path
                d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
              />
            </svg>
            <span class="sr-only">Delete task</span>
          </button>
          <div
            id="popup-modal"
            tabindex="-1"
            class="overflow-y-auto overflow-x-hidden absolute mt-12 z-60 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            v-if="deleteModal"
          >
            <div class="relative p-4 w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="p-4 md:p-5 text-center">
                  <svg
                    class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <h3
                    class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
                  >
                    Are you sure you want to delete this task?
                  </h3>
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    @click="toggleVisibility"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    id="false-delete"
                    data-modal-hide="popup-modal"
                    type="button"
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    @click="toggleDeleteModal"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-4 inline-flex justify-center items-center"
            @click="toggleModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
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
        <!-- Modal body -->
        <form class="p-4 md:p-5" @submit.prevent="saveChanges">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label for="color" class="block text-sm font-medium text-gray-900"
                >Choose Color</label
              >
              <!-- Color Selection -->
              <ul>
                <li id="green" @click="changeColor('#66bfbf')"></li>
                <li id="yellow" @click="changeColor('#e84a5f')"></li>
                <li id="indigo" @click="changeColor('#7c73e6')"></li>
                <li id="blue" @click="changeColor('#8dc6ff')"></li>
              </ul>
              <div class="grid grid-cols-2 gap-5">
                <input
                  type="email"
                  placeholder="example@email.com"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                />
                <label
                  for="category"
                  class="block mt-2 text-sm font-medium text-gray-900"
                  >Assign to:</label
                >
              </div>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >From</label
              >
              <input
                type="date"
                name="date"
                id="dateFrom"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900"
                >To</label
              >
              <input
                type="date"
                name="date"
                id="dateEnd"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
            <div class="col-span-2">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Task Description</label
              >
              <textarea
                id="description"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write product description here"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save
          </button>
        </form>
      </div>
      <!-- </div> -->
    </div>

    <!-- Timeline Component -->
    <div ref="gstcElement" class="gstc-component"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import GSTC from "gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min.js";
import { Plugin as TimelinePointer } from "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js";
import { Plugin as Selection } from "gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js";
import { Plugin as ItemResizing } from "gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js";
import { Plugin as ItemMovement } from "gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js";
import { Plugin as Bookmarks } from "gantt-schedule-timeline-calendar/dist/plugins/time-bookmarks.esm.min.js";
import "gantt-schedule-timeline-calendar/dist/style.css";

const modal = ref(false);
const selectedItem = ref(null);
const selectedColor = ref("#7c73e6");
const selectedItemLabel = ref("");
const deleteModal = ref(false);

const toggleDeleteModal = (event) => {
  deleteModal.value = !deleteModal.value;
};

const toggleModal = async () => {
  modal.value = !modal.value;
  deleteModal.value = false;
  selectedItemLabel.value = selectedItem.value ? selectedItem.value.label : "";
  await nextTick();
  const dateFromElement = document.getElementById("dateFrom");
  const dateEndElement = document.getElementById("dateEnd");
  if (dateFromElement && selectedItem.value) {
    dateFromElement.value = selectedItem.value
      ? new Date(selectedItem.value.time.start).toISOString().substring(0, 10)
      : "";
  }

  if (dateEndElement && selectedItem.value) {
    dateEndElement.value = selectedItem.value
      ? new Date(selectedItem.value.time.end).toISOString().substring(0, 10)
      : "";
  }
};

const saveChanges = async () => {
  const dateFromElement = document.getElementById("dateFrom");
  const dateEndElement = document.getElementById("dateEnd");
  if (selectedItem.value) {
    selectedItem.value.label = selectedItemLabel.value;
    if (dateFromElement) {
      selectedItem.value.time.start = new Date(dateFromElement.value).getTime();
    }
    if (dateEndElement) {
      selectedItem.value.time.end = new Date(dateEndElement.value).getTime();
    }
    state.update("config.chart.items", items.value);
  }
  toggleModal();
};

const toggleVisibility = () => {
  if (selectedItem.value) {
    selectedItem.value.visible = !selectedItem.value.visible;
    state.update("config.chart.items", filterVisibleItems(items.value));
  }
  toggleModal();
};

function filterVisibleItems(items) {
  const filteredItems = {};
  for (const id in items) {
    if (items[id].visible) {
      filteredItems[id] = items[id];
    }
  }
  return filteredItems;
}

const changeColor = (color) => {
  if (selectedItem.value) {
    selectedItem.value.style.backgroundColor = color;
    state.update("config.chart.items", items.value);
  }
  console.log("items.value", items.value);
};

function clickAction(element, data) {
  function onClick(event) {
    if (data.item.id) {
      selectedItem.value = items.value.find((item) => item.id === data.item.id);
      toggleModal();
    }
  }

  element.addEventListener("click", onClick);
}

function generateRows() {
  const rows = {};
  for (let i = 0; i < 100; i++) {
    const id = GSTC.api.GSTCID(i.toString());
    rows[id] = {
      id,
      label: `Row ${i}`,
    };
  }
  return rows;
}

// Main setup
const gstcElement = ref(null);
let gstc, state;

// Items state
const items = ref([
  {
    id: "0",
    label: "Item 0",
    rowId: "gstcid-0",
    time: {
      start: new Date("2024-01-01").getTime(),
      end: new Date("2024-01-02").getTime(),
    },
    customProperty: "Value 0",
    style: {
      backgroundColor: selectedColor.value,
      position: "relative",
    },
    visible: true,
  },
  {
    id: "1",
    label: "Item 1",
    rowId: "gstcid-1",
    time: {
      start: new Date("2024-01-01").getTime(),
      end: new Date("2024-01-03").getTime(),
    },
    customProperty: "Value 1",
    style: {
      backgroundColor: selectedColor.value,
    },
    visible: true,
  },
  {
    id: "2",
    label: "Item 2",
    rowId: "gstcid-2",
    time: {
      start: new Date("2024-01-03").getTime(),
      end: new Date("2024-01-04").getTime(),
    },
    customProperty: "Value 2",
    style: {
      backgroundColor: selectedColor.value,
    },
    visible: true,
  },
  {
    id: "3",
    label: "Item 3",
    rowId: "gstcid-3",
    time: {
      start: new Date("2024-01-04").getTime(),
      end: new Date("2024-01-05").getTime(),
    },
    customProperty: "Value 3",
    style: {
      backgroundColor: selectedColor.value,
    },
    visible: true,
  },
  {
    id: "4",
    label: "Item 4",
    rowId: "gstcid-4",
    time: {
      start: new Date("2024-01-05").getTime(),
      end: new Date("2024-01-06").getTime(),
    },
    customProperty: "Value 4",
    style: {
      backgroundColor: selectedColor.value,
    },
    visible: true,
  },
  {
    id: "5",
    label: "Item 5",
    rowId: "gstcid-5",
    time: {
      start: new Date("2024-01-06").getTime(),
      end: new Date("2024-01-07").getTime(),
    },
    customProperty: "Value 5",
    style: {
      backgroundColor: selectedColor.value,
    },
    visible: true,
  },
  {
    id: "6",
    label: "Item 6",
    rowId: "gstcid-6",
    time: {
      start: new Date("2024-01-07").getTime(),
      end: new Date("2024-01-08").getTime(),
    },
    customProperty: "Value 6",
    style: {
      backgroundColor: selectedColor.value,
    },
    visible: true,
  },
  {
    id: "7",
    label: "Item 7",
    rowId: "gstcid-7",
    time: {
      start: new Date("2024-01-08").getTime(),
      end: new Date("2024-01-09").getTime(),
    },
    customProperty: "Value 7",
    style: {
      backgroundColor: selectedColor.value,
    },
    visible: true,
  },
  {
    id: "8",
    label: "Item 8",
    rowId: "gstcid-8",
    time: {
      start: new Date("2024-01-09").getTime(),
      end: new Date("2024-01-10").getTime(),
    },
    customProperty: "Value 8",
    style: {
      backgroundColor: selectedColor.value,
    },
    visible: true,
  },
  {
    id: "9",
    label: "Item 9",
    rowId: "gstcid-9",
    time: {
      start: new Date("2024-01-10").getTime(),
      end: new Date("2024-01-11").getTime(),
    },
    customProperty: "Value 9",
    style: {
      backgroundColor: selectedColor.value,
    },
    visible: true,
  },
]);

onMounted(() => {
  const config = {
    licenseKey:
      "====BEGIN LICENSE KEY====\nALNOz4hdXo7JBXM7LLsWoZLN9l6XpX0KX5CneD3qmicvhlnxjOeMGb/KTK8R/ZNAupXS1Lqat5aqW5AfoirH/sFF4To8BT8QehbLHQjZbrhg8/Vc2LWUwuaMqXE6LS41mxF4t+eKGda5rQqWIm4ni9Rsdx1VnNdCNKDRd6SF7EpE7Rwl6iAnWlgyDWANuQEuVqM/y96k4ILGCZqC2jd6yKI6AbpYeE1Ksb1uwwg9+YktZnSr5vd5bQ0oJu1O8iCt/yMjGokmncJZJ0auwDrlYHmSpfgbOTZEHN+hV4zDh6gr8lQQvNe+RqdWrf5z+BPVt8v3/ZVgcYX+WSfuK6QAWg==||U2FsdGVkX1+MwCT+jZ7BfN5UAWnC51WqlcZrTN+8gWgOujjwqEdEBlzk2AarK9WKiCWYPxMEWHTDNVOlcJJgsE5DuO1nw1elYt3hBqnsXxw=\nJ7rURik2o3f2Qse9OlvlMqr6M100VE05VkM3LLkNCSFLIYzzrHCKfHVtvNcDI/9frVSIdJcfwF5n9FPWt1AjvfOv2F0Mxx5SqR3dencUoBAUQFQ0nhlx2HSdCdLL2NzlnyTUap+mH/cWQ/BEX6SsnWOlhyA5ZMpTUo7DZORTOhwf2uAiFk8sakKeYzIvvePYl/Fzq29XrKKQ/Jfs6CB0NvxHIdFm/LjpAwWvhpLq4AFL3aSQrKNOP1fyiIcp909RmjMdBZ8MJ5cGvNNq4otxJK53EtHGGYrxo9a7sLA7kwZUfZ88Il7MraU/ieHszl6L6PMy6XAiXkPEvkADXFxJWw==\n====END LICENSE KEY====",
    plugins: [
      TimelinePointer(),
      Selection(),
      ItemResizing(),
      ItemMovement(),
      Bookmarks(),
    ],
    list: {
      columns: {
        data: {
          [GSTC.api.GSTCID("id")]: {
            id: GSTC.api.GSTCID("id"),
            width: 60,
            data: ({ row }) => GSTC.api.sourceID(row.id),
            header: {
              content: "ID",
            },
          },
          [GSTC.api.GSTCID("label")]: {
            id: GSTC.api.GSTCID("label"),
            width: 200,
            data: "label",
            header: {
              content: "Tasks name",
            },
          },
        },
      },
      rows: generateRows(),
    },
    chart: {
      items: filterVisibleItems(items.value),
    },
    actions: {
      "chart-timeline-items-row-item": [clickAction],
    },
  };

  state = GSTC.api.stateFromConfig(config);
  gstc = GSTC({
    element: gstcElement.value,
    state,
    config,
  });
});

onBeforeUnmount(() => {
  if (gstc) gstc.destroy();
});
</script>

<style scoped>
.gstc-component {
  margin-right: 0;
  padding: 0;
}
.toolbox {
  padding: 10px;
}
ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 24px);
  padding: 10px;
  grid-gap: 10px;
}
ul li {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s;
}

ul li:hover {
  transform: scale(1.2);
}

#green {
  background-color: #66bfbf;
}

#yellow {
  background-color: #e84a5f;
}

#indigo {
  background-color: #7c73e6;
}

#blue {
  background-color: #8dc6ff;
}
</style>
