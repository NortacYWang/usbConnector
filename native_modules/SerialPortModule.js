import { NativeModules } from "react-native";
import _ from "lodash";



const serialNativeModule = NativeModules.SerialPortModuleAndroid;

export default class SerialPortModule  {
    constructor() {}
    static instance;

    static getInstance() {
        if (_.isNil(this.instance)) {
            this.instance = new SerialPortModule();
        }
        return this.instance;
    }

    async sendAndReceive(hexData) {
        console.log("senddata", hexData);
        return serialNativeModule.sendAndReceive(hexData);
    }

    async connect(baudRate, dataBits, stopBits, parity) {
        return serialNativeModule.connect(baudRate, dataBits, stopBits, parity);
    }

    async close(){
        return serialNativeModule.close();
    }

    async hasDevice() {
        return serialNativeModule.hasDevice();
    }

    async isConnected() {
        return serialNativeModule.isConnected();
    }
}