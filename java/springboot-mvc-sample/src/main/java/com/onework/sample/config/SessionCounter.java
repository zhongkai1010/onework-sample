package com.onework.sample.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-springboot-mvc-sample
 * @Package com.onework.springbootmvcsample.config
 * @Description: 描述
 * @date Date : 2022年01月19日 10:52
 */
@Slf4j
@Component
public class SessionCounter implements HttpSessionListener, HttpSessionAttributeListener {
    @Override
    public void sessionCreated(HttpSessionEvent se) {

        log.info("---- SessionCounter - sessionCreated----");
        log.info("----" + se.getSession().getId() + "----");

    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        log.info("---- SessionCounter - sessionDestroyed----");
    }

    @Override
    public void attributeAdded(HttpSessionBindingEvent se) {
        log.info("---- SessionCounter - attributeAdded----");
    }

    @Override
    public void attributeRemoved(HttpSessionBindingEvent se) {
        log.info("---- SessionCounter - attributeRemoved----");
    }

    @Override
    public void attributeReplaced(HttpSessionBindingEvent se) {
        log.info("---- SessionCounter - attributeReplaced----");
    }
}
