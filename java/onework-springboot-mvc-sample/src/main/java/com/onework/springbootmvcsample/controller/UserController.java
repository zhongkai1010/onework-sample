package com.onework.springbootmvcsample.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-springboot-mvc-sample
 * @Package com.onework.springbootmvcsample.controller
 * @Description: 描述
 * @date Date : 2022年01月17日 15:33
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("test1")
    public static String Test1(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.setAttribute("username", "zhongkai");
        return "login";
    }

    @GetMapping("test2")
    public static String Test2(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return session.getAttribute("username").toString();
    }

    @GetMapping("test3")
    public static String Test3(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return session.getAttribute("username").toString();
    }
}
