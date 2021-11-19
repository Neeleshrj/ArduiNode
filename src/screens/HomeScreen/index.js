import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import ControlScreen from '../ControlScreen';

export default function HomeScreen({navigation}) {
  

  return (
    <View style={styles.outerContainer}>
      <ControlScreen />
      <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
        <View style={[styles.controlButton,styles.scanButton]}>
          <Text  style={styles.buttonText}>Scan and Connect</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    outerContainer: {
        padding: '5%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%'
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
        elevation: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15
    }
})