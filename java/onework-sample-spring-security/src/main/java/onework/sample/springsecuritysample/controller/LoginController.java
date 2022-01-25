package onework.sample.springsecuritysample.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
@RequestMapping("/login")
public class LoginController {

    /**
     * @return
     */
    @GetMapping("verifyUser")
    public Boolean verifyUser() {
        return false;
    }
}
