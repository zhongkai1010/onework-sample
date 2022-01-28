package com.onework.samplespringdata.controller;

import com.onework.samplespringdata.entity.User;
import com.onework.samplespringdata.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.plaf.PanelUI;
import java.util.ArrayList;
import java.util.List;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-sample-spring-data
 * @Package com.onework.samplespringdata.controller
 * @Description: 描述
 * @date Date : 2022年01月27日 11:33
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired private UserRepository userRepository;

    @PostMapping("add")
    public User add(User user) {
        userRepository.save(user);
        return user;
    }

    @PostMapping("update")
    public User update(User user) {
        return user;
    }

    @PostMapping("remove")
    public Integer remove() {
        return -1;
    }

    @GetMapping("getAll")
    public List<User> getAll() {
        List<User> users = new ArrayList<>();
        return users;
    }
}
