<template>
    <p class="is-size-5 has has-text-weight-semibold">
        {{ i18n.getStr("DEVICE_IS_NOT_CALIBRATED_PRESS") }} 
        <a class="button is-success" @click="openCalibrateDeviceModal()">{{ i18n.getStr("TO_THE_BUTTON") }}</a> 
        {{ i18n.getStr("TO_CALIBRATE") }}
    </p>
</template>

<script>
import i18n from '../i18n.dictionary.js';
import CalibrateDeviceModal from './CalibrateDeviceModal.vue';

export default {
    components: {
        CalibrateDeviceModal
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
        openCalibrateDeviceModal() {
            this.$modal.open({
                parent: this,
                component: CalibrateDeviceModal,
                hasModalCard: true
            });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
