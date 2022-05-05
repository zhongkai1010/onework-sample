package com.onework.sample.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-springboot-mvc-sample
 * @Package com.onework.springbootmvcsample.controller
 * @Description: 描述
 * @date Date : 2022年01月14日 16:09
 */
@Controller
@RequestMapping("/home")
public class HomeController {

    @GetMapping("index")
    public String Index(Model model, HttpServletRequest request) {
        model.addAttribute("name", "test");
        return "index";
    }
}
