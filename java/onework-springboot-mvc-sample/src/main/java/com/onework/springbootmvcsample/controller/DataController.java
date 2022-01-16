package com.onework.springbootmvcsample.controller;

import com.onework.springbootmvcsample.entity.TestData;
import com.onework.springbootmvcsample.entity.TestEnum;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * @projectName: onework-springboot-mvc-sample
 * @package: com.onework.springbootmvcsample.controller
 * @className: DataController
 * @author: 钟凯
 * @description: 描述
 * @date: 2022/1/15 20:30
 * @version: 1.0
 */
@RestController
@RequestMapping("/api/data")
public class DataController {
    @GetMapping("index")
    @ResponseBody
    public TestData test0() {
        TestData data = new TestData();
        data.setData1("test");
        data.setData2(1234);
        data.setData3(LocalDateTime.now());
        data.setData4(new Date());
        data.setData5(LocalDateTime.now());
        data.setData6(new Date());
        data.setData7(TestEnum.B);
        return data;
    }

    @GetMapping("test1")
    public Date Test1() {
        return new Date();
    }

    @GetMapping("test2")
    public LocalDateTime Test2() {
        return LocalDateTime.now();
    }
}
