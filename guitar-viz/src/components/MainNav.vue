<template>
    <nav class="navbar is-dark">
        <div class="container is-fullhd">
            <div class="navbar-menu is-active">
                <div class="navbar-start">
                    <router-link v-if="isLogged" to="/" class="navbar-item" :class="{'is-active': currentPath === '/'}">Home</router-link>
                </div>
                <div class="navbar-end">
                    <a href="#" v-if="isLogged" @click="logout" class="navbar-item">Logout</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import Vuex from 'vuex';

export default {
    methods: {
        logout(e) {
            e.preventDefault();
            this.$store.dispatch('logout');
            this.$router.push("/login");
        }
    },
    computed: {
        ...Vuex.mapGetters(['isLogged']),
        currentPath() {
            return this.$router.currentRoute.path;
        }
    }
}
</script>
