package onework.sample.springsecuritysample.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-sample-spring-security
 * @Package onework.sample.springsecuritysample.controller
 * @Description: 描述
 * @date Date : 2022年01月24日 10:02
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @RequestMapping("getUser")
    public String getUser() {

        return "zhongkai";
    }
}
