<template>
    <div>
        <h1 class="title">{{ i18n.getStr("HELLO_USER_MY_OLD_FRIEND", username) }}</h1>

        <p class="no-devices-message is-size-4 has-text-centered has has-text-weight-semibold" v-if="!connectedDevice">{{ i18n.getStr("DONT_HAVE_CONNECTED_DEVICES") }}<br>{{ i18n.getStr("TO_CONNECT_PRESS") }} <a class="button is-success" @click="openAddDeviceModal()">{{ i18n.getStr("TO_THE_BUTTON") }}</a></p>

        <device-page v-if="connectedDevice" :device="connectedDevice"></device-page>
    </div>
</template>

<script>
import dict from '../dict.js';
import i18n from '../i18n.dictionary.js';
import Vuex from 'vuex';
import AddDeviceModal from './AddDeviceModal.vue';
import DevicePage from './DevicePage.vue';

export default {
    components: {
        AddDeviceModal,
        DevicePage
    },
    data() {
        return {
            i18n
        };
    },
    computed:{
        ...Vuex.mapGetters(['connectedDevice', 'username'])
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
