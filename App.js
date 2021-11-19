import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';

import RootNav from './src/routes/rootNav';

import BTContextProvider from './src/Provider/BTContextProivder';

export default function App() {

  async function checkPermissions() {
    try {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(res => {
        if (res) {
          console.log('Permission access granted');
          console.log(res);
        } else {
          console.log('Permission not granted!');
          console.log(res);
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Need Location Access',
              message: 'ArduiNode wants access to your location',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          )
            .then(res => console.log(res))
            .catch(e => console.log(e));
        }
      });
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <BTContextProvider>
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    </BTContextProvider>
  );
}
