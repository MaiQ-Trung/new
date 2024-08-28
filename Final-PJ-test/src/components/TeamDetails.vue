<template>
  <div>
    <div
      class="relative h-dvh bg-slate-50 max-h-dvh overflow-y-auto"
      @click.stop="showMenu = false"
    >
      <div class="container p-5">
        <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl mb-5">
          {{ route.params.groupName }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
