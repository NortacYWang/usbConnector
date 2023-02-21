package com.nortactactical;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SerialPortModulePackage implements ReactPackage {
    private SerialPortModule serialPortModule;

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        SerialPortModule serialPortModule = new SerialPortModule(reactContext);
        this.serialPortModule = serialPortModule;
        modules.add(serialPortModule);
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    public SerialPortModule getSerialPortModule() {
        return serialPortModule;
    }
}