import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

import { BleManagerContext } from '../../Provider/blemanagerprovider';

import DeviceCard from '../../components/DeviceCard/index';

export default function ScanDevices() {
  const manager = useContext(BleManagerContext);

  const [scannedDevices, setScannedDevices] = useState([]);

  function scanDevices(){
    console.log('scanning...')
    setScannedDevices([]);
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }

      // if a device is detected add the device to the list by dispatching the action into the reducer
      if (scannedDevice) {
        setScannedDevices([...scannedDevices, scannedDevice]);
      }
    });

    // stop scanning devices after 10 seconds
    setTimeout(() => {
      manager.stopDeviceScan();
    }, 10000);

    console.log(scannedDevices);
  }

  // useEffect(() => {
  //   return () => {
  //     manager.destroy();
  //   };
  // }, []);

  return (
    <>
      <TouchableOpacity onPress={() => scanDevices()}>
        <View style={styles.scanButtonContainer}>
          <Text style={styles.scanButtonText}>Scan</Text>
        </View>
      </TouchableOpacity>
      <View>
        <FlatList 
          keyExtractor={(item) => item.id}
          data={scannedDevices}
          renderItem={({ item }) => <DeviceCard device={item} />}
          contentContainerStyle={styles.content}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  scanButtonContainer: {
    backgroundColor: '#0984e3',
    marginTop: '25%',
    padding: '5%',
    marginHorizontal: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  scanButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  content: {
    
  }
});
