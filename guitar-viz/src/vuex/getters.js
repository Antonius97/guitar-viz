export default {
    isLogged: state => state.isLogged,
    bluetoothEnabled: state => state.bluetoothEnabled,
    bluetoothDevices: state => state.bluetoothDevices,
    bluetoothDevicesLoading: state => state.bluetoothDevicesLoading,
    connectedDevice: state => state.connectedDevice,
    bluetoothDeviceConnecting: state => state.bluetoothDeviceConnecting,
    bluetoothDeviceConnectingResult: state => state.bluetoothDeviceConnectingResult
};