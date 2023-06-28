# springboot_docker

> 1、创建spring boot工程，新建`UserController`，通过访问`/user`，输出`json`文档

> 2、在根目录创建`Dockerfile`文件，代码如下：

``` 
FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
``` 
> 3、执行 `docker build -t myapp-image .` 命令