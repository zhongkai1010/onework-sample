package com.onework.sample.controller;

import com.onework.sample.entity.User;
import com.onework.sample.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    private UserRepository userRepository;

    /**
     * @param user:
     * @return User
     * @author ZK
     * @description TODO
     * @date 2022/1/29 16:37
     */
    @PostMapping("add")
    public User add(@RequestBody User user) {
        userRepository.saveAndFlush(user);
        return user;
    }

    @PutMapping("update")
    public User update(@RequestBody User user) {
        User oldUser = userRepository.getById(user.getId());
        oldUser.setName(user.getName());
        userRepository.saveAndFlush(oldUser);
        return user;
    }

    @DeleteMapping("remove")
    public void remove(@RequestParam Long id) {
        userRepository.deleteById(id);
    }

    @GetMapping("getAll")
    public Iterable<User> getAll(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "20") int pageSize,
        @RequestParam(name = "sort", defaultValue = "id", required = false) String sort) {
        PageRequest pageRequest = PageRequest.of(page, pageSize, Sort.Direction.DESC, sort);
        Page<User> data = userRepository.findAll(pageRequest);
        return data;
    }
}
