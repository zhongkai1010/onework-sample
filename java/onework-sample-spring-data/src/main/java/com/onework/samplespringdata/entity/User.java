package com.onework.samplespringdata.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * @author : zhongkai1010@163.com
 * @version V1.0
 * @Project: onework-sample-spring-data
 * @Package com.onework.samplespringdata.entity
 * @Description: 描述
 * @date Date : 2022年01月27日 10:56
 */
@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User implements Serializable {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "created", updatable = false, nullable = false)
    @CreatedDate
    private LocalDateTime created;

    @Column(name = "updated", insertable = false)
    @LastModifiedDate
    private LocalDateTime updated;

    @Column(name = "deleted")
    private LocalDateTime deleted;
}
