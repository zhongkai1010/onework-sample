package com.onework.sample.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.WebRequestInterceptor;

/**
 * @projectName: onework-springboot-mvc-sample
 * @package: com.onework.springbootmvcsample.config.interceptor
 * @className: LogInterceptor
 * @author: 钟凯
 * @description: 描述
 * @date: 2022/1/15 10:07
 * @version: 1.0
 */
@Slf4j
@Component
public class LogInterceptor implements WebRequestInterceptor {

    @Override
    public void preHandle(WebRequest request) {
        log.info("----LogInterceptor-preHandle----");
    }

    @Override
    public void postHandle(WebRequest request, ModelMap model) {
        log.info("----LogInterceptor-postHandle----");
    }

    @Override
    public void afterCompletion(WebRequest request, Exception ex) {
        log.info("----LogInterceptor-afterCompletion----");
    }
}
