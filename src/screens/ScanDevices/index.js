import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
  Button,
  Platform
} from 'react-native';

import RNBluetoothClassic from "react-native-bluetooth-classic";

import DeviceCard from '../../components/DeviceCard/index';

export default function ScanDevices({selectDevice, device}) {
  const [scannedDevices, setScannedDevices] = useState([]);
  const [discovering, setDiscovering] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [rowItem, selectRowItem] = useState('');

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
        setScannedDevices(devices);
        setDiscovering(false);
      }
    } catch (err) {
      ToastAndroid.show({
        text: err.message,
        duration: 2000,
      });
    }
  }

  //stop scanning
  async function stopScan() {
    try {
      await RNBluetoothClassic.stopDiscovery();
      setDiscovering(false);
    } catch (e) {
      ToastAndroid.show({
        text: 'Error occurred while attempting to cancel discover devices',
        duration: 2000,
      });
    }
  }

  //initalize read
  // async function initalizeRead(){
  //   disconnectSubscription = RNBluetoothClassic.onDeviceDisconnected(() => disconnect());

  //   if(polling){
  //     readInterval = setInterval(() => performRead(), 5000);
  //   }else{
  //     readSubscription = device.onDataReceived(data => onReceivedData(data))
      
  //   }
  // }


  //connect to device
  async function connect() {
    try {
      setConnecting(true);
      let connection = await RNBluetoothClassic.isDeviceConnected(device.address);
      console.log(connection)
      if (!connection) {
        console.log('connecting....');

        console.log(`Attemping connection with ${device.name}`)
        
        try{
          // connection = await device.connect()
          connection = await RNBluetoothClassic.connectToDevice(device.address,{
            CONNECTOR_TYPE: "rfcomm",
            DELIMITER: "\n",
            DEVICE_CHARSET: Platform.OS === "ios" ? 1536 : "utf-8",
         })
          console.log(connection)
          
          console.log('connection successful')
          setIsConnected(connection);
          setConnecting(false);
          initalizeRead();
        }catch(e){
          console.log(e);
          
          console.log('connection failed')
          setConnecting(false);
        }
      }else{
        
        console.log('connected to device')
      }
      
    } catch (e) {
      console.warn(e)
      setConnecting(false);
    }
  }

  //disconnect
  async function disconnect(disconnected) {
    try {
      if (!disconnected) {
        disconnected = await device.disconnect();
      }
      ToastAndroid.show({
        text: 'Disconnected!',
        duration: 2000,
      });

      setIsConnected(!disconnected);
    } catch (err) {
      ToastAndroid.show({
        text: `Error! ${err}`,
        duration: 2000,
      });
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
                selectDevice(item);
                selectRowItem(item.id);
              }}
              onPress={() => {
                selectDevice(undefined);
                selectRowItem('');
              }}>
              <View
                style={[
                  styles.deviceDetailsContainer,
                  item.id === rowItem
                    ? {backgroundColor: '#55efc4'}
                    : {backgroundColor: '#fff'},
                ]}>
                <View>
                  <Text>{`Id : ${item.id}`}</Text>
                  <Text>{`Name : ${item.name}`}</Text>
                  <Text>{`Is connected : ${isConnected}`}</Text>
                  <Text>{`Bonded : ${item.bonded}`}</Text>
                </View>
                {item.id === rowItem ? (
                  <View style={styles.connectButton}>
                    {isConnected ? (
                      <Button
                        title={'Disconnect'}
                        onPress={() => disconnect()}
                      />
                    ) : (
                      <Button
                        title={connecting ? 'Connecting...' : 'Connect'}
                        onPress={() => connect()}
                      />
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
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: '2%',
    elevation: 10,
  },
  connectButton: {
    width: '40%',
    marginTop: '4%',
  },
});
