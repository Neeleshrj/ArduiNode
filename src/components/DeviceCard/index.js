import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Button, ToastAndroid} from 'react-native';

import RNBluetoothClassic from 'react-native-bluetooth-classic';

export default function DeviceCard({device}) {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <View style={styles.deviceDetailsContainer}>
      <View>
        <Text>{`Id : ${device.id}`}</Text>
        <Text>{`Name : ${device.name}`}</Text>
        <Text>{`Is connected : ${isConnected}`}</Text>
        <Text>{`Bonded : ${device.bonded}`}</Text>
      </View>
      <View style={styles.connectButton}>
        <Button title="Connect" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deviceDetailsContainer: {
    padding: '5%',
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: '2%',
  },
  connectButton: {
    width: '40%',
    marginTop: '4%',
  },
});
