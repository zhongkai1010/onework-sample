package com.onework.sample.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-sample-spring-data
 * @Package com.onework.samplespringdata.controller
 * @Description: 描述
 * @date Date : 2022年02月07日 13:48
 */
@RestController
@RequestMapping("/api/role")
public class RoleController {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @RequestMapping("test1")
    public void test1() {
        redisTemplate.opsForValue().set("test1", "123");

    }

    @RequestMapping("test2")
    public Object test2() {
       return redisTemplate.opsForValue().get("test1");
    }
}
