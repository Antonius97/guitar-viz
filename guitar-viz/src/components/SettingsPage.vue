<template>
    <div class="change-password-block">
        <p class="is-text is-size-2 has-text-weight-semibold">Change password</p>
        <br>
        <div class="columns">
            <div class="column is-6">
                <change-password-form></change-password-form>
            </div>
        </div>
    </div>
</template>

<script>
import ChangePasswordForm from './ChangePasswordForm.vue';
export default {
    components: {
        ChangePasswordForm
    }
}
</script>

<style lang="scss" scoped>

</style>
