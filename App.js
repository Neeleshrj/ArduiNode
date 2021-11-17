import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';
import ScanDevices from './src/screens/ScanDevices/index';

import BleManagerProvider from './src/Provider/blemanagerprovider';
export default function App() {

  async function askPermissions(){
    try{
      
      if(granted === PermissionsAndroid.RESULTS.GRANTED){
        console.log("Location access granted")
      }else{
        console.log("Location access denied")
      }
    }catch(err){
      console.warn(err)
    }
  }

  async function checkPermissions(){
    try{
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION)
      .then(res => {
        
        if(res){
          console.log("Permission access granted")
          console.log(res)
        }else{
          console.log("Permission not granted!")
          console.log(res)
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
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
    <BleManagerProvider>
      <ScanDevices />
    </BleManagerProvider>
  );
}
