<template>
    <div>
        <div class="change-password-block block">
            <change-password-form></change-password-form>
        </div>
        
        <div class="change-language-block block">
            <change-language-block></change-language-block>
        </div>

        <div class="recalibrate-device-block block" v-if="connectedDevice">
            <recalibrate-device-block
                :device="device"
                v-if="deviceCalibrated">
            </recalibrate-device-block>
            <calibrate-device-block
                :device="device"
                v-else>
            </calibrate-device-block>
        </div>
    </div>
</template>

<script>
import Vuex from 'vuex';
import ChangePasswordForm from './ChangePasswordForm.vue';
import ChangeLanguageBlock from './ChangeLanguageBlock.vue';
import CalibrateDeviceBlock from './CalibrateDeviceBlock.vue';
import RecalibrateDeviceBlock from './RecalibrateDeviceBlock.vue';

export default {
    components: {
        ChangePasswordForm,
        ChangeLanguageBlock,
        CalibrateDeviceBlock,
        RecalibrateDeviceBlock
    },
    computed: {
        ...Vuex.mapGetters({
            device: "connectedDevice",
            deviceCalibrated: "deviceCalibrated",
            connectedDevice: "connectedDevice"
        })
    }
}
</script>

<style lang="scss" scoped>
    .block {
        margin-bottom: 4rem;
    }
</style>
