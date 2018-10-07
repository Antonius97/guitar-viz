<template>
    <div>
        <p class="is-text is-size-2 has-text-weight-semibold">{{ i18n.getStr("CHANGE_LANGUAGE") }}</p>
        <br>
        <div class="columns">
            <div class="column is-6">
                <div class="buttons has-addons">
                    <span
                        class="button"
                        v-for="language in languages"
                        :key="language.id"
                        :class="{'is-primary': activeLanguage === language.id}"
                        @click="changeLanguage(language.id)">
                        {{ language.text }}
                    </span>
                </div>
            </div>
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
            languages: Object.keys(languagesMap)
                            .map(l => ({id: l, text: languagesMap[l]}))
        }
    },
    computed: {
        activeLanguage() {
            return this.$store.getters.language;
        }
    },
    methods: {
        changeLanguage(lang) {
            if (lang !== this.activeLanguage) {
                this.$store.dispatch("changeLanguage", lang);
                let route = this.$route.path;

                this.$router.push("/");
                setTimeout(() => {
                    this.$router.push(route); //Sorta hack to update all text fields after changing language
                }, 0);
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
