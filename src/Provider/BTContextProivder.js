import React, {useState, createContext, useContext} from 'react';

import RNBluetoothClassic from 'react-native-bluetooth-classic';

export const DeviceContext = createContext();
const SelectDeviceContext = createContext();
const SendDataContext = createContext();
const SetScannedDeviceContext = createContext();

export function useSelectDevice() {
  return useContext(SelectDeviceContext);
}

export function useSendData() {
  return useContext(SendDataContext);
}

export function useSetScannedDevice() {
  return useContext(SetScannedDeviceContext);
}

export default function BTContextProvider({children}) {
  const [device, setDevice] = useState(undefined);
  const [deviceId, setDeviceId] = useState(undefined);
  const [scannedDevices, setScannedDevices] = useState([]);

  function selectDevice(device) {
    console.log('App::selectDevice() called with: ', device);
    setDevice(device);
    if (device === undefined) setDeviceId(undefined);
    else setDeviceId(device.id);
  }

  async function SetScannedDevice(devices) {
    setScannedDevices(devices);
  }

  //write(send data) to device
  async function writeData(msg) {
    try {
      console.log('inside write');
      let message = msg;
      let sentMsg = await RNBluetoothClassic.writeToDevice(
        device.address,
        message,
      );

      console.log('Sent?', sentMsg);
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
      }}>
      <SetScannedDeviceContext.Provider value={SetScannedDevice}>
        <SelectDeviceContext.Provider value={selectDevice}>
          <SendDataContext.Provider value={writeData}>
            {children}
          </SendDataContext.Provider>
        </SelectDeviceContext.Provider>
      </SetScannedDeviceContext.Provider>
    </DeviceContext.Provider>
  );
}
