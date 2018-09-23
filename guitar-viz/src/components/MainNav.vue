<template>
    <div class="columns is-centered container is-fullhd">
        <div class="column is-10">
            <nav class="navbar is-transparent">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <p class="is-size-3 has-text-weight-semibold">GuitViz</p>
                    </a>

                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="mainnavbar">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="mainnavbar" class="navbar-menu">
                    <div class="navbar-start">
                        <router-link v-if="isLogged" to="/" class="navbar-item" :class="{'is-active': currentPath === '/'}">
                            <span class="icon">
                                <i class="fas fa-home"></i>
                            </span>
                            Home
                        </router-link>
                    </div>
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="field">
                                <p class="control">
                                    <a v-if="isLogged" @click="logout" class="button is-danger is-outlined logout-button">
                                        <span class="icon">
                                            <i class="fas fa-sign-out-alt"></i>
                                        </span>
                                        Logout
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import Vuex from 'vuex';

export default {
    mounted() {
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    },
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

<style lang="scss" scoped>
.navbar-menu .navbar-item span.icon {
    margin-right: 0;
}
</style>
