<template>
    <div>
        <p class="is-size-5">Connected to <span class="has-text-weight-semibold">{{device.name}}</span> (<a class="is-text is-paddingless is-marginless is-size-5" @click="disconnect()">Disconnect</a>)</p>
    </div>
</template>

<script>
export default {
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
    }
}
</script>

<style lang="scss" scoped>

</style>
