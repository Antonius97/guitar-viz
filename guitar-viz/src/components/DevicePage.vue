<template>
    <div>
        <p class="is-size-5">{{ i18n.getStr("CONNECTED_TO") }} <span class="has-text-weight-semibold">{{device.name}}</span> (<a class="is-text is-paddingless is-marginless is-size-5" @click="disconnect()">{{ i18n.getStr("DISCONNECT") }}</a>)</p>

        <br>

        <calibrate-device-block
            :device="device"
            v-if="!deviceCalibrated">
        </calibrate-device-block>

        <div class="device-options-block">
            <div class="block device-options-container" :class="{disabled: !deviceCalibrated}">
                <h2 class="title">{{ i18n.getStr("COMMON_SETTINGS") }}</h2>
                <div class="box">
                    <div class="field is-horizontal">
                        <div class="field-label is-normal is-pulled-left">
                            <label class="label">{{i18n.getStr("BRIGHTNESS")}} ({{ brightness }})</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input type="range" class="range-input" min="0" max="1000" value="0" v-model="brightness">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="field is-horizontal">
                        <div class="field-label is-normal is-pulled-left">
                            <label class="label">{{i18n.getStr("SENSITIVITY")}} ({{ sensitivity }})</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <div class="control">
                                    <input type="range" class="range-input" min="0" max="1000" value="0" v-model="sensitivity">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 class="title">{{ i18n.getStr("MODES") }}</h2>
                <div class="">
                    <modes-block></modes-block>
                </div>
            </div>

            <p class="disabled-text">{{ i18n.getStr("DISABLED_DEVICE_OPTIONS") }}</p>
        </div>
    </div>
</template>

<script>
import i18n from '../i18n.dictionary.js';
import Vuex from 'vuex';
import CalibrateDeviceBlock from './CalibrateDeviceBlock.vue';
import ModesBlock from './ModesBlock';

export default {
    components: {
        CalibrateDeviceBlock,
        ModesBlock
    },
    data() {
        return {
            i18n,
            brightness: 0,
            sensitivity: 0
        };
    },
    props: {
        device: {
            type: Object,
            required: true
        }
    },
    methods: {
        disconnect() {
            this.$store.dispatch("disconnectFromDevice");
        }
    },
    computed: {
        ...Vuex.mapGetters(['deviceCalibrated'])
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/vendor.style.scss";

.range-input {
    -webkit-appearance: none;
    background: transparent;
    width: 100%;

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

.device-options-block {
    position: relative;
}

.device-options-container {
    position: relative;
    width: 100%;
    padding: 10px;

    &::after {
        content: "";
        display: none;
        visibility: hidden;
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(245, 245, 245, 0.9);
    }

    &.disabled::after {
        display: block;
        visibility: visible;
        opacity: 1;
    }

    & + .disabled-text {
        position: absolute;
        display: none;
        width: 100%;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &.disabled + .disabled-text {
        display: block;
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