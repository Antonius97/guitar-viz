<template>
    <div>
        <p class="is-text is-size-2 has-text-weight-semibold">{{ i18n.getStr("CHANGE_PASSWORD") }}</p>
        <br>
        <div class="columns">
            <div class="column is-6">
                <form @submit.prevent="changePassword()" class="change-pass-form">
                    <b-field
                        :label="i18n.getStr('OLD_PASSWORD')"
                        v-bind:type="oldPassStatus === 'idle' ? '' : (oldPassStatus === 'success' ? 'is-success' : 'is-danger')"
                        :message="oldPassMessage">
                        <b-input
                            type="password"
                            v-model="oldPass"
                            :placeholder="i18n.getStr('ENTER_OLD_PASSWORD')"
                            required
                            password-reveal
                            icon-pack="fas"
                            icon="lock"></b-input>
                    </b-field>
                    <b-field
                        :label="i18n.getStr('NEW_PASSWORD')"
                        v-bind:type="newPassStatus === 'idle' ? '' : (newPassStatus === 'success' ? 'is-success' : 'is-danger')"
                        :message="newPassMessage">
                        <b-input
                            type="password"
                            v-model="newPass"
                            :placeholder="i18n.getStr('ENTER_NEW_PASSWORD')"
                            password-reveal
                            required
                            icon-pack="fas"
                            icon="lock"></b-input>
                    </b-field>
                    <b-field
                        :label="i18n.getStr('CONFIRM_NEW_PASSWORD')"
                        v-bind:type="confPassStatus === 'idle' ? '' : (confPassStatus === 'success' ? 'is-success' : 'is-danger')"
                        :message="confPassMessage">
                        <b-input
                            type="password"
                            v-model="confPass"
                            :placeholder="i18n.getStr('ENTER_NEW_PASSWORD_ONE_MORE_TIME')"
                            password-reveal
                            required
                            icon-pack="fas"
                            icon="lock"></b-input>
                    </b-field>
                    <div class="control">
                        <button type="submit" class="button is-primary is-fullwidth">{{ i18n.getStr("CHANGE_PASSWORD") }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Crypto from '../utils/Crypto.js';
import i18n from '../i18n.dictionary.js';
import dict from '../dict';

export default {
    data() {
        return {
            i18n,
            oldPass: "",
            newPass: "",
            confPass: "",
            validOldPass: "",
            validNewPass1: "",
            validConfPass: "",
            invalidOldPass: "",
            invalidNewPass1: "",
            invalidConfPass: ""
        }
    },
    methods: {
        changePassword() {
            let valid = this.validateFields();
            if (!valid) return;
            this.$store.dispatch("changePassword", {
                oldPass: Crypto.encode(this.oldPass, dict.PASS),
                newPass: Crypto.encode(this.newPass, dict.PASS)
            }).then(
                (status) => {
                    this.oldPass = "";
                    this.newPass = "";
                    this.confPass = "";
                    this.$router.push("/settings");
                    this.$toast.open({
                        duration: 3000,
                        message: this.i18n.getStr("PASSWORD_WAS_SUCCESSFULY_CHANGED"),
                        position: 'is-bottom',
                        type: 'is-success'
                    });
                },
                (status) => {
                    switch(status) {
                        case dict.INVALID_PASS: {
                            this.invalidOldPass = this.oldPass;
                            break;
                        }
                    }
                }
            );
        },
        validateFields() {
            return [this.oldPassStatus, this.newPassStatus, this.confPassStatus].every(status => ["success", "idle"].includes(status));
        }
    },
    computed: {
        oldPassStatus() {
            if (this.oldPass === this.validOldPass && this.oldPass) {
                return "success";
            } else if (this.oldPass === this.invalidOldPass && this.oldPass) {
                return "fail";
            } else {
                return "idle";
            }
        },
        newPassStatus() {
            if (this.newPass === this.validNewPass1 && this.newPass) {
                return "success";
            } else if (this.newPass === this.invalidNewPass1 && this.newPass) {
                return "fail";
            } else if (this.newPass === this.oldPass && this.newPass) {
                return "notmatching";
            } else {
                return "idle";
            }
        },
        confPassStatus() {
            if (this.confPass === this.validConfPass && this.confPass) {
                return "success";
            } else if (this.confPass === this.invalidConfPass && this.confPass) {
                return "fail";
            } else if (this.confPass !== this.newPass && this.confPass) {
                return "notmatching";
            } else {
                return "idle";
            }
        },
        oldPassMessage() {
            var status = this.oldPassStatus;
            return status === "fail" ? this.i18n.getStr("INCORRECT_OLD_PASSWORD") : "";
        },
        newPassMessage() {
            var status = this.newPassStatus;
            let message = status === "fail" ? this.i18n.getStr("INCORRECT_NEW_PASSWORD") : "";
            message = status === "notmatching" ? this.i18n.getStr("NEW_PASSWORD_SHOULD_NOT_BE_EQUAL_TO_OLD_PASSWORD") : message;
            return message;
        },
        confPassMessage() {
            var status = this.confPassStatus;
            let message = status === "fail" ? this.i18n.getStr("INCORRECT_CONFIRMATION_OF_NEW_PASSWORD") : "";
            message = status === "notmatching" ? this.i18n.getStr("NEW_PASSWORDS_ARE_NOT_MATCHING") : message;
            return message;
        }
    }
}
</script>

<style lang="scss" scoped>
.change-pass-form .field {
    margin-bottom: 20px;
}
</style>
