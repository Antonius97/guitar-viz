export default {
    isLogged: state => state.isLogged,
    username: state => state.username,
    bluetoothEnabled: state => state.bluetoothEnabled,
    bluetoothDevices: state => state.bluetoothDevices,
    bluetoothDevicesLoading: state => state.bluetoothDevicesLoading,
    connectedDevice: state => state.connectedDevice,
    bluetoothDeviceConnecting: state => state.bluetoothDeviceConnecting,
    bluetoothDeviceConnectingResult: state => state.bluetoothDeviceConnectingResult,
    deviceCalibrated: state => state.deviceCalibrated,
    language: state => state.language,
    languages: state => state.languages,
    activeMode: state => state.activeMode,
    activeSubMode: state => state.activeSubMode
};