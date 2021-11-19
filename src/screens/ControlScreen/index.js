import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Ionicons';

import {useSendData} from '../../Provider/BTContextProivder';

export default function ControlScreen() {
  const SendData = useSendData();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => SendData('O')}
          style={styles.buttonContainer}>
          <Icon name="bug-outline" size={hp('4')} color="#fff"/>
          <Text style={{color: '#fff'}}>Debug</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SendData('F')}
          style={styles.buttonContainer}>
          <Icon name="bulb-outline" size={hp('4')} color="#fff"/>
          <Text style={{color: '#fff'}}>Bulb</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SendData('F')}
          style={styles.buttonContainer}>
          <Icon name="tv-outline" size={hp('4')} color="#fff"/>
          <Text style={{color: '#fff'}}>TV</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => SendData('O')}
          style={styles.buttonContainer}>
          <Icon name="musical-notes-outline" size={hp('4')} color="#fff"/>
          <Text style={{color: '#fff'}}>Speaker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SendData('F')}
          style={styles.buttonContainer}>
          <Icon name="alarm-outline" size={hp('4')} color="#fff"/>
          <Text style={{color: '#fff'}}>Alarm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SendData('F')}
          style={styles.buttonContainer}>
          <Icon name="lock-closed-outline" size={hp('4')} color="#fff"/>
          <Text style={{color: '#fff'}}>Lock</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => SendData('O')}
          style={styles.buttonContainer}>
          <Icon name="thermometer-outline" size={hp('4')} color="#fff"/>
          <Text style={{color: '#fff'}}>Temprature</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SendData('F')}
          style={styles.buttonContainer}>
          <Icon name="finger-print-outline" size={hp('4')} color="#fff"/>
          <Text style={{color: '#fff'}}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SendData('F')}
          style={styles.buttonContainer}>
          <Icon name="cloudy-outline" size={hp('4')} color="#fff"/>
          <Text style={{color: '#fff'}}>Weather</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
      height: hp('60'),
    //   backgroundColor: 'blue',
      display: 'flex',
      justifyContent: 'space-evenly'
  },
  buttonsContainer: {
    // backgroundColor: 'green',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 0,
    
  },
  buttonContainer: {
    backgroundColor: '#1dd1a1',
    width: '25%',
    height: '70%',
    padding: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 20,
  },
});
