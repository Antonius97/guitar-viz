<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ i18n.getStr("ADD_NEW_DEVICE")}}</p>
        </header>

        <section class="modal-card-body">
            <p class="is-size-5 has-text-weight-semibold" v-if="!bluetoothEnabled">{{ i18n.getStr("TO_ADD_NEW_DEVICE_YOU_SHOULD") }} <a class="button is-success is-small is-size-6" @click="enableBluetooth">{{ i18n.getStr("TURN_ON_BLUETOOTH") }}</a></p>

            <div v-if="bluetoothEnabled">
                <div class="panel">
                    <a class="panel-block" v-for="device in bluetoothDevices" :key="device.name" @click="connectToDevice(device.name)">
                        <span class="panel-icon">
                            <i class="fab fa-bluetooth-b"></i>
                        </span>
                        {{device.name}}
                    </a>
                    <div class="panel-block" v-if="!bluetoothDevices.length">
                        <p class="is-size-5 has-text-centered is-fullwidth">{{ i18n.getStr("NO_DEVICES_FOUND") }}</p>
                    </div>
                    <div class="panel-block">
                        <button class="button is-link is-outlined is-fullwidth refresh-button" @click="loadBluetoothDevices()">
                            <span class="panel-icon">
                                <i class="fas fa-redo-alt"></i>
                            </span>
                            {{ i18n.getStr("REFRESH") }}
                        </button>
                    </div>
                    <b-loading :is-full-page="false" :active.sync="bluetoothDevicesLoading"></b-loading>
                </div>

                <p>{{ i18n.getStr("TAP_ON_DEVICE_TO_CONNECT") }}</p>
            </div>
        </section>

        <footer class="modal-card-foot">
            <button class="button" @click="$parent.close()">{{ i18n.getStr("CLOSE") }}</button>
        </footer>
    </div>
</template>

<script>
import dict from '../dict.js';
import i18n from '../i18n.dictionary.js';
import Vuex from 'vuex';

export default {
    data() {
        return {
            i18n
        }
    },
    computed: {
        ...Vuex.mapGetters(["bluetoothEnabled", "bluetoothDevices", "bluetoothDevicesLoading"])
    },
    methods: {
        enableBluetooth() {
            this.$store.dispatch("enableBluetooth");
            this.loadBluetoothDevices();
        },
        loadBluetoothDevices() {
            this.$store.dispatch("loadBluetoothDevices");
        },
        connectToDevice(deviceName) {
            this.$store.dispatch("connectToDevice", deviceName)
                .then(device => {
                        this.$store.dispatch("setConnectedDevice", device); //pass connected device to home component
                        this.$toast.open({
                            duration: 3000,
                            message: `${this.i18n.getStr("SUCCESSFULY_CONNECTED_TO")} ${deviceName}`,
                            position: 'is-bottom',
                            type: 'is-success'
                        });
                        this.$parent.close();
                    },
                    () => {
                        this.$toast.open({
                            duration: 3000,
                            message: `${this.i18n.getStr("FAILED_TO_CONNECT_TO")} ${deviceName}`,
                            position: 'is-bottom',
                            type: 'is-danger'
                        });
                });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/vendor.style.scss";

.refresh-button {
    i {
        color: $blue;
    }

    &:hover i,
    &:focus i,
    &:active i {
        color: $white;
    }
}
</style>
