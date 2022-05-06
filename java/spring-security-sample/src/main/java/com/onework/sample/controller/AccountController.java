package com.onework.sample.controller;

import com.onework.sample.common.ResponseResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-sample-spring-security
 * @Package onework.sample.springsecuritysample.controller
 * @Description: 描述
 * @date Date : 2022年01月24日 10:01
 */
@Slf4j
@RestController
@RequestMapping("/account")
public class AccountController {

    @RequestMapping(value = "login", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseResult login() {


        return ResponseResult.ok("success");
    }

    @PostMapping("logout")
    public ResponseResult logout() {
        return ResponseResult.ok("logout");
    }

    @GetMapping("unauthorized")
    public ResponseResult unauthorized() {

        return ResponseResult.failure("unauthorized");
    }

    @GetMapping("failure")
    public ResponseResult failure() {
        return ResponseResult.failure("abnormal");
    }
}
