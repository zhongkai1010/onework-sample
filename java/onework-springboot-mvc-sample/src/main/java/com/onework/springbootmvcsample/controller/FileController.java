package com.onework.springbootmvcsample.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-springboot-mvc-sample
 * @Package com.onework.springbootmvcsample.controller
 * @Description: 描述
 * @date Date : 2022年01月17日 11:21
 */
@RestController
public class FileController {

    @PostMapping(value = "/upload")
    public String Upload(@RequestParam("file") MultipartFile file) {
        return file.getOriginalFilename();
    }
}
