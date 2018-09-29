import dict from '../dict';

export default {
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
    [dict.DISCONNECT_BLUTOOTH_DEVICE]: state => state.connectedDevice = null
};