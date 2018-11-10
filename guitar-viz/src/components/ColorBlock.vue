<template>
    <div class="color-block" :style="'background-color: ' + color"></div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.color-block {
    width: 28px;
    height: 15px;
    border: 0.5px solid rgba(0, 0, 0, 0.1);
}
</style>
