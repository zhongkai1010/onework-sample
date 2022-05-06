package com.onework.sample.common;

import lombok.Getter;
import lombok.Setter;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: java-sample
 * @Package com.onework.sample.config
 * @Description: 描述
 * @date Date : 2022年05月06日 14:35
 */
@Getter
@Setter
public class ResponseResult<T> {

    private T data;
    private boolean success;
    private String message;

    public ResponseResult() {
        this.success = false;
    }

    public ResponseResult(T data) {
        this.data = data;
        this.success = true;
    }

    public ResponseResult(boolean success) {
        this.success = success;
    }

    public ResponseResult(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ResponseResult(T data, boolean success, String message) {
        this.data = data;
        this.success = success;
        this.message = message;
    }

    public static <T> ResponseResult<T> ok(T data) {
        return new ResponseResult<>(data);
    }

    public static ResponseResult<Object> failure() {
        return new ResponseResult<Object>(false);
    }

    public static ResponseResult<Object> failure(String message) {
        return new ResponseResult<Object>(false, message);
    }
}
