<template>
    <div>
        <main-nav></main-nav>
        <div class="container is-fullhd columns is-centered content-container">
            <div class="column is-10">
                <router-view></router-view>
            </div>
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
.content-container {
    margin-top: 40px;
}
</style>
