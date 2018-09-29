<template>
    <form @submit.prevent="changePassword()" class="change-pass-form">
        <b-field
            label="Old password"
            v-bind:type="oldPassStatus === 'idle' ? '' : (oldPassStatus === 'success' ? 'is-success' : 'is-danger')"
            :message="oldPassMessage">
            <b-input
                type="password"
                v-model="oldPass"
                placeholder="Enter old password"
                required
                password-reveal
                icon-pack="fas"
                icon="lock"></b-input>
        </b-field>
        <b-field
            label="New password"
            v-bind:type="newPassStatus === 'idle' ? '' : (newPassStatus === 'success' ? 'is-success' : 'is-danger')"
            :message="newPassMessage">
            <b-input
                type="password"
                v-model="newPass"
                placeholder="Enter new password"
                password-reveal
                required
                icon-pack="fas"
                icon="lock"></b-input>
        </b-field>
        <b-field
            label="Confirm new password"
            v-bind:type="confPassStatus === 'idle' ? '' : (confPassStatus === 'success' ? 'is-success' : 'is-danger')"
            :message="confPassMessage">
            <b-input
                type="password"
                v-model="confPass"
                placeholder="Enter new password one more time"
                password-reveal
                required
                icon-pack="fas"
                icon="lock"></b-input>
        </b-field>
        <div class="control">
            <button type="submit" class="button is-primary is-fullwidth">Change password</button>
        </div>
    </form>
</template>

<script>
import Crypto from '../utils/Crypto.js';
import dict from '../dict';

export default {
    data() {
        return {
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
                        message: `Password was successfuly changed`,
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
            return status === "fail" ? "Incorrect old password" : "";
        },
        newPassMessage() {
            var status = this.newPassStatus;
            let message = status === "fail" ? "Incorrect new password" : "";
            message = status === "notmatching" ? "New password should not be equal to old password" : message;
            return message;
        },
        confPassMessage() {
            var status = this.confPassStatus;
            let message = status === "fail" ? "Incorrect confirmation of new password" : "";
            message = status === "notmatching" ? "New passwords doesn't matching" : message;
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
