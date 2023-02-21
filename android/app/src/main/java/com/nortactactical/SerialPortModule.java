package com.nortactactical;

import android.content.Context;
import android.hardware.usb.UsbDeviceConnection;
import android.hardware.usb.UsbManager;
import android.os.CountDownTimer;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.hoho.android.usbserial.driver.UsbSerialDriver;
import com.hoho.android.usbserial.driver.UsbSerialPort;
import com.hoho.android.usbserial.driver.UsbSerialProber;
import org.apache.commons.codec.binary.Hex;

import com.nortactactical.SerialResponseCodeConstant;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;




public class SerialPortModule extends ReactContextBaseJavaModule {

    private final int READ_TIME_OUT_MILLS = 100; // over time
    private final int READ_DELAY_MILLS = 3 * 1000; 
    private final int READ_BYTE_LEN = 1024; 
    private UsbSerialPort usbSerialPort;
    private boolean connected = false;

    public SerialPortModule(ReactApplicationContext reactContext) {
        super(reactContext);

    }

    @ReactMethod
    public void connect(Integer baudRate, Integer dataBits, Integer stopBits, Integer parity, Promise promise) {
        UsbManager usbManager = getUsbManager();
        UsbSerialDriver firstDriver = getFirstSerialDevice();
        if (firstDriver == null) {
            promise.resolve(SerialResponseCodeConstant.NO_DEVICE);
            return;
        }
        UsbDeviceConnection connection = usbManager.openDevice(firstDriver.getDevice());
        if (connection == null) {
            promise.resolve(SerialResponseCodeConstant.CONNECT_FAILED);
            return;
        }
        this.usbSerialPort = firstDriver.getPorts().get(0);
        try {
            usbSerialPort.open(connection);
            usbSerialPort.setParameters(baudRate, dataBits, stopBits, parity);
            connected =  true;
            promise.resolve(SerialResponseCodeConstant.OK);
        } catch (IOException e) {
            promise.resolve(SerialResponseCodeConstant.OPEN_FAILED);
        }
    }

    @ReactMethod
    public void close(Promise promise) {
        close();
        promise.resolve(SerialResponseCodeConstant.OK);
    }

    public void close() {
        try {
            if (usbSerialPort != null) {
                // close connection
                usbSerialPort.close();
                connected = false;
                usbSerialPort = null;
            }
        } catch (IOException e) {
            connected = false;
            usbSerialPort = null;
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "SerialPortModuleAndroid";
    }

    public UsbManager getUsbManager() {
        Context context = getReactApplicationContext();
        return (UsbManager) context.getSystemService(Context.USB_SERVICE);
    }

    public List<UsbSerialDriver> getAvailableDrivers(UsbManager manger) {
        return UsbSerialProber.getDefaultProber().findAllDrivers(manger);
    }

    @ReactMethod
    public void hasDevice(Promise promise) {
        promise.resolve(hasSerialDevice());
    }

    public boolean hasSerialDevice() {
        return getFirstSerialDevice() != null;
    }

    private UsbSerialDriver getFirstSerialDevice() {
        UsbManager usbManager = getUsbManager();
        List<UsbSerialDriver> availableDrivers = getAvailableDrivers(usbManager);
        if (availableDrivers.isEmpty()) {
            return null;
        }
        return availableDrivers.get(0);
    }

    @ReactMethod
    public void isConnected(Promise promise) {
        promise.resolve(isSerialDeviceConnected());
    }

    public boolean isSerialDeviceConnected() {
        return connected;
    }

    @ReactMethod
    public void sendAndReceive(String data, Promise promise) {
        if (this.usbSerialPort == null) {
            promise.resolve(SerialResponseCodeConstant.NO_DEVICE);
        }
        byte[] dataBytes;
        try {
            dataBytes = Hex.decodeHex(data.toCharArray());
        } catch (Exception e) {
            promise.resolve(SerialResponseCodeConstant.PARSE_HEX_FAILED);
            return;
        }
        
        if (!write(dataBytes)) {
            promise.resolve(SerialResponseCodeConstant.WRITE_FAILED);
            return;
        }
        
        new CountDownTimer(READ_DELAY_MILLS, 100) {
            final StringBuilder hex = new StringBuilder();
            boolean hasData = false; 

            @Override
            public void onTick(long l) {
                byte[] bytes = new byte[READ_BYTE_LEN];
                int len = 0;
                try {
                    
                    len = usbSerialPort.read(bytes, READ_TIME_OUT_MILLS);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                if (len > 0) {
                    hex.append(Hex.encodeHexString(Arrays.copyOf(bytes, len)));
                    hasData = true;
                } else if (hasData) {
                    
                    promise.resolve(hex.toString());
                    this.cancel();
                }
            }


            @Override
            public void onFinish() {
                byte[] bytes = new byte[READ_BYTE_LEN];
                try {
                    
                    int len = usbSerialPort.read(bytes, READ_TIME_OUT_MILLS);
                    if (len > 0) {
                        hex.append(Hex.encodeHexString(Arrays.copyOf(bytes, len)));
                    }
                    promise.resolve(hex.toString());
                } catch (Exception e) {
                    promise.resolve(SerialResponseCodeConstant.READ_FAILED);
                }
            }
        }.start();
    }

    boolean write(byte[] bytes) {
        try {
            usbSerialPort.write(bytes, 2 * 1000);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    void clear() {
        if (!connected) {
            return;
        }
        byte[] bytes = new byte[READ_BYTE_LEN];
        try {
            usbSerialPort.read(bytes, 500);
        } catch (IOException ignored) {
        }
    }
}