<template>
    <div>
        <form @submit.prevent="register()" class="signup-form">
            <b-field
                :label="i18n.getStr('USERNAME')"
                v-bind:type="nameStatus === 'idle' ? '' : (nameStatus === 'success' ? 'is-success' : 'is-danger')"
                :message="nameMessage">
                <b-input
                    type="text"
                    v-model="name"
                    :placeholder="i18n.getStr('USERNAME')"
                    required
                    icon-pack="fas"
                    icon="user"></b-input>
            </b-field>
            <b-field
                :label="i18n.getStr('PASSWORD')"
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
                :label="i18n.getStr('CONFIRM_PASSWORD')"
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
                <button type="submit" class="button is-primary is-fullwidth">{{ i18n.getStr("SIGN_UP") }}</button>
            </div>
        </form>
        <p class="login-text is-text is-size-6 has-text-right">
            {{ i18n.getStr("HAVE_ACCOUNT") }} <a class="login-btn is-text is-paddingless is-marginless is-size-6" @click="gotoLoginPage()">{{ i18n.getStr("LOGIN") }}</a> {{ i18n.getStr("TO_ENTER") }}
        </p>
    </div>
</template>

<script>
import Crypto from '../utils/Crypto.js';
import dict from '../dict';
import i18n from '../i18n.dictionary.js';

export default {
    data() {
        return {
            i18n,
            name: "",
            newPass: "",
            confPass: "",
            validName: "",
            validNewPass1: "",
            validConfPass: "",
            invalidName: "",
            invalidNewPass1: "",
            invalidConfPass: ""
        }
    },
    methods: {
        register() {
            let valid = this.validateFields();
            if (!valid) return;
            this.$store.dispatch("signup", {
                name: this.name,
                pass: Crypto.encode(this.newPass, dict.PASS)
            }).then(
                (status) => {
                    this.$toast.open({
                        duration: 3000,
                        message: `You was successfuly registered, welcome!`,
                        position: 'is-bottom',
                        type: 'is-success'
                    });
                    this.$router.push("/");
                },
                (status) => {
                    switch(status) {
                        case dict.INVALID_NAME: {
                            this.invalidName = this.name;
                            break;
                        }
                    }
                }
            );
            this.$store.dispatch("login", {
                name: this.name,
                pass: Crypto.encode(this.newPass, dict.PASS)
            })
        },
        validateFields() {
            return [this.nameStatus, this.newPassStatus, this.confPassStatus].every(status => ["success", "idle"].includes(status));
        },
        gotoLoginPage() {
            this.$router.push("/login");
        }
    },
    computed: {
        nameStatus() {
            if (this.name === this.validName && this.name) {
                return "success";
            } else if (this.name === this.invalidName && this.name) {
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
            } else if (this.newPass === this.name && this.newPass) {
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
        nameMessage() {
            var status = this.nameStatus;
            return status === "fail" ? "User with this name is already exists" : "";
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
.signup-form .field {
    margin-bottom: 20px;
}
.login-text {
    margin-top: 10px;

    .login-btn {
        text-decoration: underline;
    }
}
</style>
