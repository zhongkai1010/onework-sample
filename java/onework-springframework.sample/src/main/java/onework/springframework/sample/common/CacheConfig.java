package onework.springframework.sample.common;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-springframework.sample
 * @Package onework.springframework.sample.common
 * @Description: 描述
 * @date Date : 2022年01月21日 9:44
 */
@Configuration
public class CacheConfig {

    @Bean
    public String getData() {
        return "测试";
    }
}
