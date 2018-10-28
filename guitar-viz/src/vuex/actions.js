import dict from '../dict';
import Crypto from '../utils/Crypto';

function padstart(len, w, c = "0") {
    w = "" + w;
    while (w.length < len) w = c + w;
    return w;
}

function encodeUserData(user) {
    let nametoken = Crypto.encode(user.name, dict.NAME);
    let idtoken = Crypto.encode(user.id, dict.ID);
    let fullToken = Crypto.encode(nametoken + idtoken + padstart(4, idtoken.length), dict.NAMEID);
    return fullToken;
}

function decodeUserData(token) {
    let fullToken = Crypto.decode(token, dict.NAMEID);
    let idTokenLength = +fullToken.slice(-4);
    fullToken = fullToken.slice(0, -4);
    let idToken = fullToken.slice(idTokenLength);
    let id = Crypto.decode(idToken, dict.ID);
    return { id: +id };
}

const usersDB = {
    users: [{ name: "Omiant", pass: Crypto.encode("qwe", dict.PASS), id: 0 }]
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
    addLanguage({ commit }, lang) {
        commit(dict.ADD_LANGUAGE, lang);
    },
    removeLanguage({ commit }, lang) {
        commit(dict.REMOVE_LANGUAGE, lang);
    },
    changeLanguage({ commit }, lang) {
        commit(dict.CHANGE_LANGUAGE, lang);
    },
    signup({ commit }, creds) {
        return new Promise((resolve, reject) => {
            let user = usersDB.users.find(user => creds.name === user.name);
            if (user) {
                reject(dict.INVALID_NAME);
            } else {
                let id = usersDB.users.length;
                let newUser = {
                    id,
                    name: creds.name,
                    pass: creds.pass
                };
                usersDB.users.push(newUser);
                resolve(dict.SUCCESS);
            }
        });
    },
    login({ commit }, creds) {
        commit(dict.LOGIN);
        return new Promise((resolve, reject) => {
            let user = usersDB.users.find(user => creds.name === user.name);
            if (user) {
                if (user.pass === creds.pass) {
                    let fullToken = encodeUserData(user);
                    localStorage.setItem("token", fullToken);
                    commit(dict.LOGIN_SUCCESS);
                    commit(dict.SET_USERNAME, user.name);
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
        commit(dict.DISCONNECT_BLUTOOTH_DEVICE);
        commit(dict.LOGOUT);
    },
    changePassword({ commit }, creds) {
        return new Promise((resolve, reject) => {
            let token = localStorage.getItem("token");
            let userId = decodeUserData(token).id;
            let user = usersDB.users.find(user => userId === user.id);
            if (user) {
                if (user.pass === creds.oldPass) {
                    user.pass = creds.newPass;
                    resolve(dict.SUCCESS);
                } else {
                    reject(dict.INVALID_PASS);
                }
            }
        });
    },
    setUsername({ commit }, username) {
        commit(dict.SET_USERNAME, username);
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
    },
    setDeviceCalibrated({ commit }) {
        commit(dict.CALIBRATE_DEVICE);
    },
    setActiveMode({ commit }, newActiveMode) {
        if (newActiveMode !== undefined) {
            commit(dict.SET_ACTIVE_MODE, newActiveMode.toString());
        }
    },
    setActiveSubMode({ commit }, newActiveSubMode) {
        if (newActiveSubMode !== undefined) {
            commit(dict.SET_ACTIVE_SUBMODE, newActiveSubMode.toString());
        }
    }
};