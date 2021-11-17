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
} from 'react-native';

import RNBluetoothClassic from 'react-native-bluetooth-classic';

import DeviceCard from '../../components/DeviceCard/index';

export default function ScanDevices({selectDevice}) {
  const [scannedDevices, setScannedDevices] = useState([]);
  const [discovering, setDiscovering] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

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

  //accepting connections
  async function acceptConnections() {
    console.log('accepting..');
    if (accepting) {
      ToastAndroid.show({
        text: 'Already accepting connections',
        duration: 5000,
      });

      return;
    }
    setAccepting(true);

    try {
      let device = await RNBluetoothClassic.accept({delimiter: '\r'});
      if (device) {
        selectDevice(device);
      }
    } catch (error) {
      // If we're not in an accepting state, then chances are we actually
      // requested the cancellation.  This could be managed on the native
      // side but for now this gives more options.
      if (!accepting) {
        ToastAndroid.show({
          text: 'Attempt to accept connection failed.',
          duration: 5000,
        });
      }
    } finally {
      setAccepting(false);
    }
  }

  //cancel connection
  async function cancelAcceptConnections() {
    if (accepting) {
      return;
    }

    try {
      let cancelled = await RNBluetoothClassic.cancelAccept();
      setAccepting(!cancelled);
    } catch (error) {
      ToastAndroid.show({
        text: 'Unable to cancel accept connection',
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
              onPress={() => selectDevice(item)}
              
            >
              <View style={[styles.deviceDetailsContainer, ]}>
                <View>
                  <Text>{`Id : ${item.id}`}</Text>
                  <Text>{`Name : ${item.name}`}</Text>
                  <Text>{`Is connected : ${isConnected}`}</Text>
                  <Text>{`Bonded : ${item.bonded}`}</Text>
                </View>
                <View style={styles.connectButton}>
                  <Button
                    title={accepting ? 'Accepting..' : 'Accept'}
                    onPress={
                      accepting
                        ? () => cancelAcceptConnections()
                        : () => acceptConnections()
                    }
                  />
                </View>
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
  },
  connectButton: {
    width: '40%',
    marginTop: '4%',
  },
});
