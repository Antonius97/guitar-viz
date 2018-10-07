import Crypto from '../utils/Crypto';
import dict from '../dict';

function getUserName(token) {
    if (!token) return "";
    let fullToken = Crypto.decode(token, dict.NAMEID);
    let idTokenLength = +fullToken.slice(-4);
    let nameToken = fullToken.slice(0, idTokenLength + 4);
    let name = Crypto.decode(nameToken, dict.NAME);
    return name;
}

export default {
    isLogged: !!localStorage.getItem("token"),
    username: getUserName(localStorage.getItem("token")),
    bluetoothEnabled: false,
    bluetoothDevices: [],
    bluetoothDevicesLoading: false,
    connectedDevice: null,
    bluetoothDeviceConnecting: false,
    bluetoothDeviceConnectingResult: "",
    deviceCalibrated: false,
    languages: ["en", "ru"],
    language: "ru"
};