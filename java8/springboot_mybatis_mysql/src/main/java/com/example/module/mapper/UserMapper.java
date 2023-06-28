package com.example.module.mapper;

import com.example.module.domain.User;

/**
* @author zk
* @description 针对表【users】的数据库操作Mapper
* @createDate 2023-06-28 16:49:21
* @Entity com.example.module.domain.User
*/
public interface UserMapper {

    int deleteByPrimaryKey(Long id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

}
