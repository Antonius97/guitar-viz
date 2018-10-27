<template>
    <div class="tile is-ancestor">
        <div 
                class="tile is-parent is-4 is-vertical"
                v-for="column in columns"
                :key="column.id">
            <div class="tile is-child">
                <div
                        class="card"
                        v-for="card in column.cards"
                        :key="card.id"
                        :class="{'mode-active': isModeActive(card.id)}"
                        @click="setActiveMode(card.id)">
                    <div class="card-image">
                        <div class="mode-visual mode-visual-1"></div>
                    </div>
                    <div class="card-content">
                        <p class="title">{{ card.title }}</p>
                        <p class="subtitle is-6" v-if="card.subtitle">{{ card.subtitle }}</p>
                        <div
                                class="card-content-container"
                                v-html="card.content"
                                :class="{'active': isModeActive(card.id)}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import i18n from '../i18n.dictionary';
import Vuex from 'vuex';

export default {
    data() {
        return {
            i18n,
            columnsNumber: 3,
            cards: [{
                id: 0,
                title: i18n.getStr("VU_METER"),
                subtitle: i18n.getStr("GREEN_TO_RED"),
                content: `<div>1</div>`
            }, {
                id: 1,
                title: i18n.getStr("VU_METER"),
                subtitle: i18n.getStr("SMOOTH_RUNNING_RAINBOW"),
                content: `<div>2</div>`
            }, {
                id: 2,
                title: i18n.getStr("LIGHTSOUND_BY_FREQ"),
                subtitle: i18n.getStr("5_LINES"),
                content: `<div>3</div>`
            }, {
                id: 3,
                title: i18n.getStr("LIGHTSOUND_BY_FREQ"),
                subtitle: i18n.getStr("3_LINES"),
                content: `<div>4</div>`
            }, {
                id: 4,
                title: i18n.getStr("LIGHTSOUND_BY_FREQ"),
                subtitle: i18n.getStr("1_LINE"),
                content: `<div>5</div>`
            }, {
                id: 5,
                title: i18n.getStr("STROBE_LIGHT"),
                content: `<div>6</div>`
            }, {
                id: 6,
                title: i18n.getStr("BACKLIGHT"),
                content: `<div>7</div>`
            }, {
                id: 7,
                title: i18n.getStr("RUNNING_FREQ"),
                content: `<div>8</div>`
            }, {
                id: 8,
                title: i18n.getStr("SPECTRE_ANALYZER"),
                content: `<div>9</div>`
            }]
        };
    },
    methods: {
        isModeActive(mode) {
            return mode === this.activeMode;
        },
        getModeCards(column) {
            return this.cards.filter((c, i) => (i % this.columnsNumber) === column);
        },
        setActiveMode(id) {
            this.$store.dispatch("setActiveMode", id);
        }
    },
    computed: {
        ...Vuex.mapGetters(['activeMode']),
        cardRows() {
            return Math.ceil(this.cards.length / this.columnsNumber);
        },
        columns() {
            return [...Array(Math.min(this.cards.length, 3))].map((a, i) => ({id: i + 1, cards: this.getModeCards(i)}));
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/vendor.style.scss";

.card {
    background-origin: center center;
    transition: transform 0.25s;
    margin-bottom: 30px;

    &:not(.mode-active):hover {
        transform: scale(1.03);
    }

    .title {
        margin-bottom: 2rem;
    }

    .subtitle {
        color: gray;
    }
}

.mode-visual {
    width: 100%;
    height: 150px;
    background-color: lightgray;
}

.mode-active {
    outline: 3px solid rgba($blue, 0.5);
    transform: scale(1.02);
}

.card-content-container {
    opacity: 0;
    visibility: hidden;
    height: 0;
    transition: opacity 0.1s 0.15s,
                height 0.1s;

    &.active {
        height: 100px;
        opacity: 1;
        visibility: visible;
    }
}
</style>
