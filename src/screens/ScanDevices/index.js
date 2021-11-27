import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
  Button,
  Platform,
} from 'react-native';

import RNBluetoothClassic from 'react-native-bluetooth-classic';

import {DeviceContext, useSelectDevice, useSetScannedDevice, useOnDeviceConnect} from '../../Provider/BTContextProivder';

export default function ScanDevices({navigation}) {
  const [discovering, setDiscovering] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const {device, deviceId, scannedDevices, connectedDevice, isConnected} = useContext(DeviceContext);
  const SelectDevice = useSelectDevice();
  const SetScannedDevice = useSetScannedDevice();
  const OnDeviceConnect = useOnDeviceConnect();

  //scan devices
  async function scanDevices() {
    console.log('scanning...');
    try {
      setDiscovering(true);
      let devices = scannedDevices;
      try {
        let unpaired = await RNBluetoothClassic.startDiscovery();
        devices.push(...unpaired);
        ToastAndroid.show(
          `Found ${unpaired.length} unpaired devices.`,
          ToastAndroid.SHORT,
        );
        console.log(unpaired);
      } finally {
        SetScannedDevice(devices);
        setDiscovering(false);
      }
    } catch (err) {
      setDiscovering(false);
      console.log(err)
      // ToastAndroid.show({
      //   text: err.message,
      //   duration: 2000,
      // });
    }
  }

  //stop scanning
  async function stopScan() {
    try {
      await RNBluetoothClassic.stopDiscovery();
      setDiscovering(false);
    } catch (e) {
      setDiscovering(false);
      console.log(e);
      // ToastAndroid.show({
      //   text: 'Error occurred while attempting to cancel discover devices',
      //   duration: 2000,
      // });
    }
  }

  //connect to device
  async function connect() {
    try {
      setConnecting(true);
      let connection = await RNBluetoothClassic.isDeviceConnected(
        device.address,
      );
      console.log(connection);
      if (!connection) {
        console.log('connecting....');

        console.log(`Attemping connection with ${device.name}`);

        try {
          // connection = await device.connect()
          connection = await RNBluetoothClassic.connectToDevice(
            device.address,
            {
              CONNECTOR_TYPE: 'rfcomm',
              DELIMITER: '\n',
              DEVICE_CHARSET: Platform.OS === 'ios' ? 1536 : 'utf-8',
            },
          );
          console.log(connection);

          console.log('connection successful');

          OnDeviceConnect("Connected to "+device.name);
          setConnecting(false);
          navigation.goBack();
        } catch (e) {
          console.log(e);
          setConnecting(false);
        }
      } else {
        console.log('connected to device');
      }
    } catch (e) {
      console.warn(e);
      setConnecting(false);
    }
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => (discovering ? stopScan() : scanDevices())}>
        <View style={styles.scanButtonContainer}>
          <Text style={styles.scanButtonText}>
            {discovering ? 'Stop' : 'Scan'}
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.devicesHeader}>Devices:</Text>
      {discovering ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          keyExtractor={item => item.id}
          data={scannedDevices}
          renderItem={({item}) => (
            <TouchableOpacity
              onLongPress={() => {
                SelectDevice(item);
              }}
              onPress={() => {
                SelectDevice(undefined);
              }}>
              <View
                style={[
                  styles.deviceDetailsContainer,
                  item.id === deviceId
                    ? {backgroundColor: '#1dd1a1'}
                    : {backgroundColor: '#fff'},
                ]}>
                <View>
                  <Text style={item.id === deviceId ? {color: '#fff'} : {color: '#000'}}>{`Id : ${item.id}`}</Text>
                  <Text style={item.id === deviceId ? {color: '#fff'} : {color: '#000'}}>{`Name : ${item.name}`}</Text>
                  <Text style={item.id === deviceId ? {color: '#fff'} : {color: '#000'}}>{`Bonded : ${item.bonded}`}</Text>
                </View>
                {item.id === deviceId ? (
                  <View style={styles.connectButton}>
                    {isConnected ? (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <Button
                          title={'Disconnect'}
                          onPress={() => disconnect()}
                          color="#d63031"
                        />
                      </View>
                    ) : (
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <Button
                          title={connecting ? 'Connecting...' : 'Connect'}
                          onPress={() => connect()}
                          color="#2d3436"
                        />
                      </View>
                    )}
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.content}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  scanButtonContainer: {
    backgroundColor: '#0984e3',
    marginTop: '15%',
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
  devicesHeader: {
    fontSize: 18,
    color: '#000',
    padding: '5%',
    fontWeight: 'bold',
  },
  content: {
    marginHorizontal: '3%',
  },
  deviceDetailsContainer: {
    padding: '5%',
    borderRadius: 8,
    marginVertical: '2%',
    elevation: 10,
  },
  connectButton: {
    width: '100%',
    marginTop: '4%',
    display: 'flex',
  },
});
