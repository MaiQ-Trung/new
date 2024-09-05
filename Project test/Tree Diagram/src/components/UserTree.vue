<template>
  <div class="tree relative mt-10 flex flex-col w-max items-center"
  :class="{'CEO': users[0].name === ceoName }"
  >
    <div
      class="node p-2 relative flex justify-center w-max bg-white border border-gray-300 rounded-md"
    >
      {{ users[0].name }}
    </div>
    <li
      v-if="filteredChildren.length"
      class="children relative flex justify-center gap-5"
    >
      <UserTree
        v-for="(child, index) in filteredChildren"
        :key="index"
        :users="[child]"
        :ceoName="ceoName"
      />
    </li>
  </div>
</template>

<script setup>
import { computed } from "vue";
import UserTree from "./UserTree.vue";

const props = defineProps({
  users: Array,
  ceoName: String,
});

const filteredChildren = computed(() => {
  const filterNodes = (nodes) => {
    return nodes
      .filter((node) => node.name !== "0")
      .map((node) => ({
        ...node,
        children: node.children ? filterNodes(node.children) : [],
      }));
  };
  return filterNodes(props.users[0].children || []);
});
</script>

<style scoped>
.tree::before {
  content: "";
  position: absolute;
  top: -20px;
  border-top: 1px solid #000000;
  transform: translateX(-50%);
  width: 100%;
  height: 20px;
}

.tree::after {
  content: "";
  position: absolute;
  top: -20px;
  border-top: 1px solid #000000;
  border-left: 1px solid #000000;
  transform: translateX(50%);
  width: 100%;
  height: 20px;
}

.children::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid black;
  transform: translateX(-50%);
  width: 1px;
  height: 20px;
}

.tree:first-child::before {
  transform: translateX(50%);
  border-top: none;
}

.tree:last-child::after {
  transform: translateX(50%);
  border-top: none;
}

.CEO::before,
.CEO::after {
  display: none;
}

</style>
