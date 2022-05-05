package com.onework.sample.service.impl;

import com.onework.sample.entity.OwUsers;
import com.onework.sample.mapper.OwUsersMapper;
import com.onework.sample.service.IOwUsersService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 钟凯
 * @since 2021-12-04
 */
@Service
public class OwUsersServiceImpl extends ServiceImpl<OwUsersMapper, OwUsers> implements IOwUsersService {

}
