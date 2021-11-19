import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Ionicons';

import {useSendData} from '../../Provider/BTContextProivder';

export default function ControlScreen() {
  const [btn1, setBtn1] = useState(false);
  const [btn2, setBtn2] = useState(false);
  const SendData = useSendData();

  return (
    <View style={styles.outerContainer}>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => {
            SendData('A');
            setBtn1(!btn1);
          }}
          style={[
            styles.buttonContainer,
            btn1 ? {backgroundColor: '#1dd1a1'} : {backgroundColor: '#fff'},
          ]}>
          <Icon
            name="bug-outline"
            size={hp('4')}
            color={btn1 ? '#fff' : '#000'}
          />
          <Text style={btn1 ? {color: '#fff'} : {color: '#000'}}>Debug</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SendData('B')}
          style={styles.buttonContainer}>
          <Icon name="bulb-outline" size={hp('4')} color={btn2 ? '#fff' : '#000'} />
          <Text style={btn2 ? {color: '#fff'} : {color: '#000'}}>Bulb</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SendData('F')}
          style={styles.buttonContainer}>
          <Icon name="tv-outline" size={hp('4')} color="#000" />
          <Text style={{color: '#000'}}>TV</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => SendData('O')}
          style={styles.buttonContainer}>
          <Icon name="musical-notes-outline" size={hp('4')} color="#000" />
          <Text style={{color: '#000'}}>Speaker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SendData('F')}
          style={styles.buttonContainer}>
          <Icon name="alarm-outline" size={hp('4')} color="#000" />
          <Text style={{color: '#000'}}>Alarm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SendData('F')}
          style={styles.buttonContainer}>
          <Icon name="lock-closed-outline" size={hp('4')} color="#000" />
          <Text style={{color: '#000'}}>Lock</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => SendData('O')}
          style={styles.buttonContainer}>
          <Icon name="thermometer-outline" size={hp('4')} color="#000" />
          <Text style={{color: '#000'}}>Temprature</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SendData('F')}
          style={styles.buttonContainer}>
          <Icon name="finger-print-outline" size={hp('4')} color="#000" />
          <Text style={{color: '#000'}}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => SendData('F')}
          style={styles.buttonContainer}>
          <Icon name="cloudy-outline" size={hp('4')} color="#000" />
          <Text style={{color: '#000'}}>Weather</Text>
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
    justifyContent: 'space-evenly',
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
    backgroundColor: '#fff',
    width: '25%',
    height: '70%',
    padding: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 20,
  },
});
