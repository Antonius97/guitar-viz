import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home';
import SignupPage from './components/SignupPage.vue';
import LoginPage from './components/LoginPage';
import SettingsPage from './components/SettingsPage.vue';
import HelpPage from './components/HelpPage.vue';
import store from './vuex/store';

Vue.use(VueRouter);

const HomeRoute = {
    name: "Home",
    path: "/",
    component: Home
};

const SignupRoute = {
    name: "Signup",
    path: "/signup",
    component: SignupPage
};

const LoginRoute = {
    name: "Login",
    path: "/login",
    component: LoginPage
};

const SettingsRoute = {
    name: "Settings",
    path: "/settings",
    component: SettingsPage
};

const HelpRoute = {
    name: "Help",
    path: "/help",
    component: HelpPage
};

const routes = [HomeRoute, SignupRoute, LoginRoute, SettingsRoute, HelpRoute];

const router = new VueRouter({ routes, mode: "history" });

function requireAuth(to, from, next) {
    if (!store.getters.isLogged && ![LoginRoute.path, SignupRoute.path].includes(to.path)) {
        next({ name: "Login" });
    } else {
        next();
    }
}

router.beforeEach(requireAuth);

export default router;