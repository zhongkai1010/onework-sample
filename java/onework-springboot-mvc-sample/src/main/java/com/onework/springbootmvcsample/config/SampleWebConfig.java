package com.onework.springbootmvcsample.config;

import com.onework.springbootmvcsample.config.handlers.ApiResponseResultHandler;
import com.onework.springbootmvcsample.config.interceptor.LogInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

/**
 * @projectName: onework-springboot-mvc-sample
 * @package: com.onework.springbootmvcsample.config
 * @className: SampleWebConfig
 * @author: 钟凯
 * @description: 描述
 * @date: 2022/1/15 9:46
 * @version: 1.0
 */
@Configuration

public class SampleWebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addWebRequestInterceptor(new LogInterceptor());
    }

    @Override
    public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> handlers) {
        handlers.add(new ApiResponseResultHandler());
    }
}
