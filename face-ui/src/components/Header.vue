<!-- eslint-disable vue/multi-word-component-names -->
<template>
<div class="header">
<Search/>
<Link/>
<Menu/>
</div>
</template>
<script>
import Search from './Header component/nav-search.vue'
import Link from './Header component/nav-link.vue'
import Menu from './Header component/nav-menu.vue'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Header',
    components: {
        Link : Link,
        Search : Search,
        Menu : Menu,
    }
}
</script>

<style lang="scss">
@import './Header component/assets/css/Header.scss';
</style>