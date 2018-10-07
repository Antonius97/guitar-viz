<template>
    <div>
        <p class="is-size-5">{{ i18n.getStr("CONNECTED_TO") }} <span class="has-text-weight-semibold">{{device.name}}</span> (<a class="is-text is-paddingless is-marginless is-size-5" @click="disconnect()">{{ i18n.getStr("DISCONNECT") }}</a>)</p>

        <br>

        <calibrate-device-block
            :device="device"
            v-if="!deviceCalibrated">
        </calibrate-device-block>
    </div>
</template>

<script>
import i18n from '../i18n.dictionary.js';
import Vuex from 'vuex';
import CalibrateDeviceBlock from './CalibrateDeviceBlock.vue';

export default {
    components: {
        CalibrateDeviceBlock
    },
    data() {
        return {
            i18n
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

</style>
