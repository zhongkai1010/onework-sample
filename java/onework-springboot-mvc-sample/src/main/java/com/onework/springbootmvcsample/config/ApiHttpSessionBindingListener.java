package com.onework.springbootmvcsample.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionBindingListener;

/**
 * @projectName: onework-springboot-mvc-sample
 * @package: com.onework.springbootmvcsample.config
 * @className: ApiHttpSessionBindingListener
 * @author: 钟凯
 * @description: 描述
 * @date: 2022/1/17 22:54
 * @version: 1.0
 */
@Component
@Slf4j
public class ApiHttpSessionBindingListener implements HttpSessionBindingListener {

    /**
     * Notifies the object that it is being bound to a session and identifies
     * the session.
     * The default implementation is a NO-OP.
     *
     * @param event the event that identifies the session
     * @see #valueUnbound
     */
    @Override
    public void valueBound(HttpSessionBindingEvent event) {
        log.info("----ApiHttpSessionBindingListener-valueBound----");
    }

    /**
     * Notifies the object that it is being unbound from a session and
     * identifies the session.
     * The default implementation is a NO-OP.
     *
     * @param event the event that identifies the session
     * @see #valueBound
     */
    @Override
    public void valueUnbound(HttpSessionBindingEvent event) {
        log.info("----ApiHttpSessionBindingListener-valueUnbound----");
    }
}
