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
