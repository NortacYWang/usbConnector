package com.nortactactical;

public enum SerialActionConstants {
    ATTACHED("ATTACHED"),
    DETACHED("DETACHED");
    String action;
    SerialActionConstants(String action) {
        this.action = action;
    }
    public String value() {
        return action;
    }
}