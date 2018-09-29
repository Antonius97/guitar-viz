<template>
    <div>
        <form @submit.prevent="register()" class="signup-form">
            <b-field
                label="Username"
                v-bind:type="nameStatus === 'idle' ? '' : (nameStatus === 'success' ? 'is-success' : 'is-danger')"
                :message="nameMessage">
                <b-input
                    type="text"
                    v-model="name"
                    placeholder="Username"
                    required
                    icon-pack="fas"
                    icon="user"></b-input>
            </b-field>
            <b-field
                label="Password"
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
                label="Confirm password"
                v-bind:type="confPassStatus === 'idle' ? '' : (confPassStatus === 'success' ? 'is-success' : 'is-danger')"
                :message="confPassMessage">
                <b-input
                    type="password"
                    v-model="confPass"
                    placeholder="Enter password one more time"
                    password-reveal
                    required
                    icon-pack="fas"
                    icon="lock"></b-input>
            </b-field>
            <div class="control">
                <button type="submit" class="button is-primary is-fullwidth">Sign up</button>
            </div>
        </form>
        <p class="login-text is-text is-size-6 has-text-right">
            Have account? Press <a class="login-btn is-text is-paddingless is-marginless is-size-6" @click="gotoLoginPage()">Login</a> to enter
        </p>
    </div>
</template>

<script>
import Crypto from '../utils/Crypto.js';
import dict from '../dict';

export default {
    data() {
        return {
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
