package com.nortactactical;

import com.nortactactical.SerialActionConstants;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class EventUtil {
    // name of the event
    static final String SERIAL_ACTION_EVENT_NAME = "RNSerial:SERIAL_ACTION";

    public static void sendSerialActionEvent(ReactContext context, SerialActionConstants action) {
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(SERIAL_ACTION_EVENT_NAME, action.value());
    }
}