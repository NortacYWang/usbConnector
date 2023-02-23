import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {DeviceEventEmitter} from 'react-native';
import SerialPortModule from './native_modules/SerialPortModule';

const serialPortModule = SerialPortModule.getInstance();

export default function SerialDataReader() {
  const [baudRate, dataBits, stopBits, parity] = [115200, 8, 1, 0];
  const [data, setData] = useState('');

  const sendAndReadData = async () => {
    return serialPortModule.sendAndReceive('AT+CSQ');
  };


  useEffect(() => {
    serialPortModule.hasDevice().then(has => console.log('has device', has));

    serialPortModule
      .connect(baudRate, dataBits, stopBits, parity)
      .then(async connected => {
        console.log('connected', connected);
        if (connected === "0000") {
          const result = await sendAndReadData();

          console.log('result', result);

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
          serialPortModule
            .connect(baudRate, dataBits, stopBits, parity)
            .then(connected => console.log('connected or not', connected));
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
