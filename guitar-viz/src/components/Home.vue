<template>
    <div>
        <h1 class="title">Hello user, my old friend...</h1>

        <p class="no-devices-message is-size-4 has-text-centered has has-text-weight-semibold" v-if="!connectedDevice">At the moment you don't have any device connected.<br>You can connect to device by clicking this <a class="button is-success" @click="openAddDeviceModal()">button</a></p>

        <device-page v-if="connectedDevice" :device="connectedDevice"></device-page>
    </div>
</template>

<script>
import dict from '../dict.js';
import Vuex from 'vuex';
import AddDeviceModal from './AddDeviceModal.vue';
import DevicePage from './DevicePage.vue';

export default {
    components: {
        AddDeviceModal,
        DevicePage
    },
    computed:{
        ...Vuex.mapGetters(['connectedDevice'])
    },
    methods: {
        openAddDeviceModal() {
            this.$modal.open({
                parent: this,
                component: AddDeviceModal,
                hasModalCard: true
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.no-devices-message {
    margin-top: 40px;
}
</style>
