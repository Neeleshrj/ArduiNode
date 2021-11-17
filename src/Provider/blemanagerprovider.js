import React, { createContext } from 'react';
import {BleManager} from 'react-native-ble-plx';

export const BleManagerContext = createContext();

export default function BleManagerProvider(props){
    const manager = new BleManager();

    return(
        <BleManagerContext.Provider
            value={manager}
        >
            {props.children}
        </BleManagerContext.Provider>
    )
}