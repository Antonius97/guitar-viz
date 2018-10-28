import dict from '../dict';
import i18n from '../i18n.dictionary';

export default {
    [dict.CHANGE_LANGUAGE](state, language) {
        state.language = language;
        i18n.setLanguage(language);
    },
    [dict.ADD_LANGUAGE]: (state, language) => state.languages.push(language),
    [dict.REMOVE_LANGUAGE]: (state, language) => state.languages.splice(state.languages.indexOf(language), 1),
    [dict.LOGIN]: state => state.pending = true,
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
    [dict.SET_USERNAME]: (state, username) => state.username = username,
    [dict.LOGOUT]: state => state.isLogged = false,
    [dict.ENABLE_BLUETOOTH]: state => state.bluetoothEnabled = true,
    [dict.DISABLE_BLUETOOTH]: state => state.bluetoothEnabled = false,
    [dict.SET_BLUETOOTH_DEVICES]: (state, devices) => state.bluetoothDevices = devices,
    [dict.BLUETOOTH_DEVICES_LOADING]: state => state.bluetoothDevicesLoading = true,
    [dict.BLUETOOTH_DEVICES_LOADED]: state => state.bluetoothDevicesLoading = false,
    [dict.SET_CONNECTED_BLUETOOTH_DEVICE]: (state, device) => state.connectedDevice = device,
    [dict.BLUETOOTH_DEVICES_CONNECTING]: state => state.bluetoothDevicesConnecting = true,
    [dict.BLUETOOTH_DEVICES_CONNECTED]: state => state.bluetoothDevicesConnecting = false,
    [dict.BLUETOOTH_DEVICES_CONNECTED_SUCCESS]: state => state.bluetoothDevicesConnectingStatus = dict.SUCCESS,
    [dict.BLUETOOTH_DEVICES_CONNECTED_FAIL]: state => state.bluetoothDevicesConnectingStatus = dict.FAIL,
    [dict.DISCONNECT_BLUTOOTH_DEVICE]: state => state.connectedDevice = null,
    [dict.CALIBRATE_DEVICE]: state => state.deviceCalibrated = true,
    [dict.SET_ACTIVE_MODE]: (state, mode) => (localStorage.setItem("activeMode", mode), state.activeMode = +mode),
    [dict.SET_ACTIVE_SUBMODE]: (state, mode) => (localStorage.setItem("activeSubMode", mode), state.activeSubMode = +mode)
};