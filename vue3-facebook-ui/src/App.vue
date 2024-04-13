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
  margin: 0;
  overflow-y: scroll;
}
body::-webkit-scrollbar {
  width: 10px;
}
body::-webkit-scrollbar-thumb {
  background-color: #e7e7f4;
  border-radius: 10px;
}
</style>
