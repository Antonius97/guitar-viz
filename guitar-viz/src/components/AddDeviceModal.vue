<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Add new device</p>
        </header>

        <section class="modal-card-body">
            <p class="is-size-5 has-text-weight-semibold" v-if="!bluetoothEnabled">To add new device you should <a class="button is-success is-small is-size-6" @click="enableBluetooth">turn on bluetooth</a></p>

            <div v-if="bluetoothEnabled">
                <div class="panel">
                    <a class="panel-block" v-for="device in bluetoothDevices" :key="device.name" @click="connectToDevice(device.name)">
                        <span class="panel-icon">
                            <i class="fab fa-bluetooth-b"></i>
                        </span>
                        {{device.name}}
                    </a>
                    <div class="panel-block" v-if="!bluetoothDevices.length">
                        <p class="is-size-5 has-text-centered is-fullwidth">No devices found</p>
                    </div>
                    <div class="panel-block">
                        <button class="button is-link is-outlined is-fullwidth refresh-button" @click="loadBluetoothDevices()">
                            <span class="panel-icon">
                                <i class="fas fa-redo-alt"></i>
                            </span>
                            Refresh
                        </button>
                    </div>
                    <b-loading :is-full-page="false" :active.sync="bluetoothDevicesLoading"></b-loading>
                </div>

                <p>Tap on device to connect</p>
            </div>
        </section>

        <footer class="modal-card-foot">
            <button class="button" @click="$parent.close()">Close</button>
        </footer>
    </div>
</template>

<script>
import dict from '../dict.js';
import Vuex from 'vuex';

export default {
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
                            message: `Successfuly connected to ${deviceName}`,
                            position: 'is-bottom',
                            type: 'is-success'
                        });
                        this.$parent.close();
                    },
                    () => {
                        this.$toast.open({
                            duration: 3000,
                            message: `Failed to connect to ${deviceName}`,
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
