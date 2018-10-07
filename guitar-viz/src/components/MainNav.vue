<template>
    <div class="columns is-centered container is-fullhd">
        <div class="column is-10">
            <nav class="navbar is-transparent">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <router-link to="/">
                            <p class="is-size-3 has-text-weight-semibold">GuitViz</p>
                        </router-link>
                    </a>

                    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="mainnavbar">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="mainnavbar" class="navbar-menu">
                    <div class="navbar-start">
                        <div v-if="isLogged" class="navbar-item" :class="homeBtnClass">
                            <router-link to="/">
                                <span class="icon">
                                    <i class="fas fa-home"></i>
                                </span>
                                {{ i18n.getStr("HOME") }}
                            </router-link>
                        </div>
                        <div v-if="isLogged" class="navbar-item" :class="settingsBtnClass">
                            <router-link to="/settings">
                                <span class="icon">
                                    <i class="fas fa-cog"></i>
                                </span>
                                {{ i18n.getStr("SETTINGS") }}
                            </router-link>
                        </div>
                    </div>
                    <div class="navbar-end">
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                {{ i18n.getStr("LANGUAGE") }}
                            </a>

                            <div class="navbar-dropdown">
                                <a
                                    class="navbar-item"
                                    v-for="language in languages" 
                                    :key="language.id"
                                    :class="{'is-active': language.id === activeLanguage}"
                                    @click="changeLanguage(language.id)">
                                    {{ language.text }}
                                </a>
                            </div>
                        </div>
                        <div class="navbar-item">
                            <div class="field">
                                <p class="control">
                                    <a v-if="isLogged" @click="logout" class="button is-danger is-outlined logout-button">
                                        <span class="icon">
                                            <i class="fas fa-sign-out-alt"></i>
                                        </span>
                                        {{ i18n.getStr("LOGOUT") }}
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
import i18n from '../i18n.dictionary.js';
import Vuex from 'vuex';

const languagesMap = {
    en: "English",
    ru: "Русский"
};

export default {
    data() {
        return {
            i18n,
            currentPath: "/login"
        }
    },
    mounted() {
        this.currentPath = this.$router.currentRoute.path;

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
        },
        changeLanguage(lang) {
            if (lang !== this.activeLanguage) {
                this.$store.dispatch("changeLanguage", lang);
                let route = this.$route.path;

                this.$router.push("/not/existing/url");
                setTimeout(() => {
                    this.$router.push(route); //Sorta hack to update all text fields after changing language
                }, 0);
            }
        }
    },
    computed: {
        ...Vuex.mapGetters({
            isLogged: "isLogged",
            activeLanguage: "language"
        }),
        languages() {
            let languages = this.$store.getters.languages;
            return Object.keys(languagesMap)
                            .map(l => ({id: l, text: languagesMap[l]}))
        },
        console() {
            return console;
        },
        homeBtnClass() {
            return {
                'has-background-light': this.currentPath === '/'
            };
        },
        settingsBtnClass() {
            return {
                'has-background-light': this.currentPath === '/settings'
            };
        }
    },
    watch: {
        "$route"(to, from) {
            this.currentPath = to.path;
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar-menu .navbar-item span.icon {
    margin-right: 0;
}
</style>
