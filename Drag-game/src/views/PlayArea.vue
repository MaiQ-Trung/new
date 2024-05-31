<!-- PlayArea.vue -->
<script setup>
import { ref, watchEffect, computed, onMounted } from "vue";
import combinations from "@/data/combinations.js";
import { useStore } from "vuex";

const store = useStore();
const sidebarItems = computed(() => store.state.sidebarItems);


const isDropOpen = ref(false);
const playAreaItems = ref(
  JSON.parse(localStorage.getItem("playAreaItems")) || []
);

const clearPlayArea = () => {
  playAreaItems.value = [];
  localStorage.removeItem("playAreaItems");
};

const isItemExistInSidebar = (itemName) => {
  return sidebarItems.value.some((item) => item.name === itemName);
};

const addItemToPlayArea = (item) => {
  playAreaItems.value.push({ ...item, id: Date.now() });
  localStorage.setItem('playAreaItems', JSON.stringify(playAreaItems.value));
};

const setSearchKeyword = (keyword) => {
  store.commit("updateSearchKeyword", keyword);
};

const mouseX = ref(0);
const mouseY = ref(0);
const selectedItem = ref(null);
const selectedItemId = ref(null);
const highestZIndex = ref(1); // Track the highest z-index

// Function to calculate mouse coordinates
const calculateMousePosition = (event) => {
  mouseX.value = event.pageX;
  mouseY.value = event.pageY;
};

// Function to set item coordinates based on mouse position
const setItemCoordinates = () => {
  if (selectedItem.value) {
    selectedItem.value.style.left = `${
      mouseX.value - selectedItem.value.offsetWidth / 2
    }px`;
    selectedItem.value.style.top = `${
      mouseY.value - selectedItem.value.offsetHeight / 2
    }px`;
  }
};

// Function to handle mouse down event
const handleMouseDown = (event) => {
  // Calculate mouse coordinates
  calculateMousePosition(event);

  // Find the clicked item using closest with a class selector
  selectedItem.value = event.target.closest(".drag-el");

  if (!selectedItem.value) return; // Avoid unnecessary event listeners if no item is selected

  // Store the selected item's id
  selectedItemId.value = Number(selectedItem.value.dataset.id);

  // Add mouse move and mouse up event listeners
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);

  const rect = selectedItem.value.getBoundingClientRect();
  mouseX.value = rect.left + rect.width / 2;
  mouseY.value = rect.top + rect.height / 2;

  // Prevent default behavior to avoid text selection
  event.preventDefault();
};

// Function to handle mouse move event
const handleMouseMove = (event) => {
  // Calculate mouse coordinates
  calculateMousePosition(event);
  // Set item coordinates based on mouse position
  setItemCoordinates();
};

// Function to handle mouse up event
const handleMouseUp = () => {
  if (selectedItem.value) {
    const item = playAreaItems.value.find(
      (item) => item.id === selectedItemId.value
    );

    if (item) {
      // Update the item's coordinates in the playAreaItems array
      item.x = mouseX.value - selectedItem.value.offsetWidth / 2;
      item.y = mouseY.value - selectedItem.value.offsetHeight / 2;
    }
    // Remove mouse move and mouse up event listeners
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    selectedItem.value = null;
    selectedItemId.value = null;
  }
};

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item.id);
  event.dataTransfer.setData("from", "playarea");
};

const toggleDrop = () => {
  isDropOpen.value = !isDropOpen.value;
};

const onDrop = (event) => {
  event.preventDefault();
  const itemId = Number(event.dataTransfer.getData("itemID"));
  const from = event.dataTransfer.getData("from");

  if (from === "sidebar") {
    const dropZone = event.currentTarget.getBoundingClientRect();
    const dropX = event.clientX - dropZone.left;
    const dropY = event.clientY - dropZone.top;
    const item = sidebarItems.value.find((item) => item.id === itemId);

    if (item) {
      const newItem = {
        ...item,
        x: dropX - 50,
        y: dropY - 50,
        zIndex: highestZIndex.value + 1,
      };
      highestZIndex.value += 1;
      addItemToPlayArea(newItem);
    }
  }

  const HandleCombination = () => {
    combinations;
    for (let i = 0; i < playAreaItems.value.length; i++) {
      for (let j = i + 1; j < playAreaItems.value.length; j++) {
        const element1 = playAreaItems.value[i];
        const element2 = playAreaItems.value[j];

        for (const combination of combinations) {
          if (
            (element1.name === combination.element1 &&
              element2.name === combination.element2) ||
            (element1.name === combination.element2 &&
              element2.name === combination.element1)
          ) {
            const distance = Math.sqrt(
              Math.pow(element1.x - element2.x, 2) +
                Math.pow(element1.y - element2.y, 2)
            );

            if (distance <= 50) {
              playAreaItems.value.splice(i, 1);
              playAreaItems.value.splice(j - 1, 1);
              const item = {
                id: combination.id++,
                name: combination.result,
                image: combination.image,
              };
              if (!isItemExistInSidebar(item.name)) {
                store.dispatch({
                  type: "updateSidebarItems",
                  item: item,
                });
              }
              const newElement = {
                id: combination.id++,
                name: combination.result,
                image: combination.image,
                x: (element1.x + element2.x) / 2,
                y: (element1.y + element2.y) / 2,
                zIndex: highestZIndex.value + 1,
              };
              console.log(sidebarItems.value);
              highestZIndex.value += 1;
              playAreaItems.value.push(newElement);
              localStorage.setItem(
                "playAreaItems",
                JSON.stringify(playAreaItems.value)
              );
              return;
            }
          }
        }
      }
    }
  };
  watchEffect(() => {
    HandleCombination();
  });
};

onMounted(() => {
  const storedSidebarItems = JSON.parse(localStorage.getItem('sidebarItems'));
  if (storedSidebarItems) {
    store.commit('setSidebarItems', storedSidebarItems);
  }
});
watchEffect(() => {
  localStorage.setItem('sidebarItems', JSON.stringify(sidebarItems.value));
});
</script>

<template>
  <div class="drop-zone" @drop="onDrop" @dragenter.prevent @dragover.prevent>
    <button class="clean" @click="clearPlayArea">
      <i
        class="fa-solid fa-brush fa-rotate-180 fa-2xl"
        style="color: #ffd43b"
      ></i>
    </button>
    <div
      v-for="item in playAreaItems"
      :key="item.id"
      class="drag-el"
      draggable="true"
      @dragstart="startDrag($event, item)"
      @mousedown="handleMouseDown"
      :data-id="item.id"
      :style="{
        left: `${item.x}px`,
        top: `${item.y}px`,
        zIndex: item.zIndex || 1,
      }"
    >
      <img :src="item.image" :alt="`Image for ${item.id}`" />
    </div>
    <ul>
      <div class="dropdown-menu" v-show="isDropOpen">
        <button class="dropitem">
          <input
            type="text"
            v-model="$store.state.searchKeyword"
            @input="setSearchKeyword($event.target.value)"
            placeholder="Search..."
          />
        </button>
        <button class="close" @click="toggleDrop">
          <i class="fa-solid fa-x fa-2xl" style="color: #ffd43b"></i>
        </button>
      </div>
    </ul>
    <button class="search" v-show="!isDropOpen" @click="toggleDrop">
      <i class="fa-solid fa-magnifying-glass fa-2xl" style="color: #ffd43b"></i>
    </button>
  </div>
</template>

<style scoped>
.drop-zone button {
  width: 60px;
  height: 60px;
}
.drop-zone {
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgb(38, 0, 38);
  position: relative;
}

.drag-el {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: rgba(38, 0, 38, 0);
  position: absolute;
  z-index: 1000;
}

.drag-el:active {
  cursor: grabbing;
}

.drag-el:hover {
  background-color: rgba(147, 4, 147, 0.629);
}

.drag-el img {
  display: flex;
  width: 75px; /* Example width */
  height: 80px; /* Maintain aspect ratio */
}

input {
  display: flex;
  border: none;
  outline: none;
  background-color: rgba(211, 207, 207, 0.733);
  padding: 5px;
  border-radius: 5px;
  width: 200px;
  height: 40px;
  color: rgba(255, 255, 255, 0.733);
  font-size: 20px;
}
::placeholder {
  color: rgba(255, 255, 255, 0.733);
}

.dropdown-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 80px;
  background-color: rgb(38, 0, 38);
  margin-left: 300%;
  transition: 0.5s ease;
}
.close {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 100%;
  background-color: rgb(38, 0, 38);
  padding: 10px;
  margin-left: 50%;
}

.search {
  display: flex;
  width: 80px;
  height: 80px;
  background-color: rgb(38, 0, 38);
  padding: 10px;
  margin-left: 90%;
  margin-top: 20px;
}

.clean {
  display: flex;
  width: 80px;
  height: 80px;
  background-color: rgb(38, 0, 38);
  padding: 10px;
  margin-top: 20px;
  margin-left: 5px;
}
.drag-el:nth-last-of-type(1) {
  margin-bottom: 0;
}
</style>
