package com.onework.samplespringdata;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * @author ZK
 * @description TODO
 * @date 2022/1/29 22:06
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableCaching
public class OneworkSampleSpringDataApplication {

    public static void main(String[] args) {
        SpringApplication.run(OneworkSampleSpringDataApplication.class, args);
    }

}
