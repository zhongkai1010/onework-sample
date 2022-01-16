package com.onework.springbootmvcsample.config.handlers;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * @projectName: onework-springboot-mvc-sample
 * @package: com.onework.springbootmvcsample.config.handlers
 * @className: ResponseHandler
 * @author: 钟凯
 * @description: 描述
 * @date: 2022/1/16 12:15
 * @version: 1.0
 */

@Component
public class ApiResponseResultHandler implements HandlerMethodReturnValueHandler {
    @Override
    public boolean supportsReturnType(MethodParameter returnType) {

        return returnType.hasMethodAnnotation(ResponseBody.class);

    }

    @Override
    public void handleReturnValue(
        Object returnValue, MethodParameter returnType, ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest) throws Exception {
        System.out.println("-------------------returnValue-------------------");
        System.out.println(returnValue);
    }
}
