<template>
    <b-dropdown ref="colorpicker">
        <button class="button" slot="trigger">
            <color-block :color="value"></color-block>
            <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
        </button>

        <b-dropdown-item custom paddingless>
            <button
                    v-for="color in colors" :key="color"
                    class="button color-button"
                    :class="{'selected-color': color === value}"
                    @click="onColorPicked(color)">
                <color-block :color="color"></color-block>
            </button>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
import ColorBlock from './ColorBlock.vue';

export default {
    components: {
        ColorBlock
    },
    props: {
        id: 0,
        model: {},
        value: String,
        change: {
            type: Function,
            default: function() {
                return function(value) {}
            }
        }
    },
    data() {
        return {
            colors: ["RED", "ORANGE", "YELLOW", "GREEN", "AQUA", "BLUE", "PURPLE", "PINK"]
        };
    },
    methods: {
        onColorPicked(color) {
            this.change(color);
            this.$refs.colorpicker.toggle();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/vendor.style.scss";

.color-button {
    margin: 5px;
}

.selected-color {
    border: 1px solid $blue;

    &:hover {
        border: 1px solid darken($blue, 10%);
    }
}
</style>
