package com.onework.springbootmvcsample.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onework.springbootmvcsample.entity.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-springboot-mvc-sample
 * @Package com.onework.springbootmvcsample.config
 * @Description: 描述
 * @date Date : 2022年01月17日 9:54
 */
@Slf4j
@ControllerAdvice(annotations = {ResponseBody.class})
public class ApiResponseBodyAdvice implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
        log.info("----ApiResponseBodyAdvice----");
        log.info("getGenericParameterType:" + returnType.getGenericParameterType().getTypeName());
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
        Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request,
        ServerHttpResponse response) {
        if (body instanceof R) {
            return body;
        } else if (body instanceof String) {
            ObjectMapper om = new ObjectMapper();
            R r = new R<>().data(body).success();
            try {
                response.getHeaders().add("Content-Type", "application/json");
                return om.writeValueAsString(r);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return e.getMessage();
            }
        } else {
            return new R<>().data(body).success();
        }
    }
}
