package com.onework.sample.config;

import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSessionActivationListener;
import javax.servlet.http.HttpSessionEvent;

/**
 * @projectName: onework-springboot-mvc-sample
 * @package: com.onework.springbootmvcsample.config
 * @className: ApiHttpSessionActivationListener
 * @author: 钟凯
 * @description: 描述
 * @date: 2022/1/17 23:04
 * @version: 1.0
 */
@Component
public class ApiHttpSessionActivationListener implements HttpSessionActivationListener {

    /**
     * Notification that the session is about to be passivated.
     * The default implementation is a NO-OP.
     *
     * @param se Information about the session this is about to be passivated
     */
    @Override
    public void sessionWillPassivate(HttpSessionEvent se) {

    }

    /**
     * Notification that the session has just been activated.
     * The default implementation is a NO-OP.
     *
     * @param se Information about the session this has just been activated
     */
    @Override
    public void sessionDidActivate(HttpSessionEvent se) {
        HttpSessionActivationListener.super.sessionDidActivate(se);
    }
}
