<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div class="Main">
  <Side/>
  <View/>
  <Online/>
</div>
</template>
<script>
import Side from './Main component/Side.vue'
import View from './Main component/View.vue'
import Online from './Main component/Online.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Main',
  components: {
    Side,
    View,
    Online,
  }
}
</script>
<style scoped>
.Main {
    display: grid;
    grid-template-columns: 350px 710px 350px;
    background-color: #4b4b4c;
    width: 100%;
    height: 1000vh;
    position: static;
    top: 65px;
}
</style>