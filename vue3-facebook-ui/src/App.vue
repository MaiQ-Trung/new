<template>
  <Header />
  <Maincontent />
</template>

<script>
import Header from "./components/Header.vue";
import Maincontent from "./components/Maincontent.vue";
export default {
  name: "App",
  components: {
    Header,
    Maincontent,
  },
};
</script>

<style>
body {
  background-color: #4b4b4c;
}
</style>
