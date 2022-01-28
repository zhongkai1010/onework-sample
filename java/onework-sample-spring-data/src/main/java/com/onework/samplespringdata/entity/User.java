package com.onework.samplespringdata.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-sample-spring-data
 * @Package com.onework.samplespringdata.entity
 * @Description: 描述
 * @date Date : 2022年01月27日 10:56
 */
@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id @Column(name = "id", nullable = false) private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
