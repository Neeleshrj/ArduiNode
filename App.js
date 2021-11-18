import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import ScanDevices from './src/screens/ScanDevices/index';

export default function App() {
  const [device, setDevice] = useState(undefined);
  
  function selectDevice(device){
    console.log('App::selectDevice() called with: ', device)
    setDevice(device)
  }

  async function checkPermissions(){
    try{
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then(res => {
        if(res){
          console.log("Permission access granted")
          console.log(res)
        }else{
          console.log("Permission not granted!")
          console.log(res)
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Need Location Access",
            message:
              "ArduiNode wants access to your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
            }
          ).then(res => console.log(res)).catch(e => console.log(e));
        }
      })
    }catch(err){
      console.warn(err);
    }
    
  }

  useEffect(()=> {
    checkPermissions();
  },[])

  return (
      <ScanDevices selectDevice={selectDevice} device={device}/>
  );
}
