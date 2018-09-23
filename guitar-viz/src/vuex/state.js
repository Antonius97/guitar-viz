export default {
    isLogged: !!localStorage.getItem("token"),
    bluetoothEnabled: false,
    bluetoothDevices: [],
    bluetoothDevicesLoading: false,
    connectedDevice: null,
    bluetoothDeviceConnecting: false,
    bluetoothDeviceConnectingResult: ""
};