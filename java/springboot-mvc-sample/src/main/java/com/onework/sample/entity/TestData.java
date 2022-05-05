package com.onework.sample.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * @projectName: onework-springboot-mvc-sample
 * @package: com.onework.springbootmvcsample.controller
 * @className: TestData
 * @author: 钟凯
 * @description: 描述
 * @date: 2022/1/15 11:16
 * @version: 1.0
 */
@Data
public class TestData {
    private String data1;
    private Integer data2;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone="GMT+8")
    private LocalDateTime data3;

    @JsonFormat(pattern = "yyyy-MM-dd", timezone="GMT+8")
    private Date data4;

    private LocalDateTime data5;

    private Date data6;

    private TestEnum data7;
}
