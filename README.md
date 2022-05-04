# Onework-Sample 档案记录
# 一、简要说明
本仓库主要存放各类开源组件或新技术点运用相关示例程序，便于后续实际开发过程中如何更好搭建项目组件方面提供参考依据。

开始搭建过程中对示例程序命名进行规范，命名规范：

* 类库名或工程名统一采用小写字母加下划线命名法
* 命名中需要区分出是console、web、app示例等，如引用第三方组件需要包含其中，如是特定功能需要涵盖英文描述
**.NET 规范**
* 以*net、aspnet、netcore、aspnetcore*开头命名，分别区分framework与core
* 下划线需要表明功能或第三方组件名称，例如：邮件示例（net\_email）、autofac示例(*netcore\_autofac*)
**Java 规范**
* 以*maven、spring、springboot、console、web、app*开头命名

# 二、文件目录
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
# 三、.NET示例
## （1）aspnetcore\_autofac
## （2）aspnetcore\_docker
## （3）aspnetcore\_ioc
## （4）aspnet\_stackexchange\_exceptional
## （5）aspnetcore\_dynamic\_web
## （6）netcore\_ef
## （7）netcore\_rabbitmq
## （8）netcore\_rabbitmq\_consumer
## （9）netcore\_schema
## （10）netcore6\_automapper 

* 如何初始化配置AutoMapper配置
* 如何通过配置扫描Profile文件、标记AutoMap类，简化配置。
* AutoMap映射规则
## （11）net\_email
## （12）net\_module
# 四、Java示例
## （1）onework-database-generator

* mybatisplus的代码生成器
## （2）onework-maven-sample

* maven目录结构
* POM文件配置
* 子模块POM配置继承关系
## （3）onework-mybatis-plus-sample
* mybatisplus的代码生成器
* 代码生成器中swagger运用
* `BaseMapper`、`IService`基础类使用
* 软删除、sql拦截器

* 自定义代码生成器模板
## （4）onework-mybatis-sample
* mybatis-config.xml配置文件

* Mapper文件
## （5）onework-springframework.sample
* `BeanFactory`、`ClassPathXmlApplicationContext`容器的使用
* xml配置bean注入
* @Aspect等切面注解的使用
## （6）onework-springboot-mvc-sample
* `WebMvcConfigurer`类中各类配置方法
* 各类`@GetMapping`、`@RestController`、`@ControllerAdvice` 的运用
* 配置静态资源、thymeleaf模板
* 拦截器、日志、自定义响应结果、过滤器等特定功能
## （7）onework-spring-session-sample
* spring session如何接管tomcat容器中session、
* 会话的写入和读取
* 会话数据存储

# 五、NodeJs示例
* node-grpc
* node-sequelize-sqlite

# 六、React示例
* hook-demo

# 七、vue示例
* vue-sample
* vue-ts-sample
# 八、其他