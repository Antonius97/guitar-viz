import dict from '../dict';

export default {
    [dict.LOGIN](state) {
        state.pending = true;
    },
    [dict.LOGIN_SUCCESS](state) {
        state.isLogged = true;
        state.pending = false;
    },
    [dict.LOGIN_FAIL_NAME](state) {
        state.isLogged = false;
        state.pending = false;
    },
    [dict.LOGIN_FAIL_PASS](state) {
        state.isLogged = false;
        state.pending = false;
    },
    [dict.LOGOUT](state) {
        state.isLogged = false;
    }
};
