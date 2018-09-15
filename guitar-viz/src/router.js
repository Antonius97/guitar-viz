import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import store from './vuex/store';

Vue.use(VueRouter);

const HomeRoute = {
    name: "Home",
    path: "/",
    component: Home
};

const LoginRoute = {
    name: "Login",
    path: "/login",
    component: LoginPage
};

const routes = [HomeRoute, LoginRoute];

const router = new VueRouter({ routes, mode: "history" });

function requireAuth(to, from, next) {
    if (!store.getters.isLogged && to.path !== LoginRoute.path) {
        next({ name: "Login" });
    } else {
        next();
    }
}

router.beforeEach(requireAuth);

export default router;
