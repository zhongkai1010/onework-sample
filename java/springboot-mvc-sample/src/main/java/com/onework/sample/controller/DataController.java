package com.onework.sample.controller;

import com.onework.sample.entity.TestData;
import com.onework.sample.entity.TestEnum;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.bind.ValidationException;
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

    @GetMapping("test0")
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

    @GetMapping("test3")
    public LocalDateTime Test3() throws Exception {
        throw new Exception("测试异常");
    }

    @GetMapping("test4")
    public LocalDateTime Test4() throws ValidationException {
        throw new ValidationException("验证异常");
    }

    @GetMapping("test5")
    public Integer Test5() {
        return 0;
    }

    @ResponseBody
    @GetMapping("test6")
    public String Test6() {
        return "测试文本";
    }
}
