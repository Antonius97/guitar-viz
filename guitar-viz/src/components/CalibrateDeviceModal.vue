<template>
    
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{{ i18n.getStr("CALIBRATE_DEVICE")}}</p>
        </header>

        <section class="modal-card-body">
            <a class="button" @click="setCalibrated()">Calibrate</a>
        </section>

        <footer class="modal-card-foot">
            <button class="button" @click="$parent.close()">{{ i18n.getStr("CLOSE") }}</button>
        </footer>
    </div>
</template>

<script>
import i18n from '../i18n.dictionary.js';

export default {
    data() {
        return {
            i18n
        };
    },
    methods: {
        setCalibrated() {
            this.$store.dispatch("setDeviceCalibrated");
            this.$parent.close();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
