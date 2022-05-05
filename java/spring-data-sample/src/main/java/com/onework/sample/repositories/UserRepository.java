package com.onework.sample.repositories;

import com.onework.sample.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-sample-spring-data
 * @Package com.onework.samplespringdata.dao
 * @Description: 描述
 * @date Date : 2022年01月27日 11:40
 */

public interface UserRepository extends JpaRepository<User, Long> {

}
