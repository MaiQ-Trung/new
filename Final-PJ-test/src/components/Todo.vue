<template>
  <div class="kanban-container flex flex-col justify-center p-5">
    <h2 class="font-semibold text-2xl">KAN Board</h2>
    <input
      type="text"
      v-model="search"
      placeholder="Search task name"
      class="border border-gray-300 rounded-md p-2 mt-2 w-1/4 mb-10"
    />
    <div class="kanban-board flex flex-wrap gap-5 w-full max-w-7xl">
      <div
        v-for="(list, index) in filteredLists"
        :key="index"
        :class="[
          'kanban-column rounded-md p-3 flex-1 min-w-80 max-w-80',
          getColumnClass(list.title)
        ]"
      >
        <div class="kanban-column-header flex justify-between mb-3">
          <h2>{{ list.title }}</h2>
          <button @click="addNewItem(index)">Add New Task</button>
        </div>
        <vue-draggable
          :list="list.items"
          group="items"
          item-key="id"
          class="kanban-column-items max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-100"
          @end="handleDrop(index)"
        >
          <template #item="{ element }">
            <div
              class="bg-white text-black border-gray-300 border rounded-md p-2 mb-3 min-h-20 cursor-pointer hover:shadow-md hover:bg-gray-200 transition-color duration-200 relative "
              @mousemove="element.showDelete = true"
              @mouseleave="element.showDelete = false"
            >
              {{ element.name }}
              <button
                v-show="element.showDelete"
                @click="deleteItem(element, index)"
                class="absolute top-2 right-2 p-2 rounded-lg ease-in-out transition-all hover:bg-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="14"
                  width="10.5"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
                  />
                </svg>
              </button>
            </div>
          </template>
        </vue-draggable>
        <div
          class="new-item flex justify-between mt-3 focus:outline-sky-600 focus:border-sky-600 focus:rounded-md"
          v-if="newItem && newItemList === index"
        >
          <input
            type="text"
            class="flex-1 mr-3"
            v-model="newItemText"
            @keyup.enter="addItemToList(index)"
          />
          <button @click="addItemToList(index)">Add</button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import VueDraggable from "vuedraggable";
import { useRoute } from "vue-router";

const route = useRoute();
const lists = ref([
  { title: "To Do", items: [] },
  { title: "In Progress", items: [] },
  { title: "Done", items: [] },
]);

let highestId = ref(0);
let newItem = ref(false);
let newItemList = ref(null);
let newItemText = ref("");
const search = ref("");

const getColumnClass = (title) => {
  switch (title.toLowerCase()) {
    case 'to do':
      return 'bg-gray-100';
    case 'in progress':
      return 'bg-sky-300';
    case 'done':
      return 'bg-emerald-300';
    default:
      return 'bg-gray-100';
  }
};

const filteredLists = computed(() => {
  if (!search.value) return lists.value;

  return lists.value.map((list) => ({
    ...list,
    items: list.items.filter((item) =>
      item.name.toLowerCase().includes(search.value.toLowerCase())
    ),
  }));
});

const fetchData = async () => {
  const projectId = route.params.projectId;
  try {
    const { data } = await axios.get(`http://localhost:3000/todo/${projectId}`);
    const { todo = [], inprogress = [], done = [] } = data;

    // Merge all items into a single array
    const allItems = [].concat(todo, inprogress, done);

    // Restore order based on localStorage or default order
    const storedOrder = JSON.parse(localStorage.getItem("kanbanOrder")) || {};

    lists.value.forEach((list) => {
      list.items = allItems
        .filter((item) => item.status === list.title.toLowerCase())
        .sort((a, b) => (storedOrder[a.id] || 0) - (storedOrder[b.id] || 0));
    });
    console.log(lists.value);
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

// Update item status when dropped into a different list and save to database
const updateItemStatus = async () => {
  lists.value.forEach(async (list) => {
    list.items.forEach(async (item) => {
      if (item.status !== list.title.toLowerCase()) {
        item.status = list.title.toLowerCase();
        await axios.put("http://localhost:3000/update-status", item);
      }
    });
  });
};

// Handle drop event to update item order to local storage and update item status
const handleDrop = async (listIndex) => {
  const storedOrder = JSON.parse(localStorage.getItem("kanbanOrder")) || {};

  lists.value[listIndex].items.forEach((item, i) => {
    storedOrder[item.id] = i;
  });

  localStorage.setItem("kanbanOrder", JSON.stringify(storedOrder));
  await updateItemStatus();
};

const addNewItem = (listIndex) => {
  newItem.value = true;
  newItemList.value = listIndex;
  newItemText.value = "";
};

const addItemToList = async (listIndex) => {
  if (newItemText.value.trim()) {
    const newItemObj = {
      id: highestId.value + 1,
      name: newItemText.value.trim(),
      status: lists.value[listIndex].title.toLowerCase(),
      project_id: route.params.projectId,
    };
    console.log(newItemObj);
    try {
      await axios.post("http://localhost:3000/add-item", newItemObj);
      highestId.value = newItemObj.id;
      lists.value[listIndex].items.push(newItemObj);
      newItemText.value = "";
    } catch (error) {
      console.error("Error adding item:", error);
    }
    newItem.value = false;
    newItemList.value = null;
  }
};
// Delete item from list and database
const deleteItem = async (item, listIndex) => {
  try {
    await axios.delete(`http://localhost:3000/delete-item/${item.id}`);
    lists.value[listIndex].items = lists.value[listIndex].items.filter(
      (i) => i.id !== item.id
    );
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>
