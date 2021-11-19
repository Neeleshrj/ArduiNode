import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//screens
import HomeScreen from '../screens/HomeScreen';
import ScanDevices from '../screens/ScanDevices';
import ControlScreen from '../screens/ControlScreen';

const Stack = createNativeStackNavigator();

export default function RootNav() {
  return (
    <Stack.Navigator
        screenOptions={{
            header: () => (
                <View style={styles.navBarHeader}>
                    <Text style={styles.headerText}>
                        ArduiNode
                    </Text>
                </View>
            )
        }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scan" component={ScanDevices} />
      <Stack.Screen name="Control" component={ControlScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
    navBarHeader: {
        backgroundColor: '#1dd1a1',
        padding: '5%',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    headerText: {
        fontSize: hp('3.5'),
        color: '#fff'
    }
})