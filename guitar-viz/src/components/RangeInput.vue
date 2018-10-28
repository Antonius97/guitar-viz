<template>
    <input
            type="range"
            class="range-input"
            :min="min"
            :max="max"
            :value="value"
            @input="change">
</template>

<script>
export default {
    props: {
        model: {},
        min: Number,
        max: Number,
        value: Number,
        change: {
            type: Function,
            default: function() {
                return function(value) {}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/vendor.style.scss";

.range-input {
    -webkit-appearance: none;
    background: transparent;
    width: 100%;
    margin-bottom: 20px;

    &:focus {
        outline: none;
    }

    &::-webkit-slider-runnable-track{
        width: 100%;
        height: 3px;
        border-radius: 1.5px;
        background-color: rgba(saturate(lighten($blue, 10%), 10%), 0.3);
    }

    &::-webkit-slider-thumb {
        position: relative;
        top: -6px;
        -webkit-appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: saturate(lighten($blue, 10%), 10%);
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
}
</style>
