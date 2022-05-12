package com.onework.sample.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-springboot-mvc-sample
 * @Package com.onework.springbootmvcsample.config
 * @Description: 描述
 * @date Date : 2022年01月21日 11:04
 */
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    /**
     * 配置拦截请求资源
     *
     * @param http：HTTP请求安全处理
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic()  //HTTP Basic认证方式
            .and().authorizeRequests()  // 授权配置
            .anyRequest()  // 所有请求
            .authenticated(); // 都需要认证
    }
}
