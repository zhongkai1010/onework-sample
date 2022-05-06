package com.onework.sample.common;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: java-sample
 * @Package com.onework.sample.common
 * @Description: 描述
 * @date Date : 2022年05月06日 17:05
 */
@Component
public class LogoutSuccessHandler implements
    org.springframework.security.web.authentication.logout.LogoutSuccessHandler {

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
        throws IOException, ServletException {

    }
}
