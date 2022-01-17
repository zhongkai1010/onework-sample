package com.onework.springbootmvcsample.config;

import com.onework.springbootmvcsample.entity.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.xml.bind.ValidationException;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-springboot-mvc-sample
 * @Package com.onework.springbootmvcsample.config
 * @Description: 描述
 * @date Date : 2022年01月17日 10:32
 */
@ControllerAdvice
@Slf4j
public class GlobalExceptionHandle {

    @ResponseBody
    @ExceptionHandler(ValidationException.class)
    public static Object handleValidationException(ValidationException e) {
        log.info("----GlobalExceptionHandle - handleValidationException----");
        return new R().failure();
    }

    @ResponseBody
    @ExceptionHandler(Exception.class)
    public static Object handleException(Exception e) {
        log.info("----GlobalExceptionHandle - handleException----");
        return new R().failure();
    }
}
