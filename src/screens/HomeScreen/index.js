import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import ControlScreen from '../ControlScreen';

import {
  DeviceContext,
  useDisconnectDevice,
} from '../../Provider/BTContextProivder';

export default function HomeScreen({navigation}) {
  const {connectedDevice, isConnected} = useContext(DeviceContext);

  const DisconnectDevice = useDisconnectDevice();
  return (
    <View style={styles.outerContainer}>
      <ControlScreen />
      {isConnected ? (
        <>
          <Text style={[styles.buttonText, {color: '#000'}]}>
            {connectedDevice}
          </Text>
          <TouchableOpacity onPress={() => DisconnectDevice()}>
            <View style={[styles.controlButton, styles.scanButton]}>
              <Text style={styles.buttonText}>Disconnect</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
          <View style={[styles.controlButton, styles.scanButton]}>
            <Text style={styles.buttonText}>Scan and Connect</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    padding: '5%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  controlButton: {
    backgroundColor: '#6c5ce7',
    padding: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  scanButton: {
    backgroundColor: '#ff6b6b',
    // elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
  },
});
