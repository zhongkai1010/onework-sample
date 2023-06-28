# Java 程序示例
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
    |-- java8
    |   |-- README.md
    |   |-- aspnetcore_docker
```
# 三、示例程序

* springboot_docker
> 通过Dockerfile构建涵盖Spring Boot的Docker容器
 