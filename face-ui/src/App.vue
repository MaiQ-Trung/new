<template>
<Header/>
<Main/>
</template>

<script>
import Header from './components/Header.vue'
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Header,
    Main,
  }
}
</script>

<style lang="scss">
@import './assets/css/styles.scss';
</style>