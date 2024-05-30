<!-- SideBar.vue -->
<script setup>
import { computed } from "vue";
import {  useStore } from "vuex";

const store = useStore();
const sidebarItems = computed({
  get: () => store.state.sidebarItems,
  set: (data) => store.commit("update", data),
});
// const filteredSidebarItems = computed(() => {
//   const searchKeyword = store.state.searchKeyword.toLowerCase();
//   const temp = store.state.sidebarItems;
//   return temp?.filter((item) => {
//     return item.name.toLowerCase().includes(searchKeyword);
//   });
// });
const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = "copy";
  event.dataTransfer.effectAllowed = "copy";
  event.dataTransfer.setData("itemID", item.id);
  event.dataTransfer.setData("from", "sidebar");
};
</script>

<template>
  <div
    class="side-container"
    @drop="onDrop"
    @dragenter.prevent
    @dragover.prevent
  >
    <div class="drop-zone">
      <div
        v-for="item in sidebarItems"
        :key="item.id"
        class="drag-el"
        @dragstart="startDrag($event, item)"
        :draggable="true"
      >
        <div class="name-container">
          <img :src="item.image" :alt="`Image for ${item.id}`" />
          <div class="item-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-container {
  width: 250px;
  background-color: rgb(56, 0, 40);
  padding: 10px;
  border-left: 3px solid rgb(76, 30, 63);
}

.drop-zone {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.name-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.item-name {
  color: rgb(255, 200, 0);
  font-size: 20px;
  font-weight: 300;
}
.name-container img {
  width: 68px;
  height: 70px;
  cursor: grab;
  margin-right: 20px;
}
.drag-el:nth-last-of-type(1) {
  margin-bottom: 0;
}
</style>
