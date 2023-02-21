import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import { DeviceEventEmitter } from "react-native";
import SerialPortModule from './native_modules/SerialPortModule';

const serialPortModule = SerialPortModule.getInstance();

export default function SerialDataReader() {
  const [baudRate, dataBits, stopBits, parity] = [9600, 8, 1, 2];
  const [data, setData] = useState('');

  const sendAndReadData = async () => {
    return serialPortModule.sendAndReceive('313233');
  };

  useEffect(() => {
    // console.log("has device", serialPortModule.hasDevice());

    serialPortModule.hasDevice().then((has) => console.log("has device", has));

    serialPortModule
      .connect(baudRate, dataBits, stopBits, parity)
      .then(async connected => {
        if (connected) {
          const result = sendAndReadData();
          setData(__ => result);
        }
      });
  }, []);

  useEffect(() => {
    // listening
    DeviceEventEmitter.addListener('RNSerial:SERIAL_ACTION', action => {
      switch (action) {
        case 'ATTACHED': {
          console.log('attached');
          break;
        }
        case 'DETACHED': {
          console.log('dettached');
          break;
        }
      }
    });
    return () => {
      DeviceEventEmitter.removeAllListeners('RNSerial:SERIAL_ACTION');
    };
  }, []);

//   return (<View>
//       <Text>{data}</Text>
//     </View>
//   );

return null;
}
