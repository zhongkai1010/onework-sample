package com.example.app;

import com.example.module.domain.User;
import com.example.web.BaseApiController;
import com.example.web.RequestResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController extends BaseApiController {


    @GetMapping("/user")
    public RequestResult<User> get() {

        User user = new User();
        user.setUsername("onework");
        return success(user);
    }
}
