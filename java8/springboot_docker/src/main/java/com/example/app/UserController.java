package com.example.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController extends BaseApiController {


    @GetMapping("/user")
    public RequestResult<User> get() {

        User user = new User();
        user.setUserName("onework");
        return success(user);
    }
}
