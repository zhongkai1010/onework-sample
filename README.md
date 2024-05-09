# Onework-Sample 档案记录

## 一、简要说明

本仓库专门收集多种示例程序，以便于未来开发过程中构建项目或利用相关插件时提供详尽的参考和指导。

开始搭建过程中对示例程序命名进行规范，命名规范：

- 类库名或工程名统一采用小写字母加下划线命名法
- 命名中需要区分出是 console、web、app 示例等，如引用第三方组件需要包含其中，如是特定功能需要涵盖英文描述

### .NET 示例说明

---

- 以*net、aspnet、netcore、aspnetcore*开头命名，分别区分 framework 与 core
- 下划线需要表明功能或第三方组件名称，例如：邮件示例（net_email）、autofac 示例(*netcore_autofac*)

### Java 示例说明

---

- 以*maven、spring、springboot、console、web、app*开头命名

### NodeJs 示例说明

---

### Vue 示例说明

---

### React 示例说明

---

## 二、文件目录

```Plain Text
|-- onework-sample
    |-- README.md
    |-- dotnet
    |   |-- aspnetcore_autofac
    |   |-- aspnetcore_docker
    |   |-- aspnet_stackexchange_exceptional
    |   |-- aspnetcore_dynamic_web
    |   |-- netcore_ef
    |   |-- netcore_rabbitmq
    |   |-- netcore_rabbitmq_consumer
    |   |-- netcore_schema
    |   |-- net_email
    |   |-- net_module
    |   |-- aspnetcore_ioc
    |   |-- netcore6_automapper --基于.NET 6 下使用AutoMapper进行数据映射
    |-- java
    |   |-- onework-database-generator
    |   |-- onework-maven-sample --验证maven的POM文件，子模块相关配置
    |   |-- onework-mybatis-plus-sample
    |   |-- onework-mybatis-sample
    |   |-- onework-springframework.sample
    |   |-- onework-springboot-mvc-sample --基于Spring Boot下验证MVC相关功能运用
    |   |-- onework-spring-session-sample --spring session的使用
    |-- node
    |   |-- node-grpc
    |   |-- node-sequelize-sqlite
    |-- react
    |   |-- hook-demo
    |-- vue
        |-- vue-sample
        |-- vue-ts-sample
```

## 三、.NET 示例

### （1）aspnetcore_autofac

### （2）aspnetcore_docker

### （3）aspnetcore_ioc

### （4）aspnet_stackexchange_exceptional

### （5）aspnetcore_dynamic_web

### （6）netcore_ef

### （7）netcore_rabbitmq

### （8）netcore_rabbitmq_consumer

### （9）netcore_schema

### （10）netcore6_automapper

- 如何初始化配置 AutoMapper 配置
- 如何通过配置扫描 Profile 文件、标记 AutoMap 类，简化配置。
- AutoMap 映射规则

### （11）net_email

### （12）net_module

## 四、Java 示例

## （1）onework-database-generator

- mybatisplus 的代码生成器

## （2）onework-maven-sample

- maven 目录结构
- POM 文件配置
- 子模块 POM 配置继承关系

## （3）onework-mybatis-plus-sample

- mybatisplus 的代码生成器
- 代码生成器中 swagger 运用
- `BaseMapper`、`IService`基础类使用
- 软删除、sql 拦截器

- 自定义代码生成器模板

## （4）onework-mybatis-sample

- mybatis-config.xml 配置文件

- Mapper 文件

## （5）onework-springframework.sample

- `BeanFactory`、`ClassPathXmlApplicationContext`容器的使用
- xml 配置 bean 注入
- @Aspect 等切面注解的使用

## （6）onework-springboot-mvc-sample

- `WebMvcConfigurer`类中各类配置方法
- 各类`@GetMapping`、`@RestController`、`@ControllerAdvice` 的运用
- 配置静态资源、thymeleaf 模板
- 拦截器、日志、自定义响应结果、过滤器等特定功能

## （7）onework-spring-session-sample

- spring session 如何接管 tomcat 容器中 session、
- 会话的写入和读取
- 会话数据存储

## 五、NodeJs 示例

- node-grpc
- node-sequelize-sqlite

## 六、React 示例

- hook-demo

## 七、vue 示例

- vue-sample
- vue-ts-sample

## 八、其他
