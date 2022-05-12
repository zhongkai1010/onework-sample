package com.onework.sample.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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
}
