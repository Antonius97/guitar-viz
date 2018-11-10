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
                        <img v-if="card.previewSrc" :src="card.previewSrc" alt="1" width="100%">
                        <div v-if="!card.previewSrc" class="mode-visual mode-visual-1"></div>
                    </div>
                    <div class="card-content">
                        <p class="title">{{ card.title }}</p>
                        <p class="subtitle is-6" v-if="card.subtitle">{{ card.subtitle }}</p>
                        <div
                                class="card-content-container"
                                :class="{'active': isModeActive(card.id)}">
                            <div class="content">
                                <p>{{ card.description }}</p>

                                <br>

                                <aside class="menu" v-if="card.submodes && card.submodes.length !== 1">
                                    <p class="menu-label">{{ i18n.getStr("SUBMODES") }}</p>
                                    <ul class="menu-list">
                                        <li
                                                v-for="submode in card.submodes" 
                                                :key="submode.id">
                                            <a 
                                                    :class="{'is-active': isSubModeActive(submode.id)}"
                                                    @click="setActiveSubMode(submode.id)">
                                                {{submode.title}}
                                            </a>
                                        </li>
                                    </ul>
                                </aside>

                                <br>

                                <aside
                                        class="mode-settings menu"
                                        v-if="activeSubModeSettings.length">
                                    <p class="menu-label">{{ i18n.getStr("SETTINGS") }}</p>

                                    <div
                                            class="field is-horizontal"
                                            v-for="inp in activeSubModeSettings" :key="inp.id">
                                        <div class="field-label is-normal is-pulled-left">
                                            <label v-if="inp.type === 'color'" class="label">{{inp.label}}</label>
                                            <label v-else class="label">{{inp.label}} ({{ inp.value }})</label>
                                        </div>
                                        <div class="field-body">
                                            <div class="field">
                                                <div class="control">
                                                    <range-input
                                                        v-if="inp.type === 'range'"
                                                        :min="inp.min"
                                                        :max="inp.max"
                                                        :value="inp.value || 0"
                                                        :change="optionChanged.bind(this, inp.type, inp.id)"
                                                    >
                                                    </range-input>
                                                    <color-picker
                                                        v-if="inp.type === 'color'"
                                                        :id="inp._inp_id"
                                                        :value="inp.value || 'red'"
                                                        :change="optionChanged.bind(this, inp.type, inp.id)">
                                                    </color-picker>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
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

import RangeInput from './RangeInput.vue';
import ColorPicker from './ColorPicker.vue';

import previewImg1 from '../assets/mode_previews/1VU_opt.gif';
import previewImg2 from '../assets/mode_previews/2VU_opt.gif';
import previewImg3 from '../assets/mode_previews/3FREQ5LINES_opt.gif';
import previewImg4 from '../assets/mode_previews/4FREQ3LINES_opt.gif';
import previewImg5_1 from '../assets/mode_previews/5FREQ1LINE_opt.gif';
import previewImg5_2 from '../assets/mode_previews/5FREQ1LINE_LOW_opt.gif';
import previewImg5_3 from '../assets/mode_previews/5FREQ1LINE_MID_opt.gif';
import previewImg5_4 from '../assets/mode_previews/5FREQ1LINE_HIGH_opt.gif';

export default {
    components: {
        RangeInput,
        ColorPicker
    },
    data() {
        return {
            i18n,
            columnsNumber: 3,
            cards: [{
                id: 0,
                title: i18n.getStr("VU_METER"),
                subtitle: i18n.getStr("GREEN_TO_RED"),
                description: "1",
                previewSrc: previewImg1,
                submodes: [{
                    id: 0,
                    title: i18n.getStr("GREEN_TO_RED"),
                    previewSrc: previewImg1,
                    settings: [{
                        id: 0,
                        label: i18n.getStr("ANIMATION_SMOOTHNESS"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }]
            }, {
                id: 1,
                title: i18n.getStr("VU_METER"),
                subtitle: i18n.getStr("SMOOTH_RUNNING_RAINBOW"),
                description: "2",
                previewSrc: previewImg2,
                submodes: [{
                    id: 0,
                    title: i18n.getStr("SMOOTH_RUNNING_RAINBOW"),
                    previewSrc: previewImg2,
                    settings: [{
                        id: 0,
                        label: i18n.getStr("ANIMATION_SMOOTHNESS"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("RAINBOW_SPEED"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }]
            }, {
                id: 2,
                title: i18n.getStr("LIGHTSOUND_BY_FREQ"),
                subtitle: i18n.getStr("5_LINES"),
                description: "3",
                previewSrc: previewImg3,
                submodes: [{
                    id: 0,
                    title: i18n.getStr("5_LINES"),
                    previewSrc: previewImg3,
                    settings: [{
                        id: 0,
                        label: i18n.getStr("ANIMATION_SMOOTHNESS"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("SENSITIVITY"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }]
            }, {
                id: 3,
                title: i18n.getStr("LIGHTSOUND_BY_FREQ"),
                subtitle: i18n.getStr("3_LINES"),
                description: "4",
                previewSrc: previewImg4,
                submodes: [{
                    id: 0,
                    title: i18n.getStr("3_LINES"),
                    previewSrc: previewImg4,
                    settings: [{
                        id: 0,
                        label: i18n.getStr("ANIMATION_SMOOTHNESS"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("SENSITIVITY"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }]
            }, {
                id: 4,
                title: i18n.getStr("LIGHTSOUND_BY_FREQ"),
                subtitle: i18n.getStr("1_LINE"),
                description: "5",
                previewSrc: previewImg5_1,
                submodes: [{
                    id: 0,
                    title: i18n.getStr("3_FREQ"),
                    previewSrc: previewImg5_1,
                    settings: [{
                        id: 0,
                        label: i18n.getStr("ANIMATION_SMOOTHNESS"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("SENSITIVITY"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }, {
                    id: 1,
                    title: i18n.getStr("LOW_FREQ"),
                    previewSrc: previewImg5_2,
                    settings: [{
                        id: 0,
                        label: i18n.getStr("ANIMATION_SMOOTHNESS"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("SENSITIVITY"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }, {
                    id: 2,
                    title: i18n.getStr("MID_FREQ"),
                    previewSrc: previewImg5_3,
                    settings: [{
                        id: 0,
                        label: i18n.getStr("ANIMATION_SMOOTHNESS"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("SENSITIVITY"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }, {
                    id: 3,
                    title: i18n.getStr("HIGH_FREQ"),
                    previewSrc: previewImg5_4,
                    settings: [{
                        id: 0,
                        label: i18n.getStr("ANIMATION_SMOOTHNESS"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("SENSITIVITY"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }]
            }, {
                id: 5,
                title: i18n.getStr("STROBE_LIGHT"),
                description: "6",
                submodes: [{
                    id: 0,
                    title: i18n.getStr("3_LINES"),
                    settings: [{
                        id: 0,
                        label: i18n.getStr("FLASH_SMOOTHNESS"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("FLASH_FREQUENCY"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }]
            }, {
                id: 6,
                title: i18n.getStr("BACKLIGHT"),
                description: "7",
                submodes: [{
                    id: 0,
                    title: i18n.getStr("CONSTANT_COLOR"),
                    settings: [{
                        id: 0,
                        label: i18n.getStr("COLOR"),
                        type: "color",
                        value: "red"
                    }, {
                        id: 1,
                        label: i18n.getStr("SATURATION"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }, {
                    id: 1,
                    title: i18n.getStr("SMOOTH_COLOR_CHANGING"),
                    settings: [{
                        id: 0,
                        label: i18n.getStr("SPEED"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("SATURATION"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }, {
                    id: 2,
                    title: i18n.getStr("RUNNING_RAINBOW"),
                    settings: [{
                        id: 0,
                        label: i18n.getStr("SPEED"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("RAINBOW_STEP"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }]
            }, {
                id: 7,
                title: i18n.getStr("RUNNING_FREQ"),
                description: "8",
                submodes: [{
                    id: 0,
                    title: i18n.getStr("3_FREQ"),
                    settings: [{
                        id: 0,
                        label: i18n.getStr("SPEED"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("SENSITIVITY"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }, {
                    id: 1,
                    title: i18n.getStr("LOW_FREQ"),
                    settings: [{
                        id: 0,
                        label: i18n.getStr("SPEED"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("SENSITIVITY"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }, {
                    id: 2,
                    title: i18n.getStr("MID_FREQ"),
                    settings: [{
                        id: 0,
                        label: i18n.getStr("SPEED"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("SENSITIVITY"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }, {
                    id: 3,
                    title: i18n.getStr("HIGH_FREQ"),
                    settings: [{
                        id: 0,
                        label: i18n.getStr("SPEED"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("SENSITIVITY"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }]
                }]
            }, {
                id: 8,
                title: i18n.getStr("SPECTRE_ANALYZER"),
                description: "9",
                submodes: [{
                    id: 0,
                    title: i18n.getStr("SPECTRE_ANALYZER"),
                    settings: [{
                        id: 0,
                        label: i18n.getStr("COLOR_STEP"),
                        type: "range",
                        min: 0,
                        max: 10,
                        value: 0
                    }, {
                        id: 1,
                        label: i18n.getStr("COLOR"),
                        type: "color",
                        value: "red"
                    }]
                }]
            }]
        };
    },
    methods: {
        isModeActive(mode) {
            return mode === this.activeMode;
        },
        isSubModeActive(mode) {
            return mode === this.activeSubMode;
        },
        getModeCards(column) {
            return this.cards.filter((c, i) => (i % this.columnsNumber) === column);
        },
        setActiveMode(id) {
            if (id === this.activeMode) return;
            let oldActiveCardContentContainer = document.querySelector(".card-content-container.active");
            oldActiveCardContentContainer.style.height = `0`;

            let activeMode = this.cards[this.activeMode];
            activeMode.previewSrc = activeMode.submodes[0].previewSrc;

            this.$store.dispatch("setActiveMode", id);
            this.$store.dispatch("setActiveSubMode", 0);

            this.recalcActiveCardHeight();
        },
        setActiveSubMode(id) {
            this.$store.dispatch("setActiveSubMode", id);
            this.recalcActiveCardHeight();

            let activeMode = this.cards[this.activeMode];
            activeMode.previewSrc = activeMode.submodes[id].previewSrc;
        },
        optionChanged(type) {
            let fn;
            switch(type) {
                case "range": {
                    fn = this.rangeOptionChanged;
                    break;
                }
                case "color": {
                    fn = this.colorOptionChanged;
                    break;
                }
                default: {
                    fn = this.colorOptionChanged;
                    break;
                }
            }
            fn.apply(this, [...arguments].slice(1));
        },
        rangeOptionChanged(optionId, event) {
            let value = +(event.target.value || "0");

            let inpSettings = this.activeSubModeSettings.find(settings => settings.id === optionId);

            inpSettings.value = value;
        },
        colorOptionChanged(optionId, color) {
            let value = color;

            let inpSettings = this.activeSubModeSettings.find(settings => settings.id === optionId);

            inpSettings.value = value;
        },
        recalcActiveCardHeight() {
            setTimeout(() => {
                let newActiveCardContentContainer = document.querySelector(".card-content-container.active");

                let iChildrenHeight = [...newActiveCardContentContainer.children].reduce((s, h) => s + h.offsetHeight, 0);

                newActiveCardContentContainer.style.height = `${iChildrenHeight}px`;
            }, 0);
        }
    },
    computed: {
        ...Vuex.mapGetters(['activeMode', 'activeSubMode']),
        cardRows() {
            return Math.ceil(this.cards.length / this.columnsNumber);
        },
        columns() {
            return [...Array(Math.min(this.cards.length, 3))].map((a, i) => ({id: i + 1, cards: this.getModeCards(i)}));
        },
        activeSubModeSettings() {
            let activeMode = this.cards[this.activeMode];
            if (!activeMode.submodes || !activeMode.submodes.length) return [];

            let activeSubMode = activeMode.submodes[this.activeSubMode];
            if (!activeSubMode.settings || !activeSubMode.settings.length) return [];

            return activeSubMode.settings;
        }
    },
    mounted() {
        this.recalcActiveCardHeight();

        let id = 0;

        this.cards.forEach(card => {
            card.submodes.forEach(submode => {
                submode.settings.forEach(inp => inp._inp_id = id++);
            });
        });
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/vendor.style.scss";

.card {
    transform-origin: center center;
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

    &::after {
        content: "Active";
        display: block;
        position: absolute;
        width: 60px;
        height: 30px;
        top: 0;
        right: 0;
        text-align: center;
        background-color: lighten($blue, 5%);
        border-radius: 0 0 0 7.5px;
        color: #fff;
    }
}

.card-content-container {
    opacity: 0;
    visibility: hidden;
    height: 0;
    transition: opacity 0.1s 0.15s,
                height 0.1s;

    &.active {
        opacity: 1;
        visibility: visible;
    }

    ul.menu-list {
        list-style-type: none;
        margin-left: 0;
    }

    & .field-label {
        width: 15%;
        min-width: 150px;
    }

    & > .field {
        margin-bottom: 25px;
    }
}
</style>
