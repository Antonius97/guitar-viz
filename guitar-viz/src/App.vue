<template>
    <div>
        <main-nav></main-nav>
        <div class="container is-fullhd">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import MainNav from "./components/MainNav.vue";

export default {
  components: {
    MainNav
  }
};
</script>

<style lang="scss">
</style>
