<template>
    <form @submit.prevent="login({name, pass})" class="login-form">
        <b-field
            label="Username"
            v-bind:type="nameStatus === 'idle' ? '' : (nameStatus === 'success' ? 'is-success' : 'is-danger')"
            :message="usernameMessage">
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
            v-bind:type="passStatus === 'idle' ? '' : (passStatus === 'success' ? 'is-success' : 'is-danger')"
            :message="passwordMessage">
            <b-input
                type="password"
                v-model="pass"
                placeholder="Password"
                password-reveal
                required
                icon-pack="fas"
                icon="lock"></b-input>
        </b-field>
        <div class="control">
            <button type="submit" class="button is-primary is-fullwidth">Login</button>
        </div>
    </form>
</template>

<script>
import Crypto from 'crypto-js';
import dict from '../dict';

export default {
    data() {
        return {
            name: "",
            pass: "",
            validName: "",
            validPass: "",
            invalidName: "",
            invalidPass: ""
        }
    },
    methods: {
        login() {
            this.$store.dispatch("login", {
                name: this.name,
                pass: Crypto.enc.Base64.stringify(Crypto.SHA256(this.pass))
            }).then(
                (status) => {
                    this.$router.push("/");
                },
                (status) => {
                    switch(status) {
                        case dict.INVALID_NAME: {
                            this.invalidName = this.name;
                            break;
                        }
                        case dict.INVALID_PASS: {
                            this.validName = this.name;
                            this.invalidPass = this.pass;
                        }
                    }
                }
            );
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
        passStatus() {
            if (this.pass === this.validPass && this.pass) {
                return "success";
            } else if (this.pass === this.invalidPass && this.pass) {
                return "fail";
            } else {
                return "idle";
            }
        },
        usernameMessage() {
            var status = this.nameStatus;
            return status === "fail" ? "Incorrect username" : "";
        },
        passwordMessage() {
            var status = this.passStatus;
            return status === "fail" ? "Incorrect password" : "";
        }
    }
}
</script>

<style lang="scss" scoped>
.login-form .field {
    margin-bottom: 20px;
}
</style>
