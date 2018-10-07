<template>
    <div>
        <form @submit.prevent="login({name, pass})" class="login-form">
            <b-field
                :label="i18n.getStr('USERNAME')"
                v-bind:type="nameStatus === 'idle' ? '' : (nameStatus === 'success' ? 'is-success' : 'is-danger')"
                :message="usernameMessage">
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
                v-bind:type="passStatus === 'idle' ? '' : (passStatus === 'success' ? 'is-success' : 'is-danger')"
                :message="passwordMessage">
                <b-input
                    type="password"
                    v-model="pass"
                    :placeholder="i18n.getStr('PASSWORD')"
                    password-reveal
                    required
                    icon-pack="fas"
                    icon="lock"></b-input>
            </b-field>
            <div class="control">
                <button type="submit" class="button is-primary is-fullwidth">{{ i18n.getStr("LOGIN") }}</button>
            </div>
        </form>
        <p class="signup-text is-text is-size-6 has-text-right">{{ i18n.getStr("DONT_HAVE_ACCOUNT") }}
             <a class="signup-btn is-text is-paddingless is-marginless is-size-6" @click="gotoSignupPage()">{{ i18n.getStr("SIGN_UP") }}</a> {{ i18n.getStr("TO_REGISTER") }}
        </p>
    </div>
</template>

<script>
import Crypto from '../utils/Crypto.js';
import dict from '../dict';
import i18n from '../i18n.dictionary.js';
import Vuex from 'vuex';

export default {
    mounted() {
        if (this.isLogged) {
            this.$router.push("/");
        }
    },
    data() {
        return {
            i18n,
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
                pass: Crypto.encode(this.pass, dict.PASS)
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
                            break;
                        }
                    }
                }
            );
        },
        gotoSignupPage() {
            this.$router.push("/signup");
        }
    },
    computed: {
        ...Vuex.mapGetters(['isLogged']),
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
.signup-text {
    margin-top: 10px;

    .signup-btn {
        text-decoration: underline;
    }
}
</style>
