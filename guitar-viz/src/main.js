import Vue from 'vue';
import store from './vuex/store';
import router from './router';
import App from './App.vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import './assets/fontawesome/css/all.min.css';

Vue.use(Buefy);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});