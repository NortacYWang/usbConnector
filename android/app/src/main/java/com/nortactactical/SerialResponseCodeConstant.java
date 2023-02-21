
package com.nortactactical;

public class SerialResponseCodeConstant {
    public static final String OK = "0000"; // 成功
    public static final String NO_DEVICE = "0001"; // 没有插入串口设备
    public static final String CONNECT_FAILED = "0002"; // 连接设备失败
    public static final String OPEN_FAILED = "0003"; // 打开串口失败

    public static final String READ_FAILED = "0004"; // 读取数据失败
    public static final String WRITE_FAILED = "0005"; // 写数据失败

    public static final String CLOSE_FAILED = "0006"; // 关闭设备失败

    public static final String PARSE_HEX_FAILED = "0007"; // 转义hex字符到字节数据失败
}