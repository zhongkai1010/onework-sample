package com.onework.sample.config;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: java-sample
 * @Package com.onework.sample.config
 * @Description: 描述
 * @date Date : 2022年05月07日 16:20
 */
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
