import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import { Service } from 'react-native-ble-plx';

export default function DeviceCard({device}) {
  const [isConnected, setIsConnected] = useState(false);
  
  return (
    <ScrollView style={styles.deviceDetailsContainer}>
      <Text>{`Id : ${device.id}`}</Text>
      <Text>{`Name : ${device.name}`}</Text>
      <Text>{`Is connected : ${isConnected}`}</Text>
      <Text>{`RSSI : ${device.rssi}`}</Text>
      <Text>{`Manufacturer : ${device.manufacturerData}`}</Text>
      <Text>{`ServiceData : ${device.serviceData}`}</Text>
      <Text>{`UUIDS : ${device.serviceUUIDs}`}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  deviceDetailsContainer: {
    padding: '5%',
  },
});
