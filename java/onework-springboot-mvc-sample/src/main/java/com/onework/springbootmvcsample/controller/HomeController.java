package com.onework.springbootmvcsample.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-springboot-mvc-sample
 * @Package com.onework.springbootmvcsample.controller
 * @Description: 描述
 * @date Date : 2022年01月14日 16:09
 */
@RequestMapping("/home")
@RestController
public class HomeController {
    @GetMapping("index")
    public String Index() {
        return "Hello Word122123123";
    }
}
