<template>
  <div class="tree relative text-center">
    <div
      class="node relative inline-block m-auto px-2 bg-white border border-gray-300 rounded-md"
    >
      {{ users[0].name }}
    </div>
    <div class="children relative flex justify-center gap-5 m-5">
      <UserTree
        v-for="(child, index) in users[0].children"
        :key="index"
        :users="[child]"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  users: Array,
});
</script>

<style scoped></style>
