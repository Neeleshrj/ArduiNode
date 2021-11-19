import React, {useState, createContext, useContext} from 'react';

import RNBluetoothClassic from 'react-native-bluetooth-classic';

export const DeviceContext = createContext();

const SelectDeviceContext = createContext();
const SetScannedDeviceContext = createContext();
const OnDeviceConnectContext = createContext();

const DisconnectDeviceContext = createContext();
const SendDataContext = createContext();

export function useSelectDevice() {
  return useContext(SelectDeviceContext);
}

export function useDisconnectDevice() {
  return useContext(DisconnectDeviceContext);
}

export function useSendData() {
  return useContext(SendDataContext);
}

export function useSetScannedDevice() {
  return useContext(SetScannedDeviceContext);
}

export function useOnDeviceConnect() {
  return useContext(OnDeviceConnectContext);
}

export default function BTContextProvider({children}) {
  const [device, setDevice] = useState(undefined);
  const [deviceId, setDeviceId] = useState(undefined);
  const [scannedDevices, setScannedDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  function selectDevice(device) {
    console.log('App::selectDevice() called with: ', device);
    setDevice(device);
    if (device === undefined) setDeviceId(undefined);
    else setDeviceId(device.id);
  }

  function SetScannedDevice(devices) {
    setScannedDevices(devices);
  }

  function OnDeviceConnect(connectedDevice) {
    setConnectedDevice(connectedDevice);
    setIsConnected(!isConnected);
  }

  //disconnect device
  async function disconnectDevice(disconnected) {
    try {
      if (!disconnected) {
        await device.disconnect();
      }
      console.log('Disconnected!');

      OnDeviceConnect("");
    } catch (err) {
      console.log('Error!');
    }
  }

  //write(send data) to device
  async function writeData(msg) {
    try {
      console.log('inside write');
      let message = msg;
      await RNBluetoothClassic.writeToDevice(
        device.address,
        message,
      );

      console.log('Sent?', msg);
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <DeviceContext.Provider
      value={{
        device: device,
        deviceId: deviceId,
        scannedDevices: scannedDevices,
        connectedDevice: connectedDevice,
        isConnected: isConnected,
      }}>
      <SetScannedDeviceContext.Provider value={SetScannedDevice}>
        <SelectDeviceContext.Provider value={selectDevice}>
          <OnDeviceConnectContext.Provider value={OnDeviceConnect}>
            <DisconnectDeviceContext.Provider value={disconnectDevice}>
              <SendDataContext.Provider value={writeData}>
                {children}
              </SendDataContext.Provider>
            </DisconnectDeviceContext.Provider>
          </OnDeviceConnectContext.Provider>
        </SelectDeviceContext.Provider>
      </SetScannedDeviceContext.Provider>
    </DeviceContext.Provider>
  );
}
