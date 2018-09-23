import dict from '../dict';
import Crypto from 'crypto-js';

const nameSalt = "SALT!@#";

const usersDB = {
    users: [{ name: "Omiant", pass: Crypto.enc.Base64.stringify(Crypto.SHA256("qwe")) }]
};

const bluetooth = {
    enabled: false,
    devices: [{
        type: "phone",
        name: "123"
    }, {
        type: "phone",
        name: "234"
    }, {
        type: "headphones",
        name: "345"
    }, {
        type: "arduino",
        name: "456"
    }, {
        type: "arduino",
        name: "678"
    }]
};

export default {
    login({ commit }, creds) {
        commit(dict.LOGIN);
        return new Promise((resolve, reject) => {
            let user = usersDB.users.find(user => creds.name === user.name);
            if (user) {
                if (user.pass === creds.pass) {
                    let token = Crypto.enc.Base64.stringify(Crypto.SHA256(creds.name + nameSalt));
                    localStorage.setItem("token", token);
                    commit(dict.LOGIN_SUCCESS);
                    resolve(dict.SUCCESS);
                } else {
                    commit(dict.LOGIN_FAIL_PASS);
                    reject(dict.INVALID_PASS);
                }
            } else {
                commit(dict.LOGIN_FAIL_NAME);
                reject(dict.INVALID_NAME);
            }
        });
    },
    logout({ commit }) {
        localStorage.removeItem("token");
        commit(dict.LOGOUT);
    },
    enableBluetooth({ commit }) {
        commit(dict.ENABLE_BLUETOOTH);
    },
    disableBluetooth({ commit }) {
        commit(dict.DISABLE_BLUETOOTH);
    },
    loadBluetoothDevices({ commit }) {
        commit(dict.BLUETOOTH_DEVICES_LOADING);
        return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(bluetooth.devices.filter(d => d.type === "arduino"));
                }, 1000);
            })
            .then(devices => {
                commit(dict.SET_BLUETOOTH_DEVICES, devices);
                commit(dict.BLUETOOTH_DEVICES_LOADED);
            });
    },
    setConnectedDevice({ commit }, device) {
        commit(dict.SET_CONNECTED_BLUETOOTH_DEVICE, device);
    },
    connectToDevice({ commit }, deviceName) {
        commit(dict.BLUETOOTH_DEVICES_CONNECTING);
        let result = true;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit(dict.BLUETOOTH_DEVICES_CONNECTED);
                if (result) {
                    let device = bluetooth.devices.find(d => d.name === deviceName);
                    commit(dict.BLUETOOTH_DEVICES_CONNECTED_SUCCESS);
                    commit(dict.SET_CONNECTED_BLUETOOTH_DEVICE, device);
                    resolve(device);
                } else {
                    commit(dict.BLUETOOTH_DEVICES_CONNECTED_FAIL);
                    reject(null);
                }
            }, 1000);
        });
    },
    disconnectFromDevice({ commit }) {
        commit(dict.DISCONNECT_BLUTOOTH_DEVICE);
    }
};