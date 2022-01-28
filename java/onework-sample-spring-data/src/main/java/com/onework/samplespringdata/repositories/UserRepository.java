package com.onework.samplespringdata.repositories;

import com.onework.samplespringdata.entity.User;
import org.springframework.data.repository.CrudRepository;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-sample-spring-data
 * @Package com.onework.samplespringdata.dao
 * @Description: 描述
 * @date Date : 2022年01月27日 11:40
 */

public interface UserRepository extends CrudRepository<User, Long> {

}
