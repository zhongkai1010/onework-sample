package com.onework.sample;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

/**
 * @author ZK
 * @description 请求返回结果
 * @date 2021/12/16 20:43
 */
@Getter
@Setter
public class R<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    private int code;
    private String message;
    private T data;

    public R<T> code(int code) {
        this.code = code;
        return this;
    }

    public R<T> code(HttpStatus status) {
        code = status.value();
        return this;
    }

    public R<T> message(String message) {
        this.message = message;
        return this;
    }

    public R<T> data(T data) {
        this.data = data;
        return this;
    }

    public R<T> success() {
        code(0);
        message(HttpStatus.OK.getReasonPhrase());
        return this;
    }

    /**
     * 未登录返回结果
     */
    public R<T> failure() {
        code(HttpStatus.INTERNAL_SERVER_ERROR);
        message(HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase());
        return this;
    }
}
