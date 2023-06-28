package com.example.web;

public abstract class BaseApiController {

    protected <T> RequestResult<T> success(T data) {
        RequestResult<T> requestResult = new RequestResult<>();
        requestResult.setCode(200);
        requestResult.setData(data);
        return requestResult;
    }
}
