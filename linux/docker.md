# docker

### centos 安装docker

> yum remove docker-xxx #先删除已安装docker

> yum install yum-utils

> yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo #配置yum源

> yum install docker-ce #安装docker

> systemctl start docker #启动docker

> systemctl enable docker #开机启动

> docker run --name xxx -d -p hostport:containerport imagename #启动容器

* -d # 后台执行当前进程，否则会阻塞当前进程

> docker exec -it containerId bash #进入容器

> docker commit -a author -m message containerId repository:tag path #修改容器，重新生成镜像

> docker build -f ../Dockerfile -t repository:tag path #Dockerfile生成镜像

* Dockerfile 中的 COPY 相对路径 容器路径 #相对路径是指docker build命令所在的目录

### 创建私有仓库

> docker run -d -p 5000:5000 --name gana-registry --restart=always -v ~/docker/registry:/var/lib/registry -v ~/docker/config.yml:/etc/docker/registry/config.yml registry

> docker run hello-world #拉取镜像

> docker tag hello-world:latest 127.0.0.1:5000/hello-world:0.0.1 #给镜像打一个标签

> docker push 127.0.0.1:5000/hello-world:0.0.1 #推送镜像

> curl 127.0.0.1:5000/v2/_catalog #查看镜像

* 暂时没找到完美的删除镜像的方式


#### Dockerfile

1. CMD有三种形式

    1. ["executable", "param1", "param2"]
        * 推荐始终 [] 形式
    2. ["param1", "param2"]
    3. command param1 param2
        * 默认调用bash
        * 最终会被解释为 ["/bin/bash", "-c", "param2"]

* 当无ENTRYPOINT，CMD为默认命令
* 当有ENTRYPOINT，且docker run containerId 后面无参数的时候，CMD使用上面的第2种形式，并且值会成为ENTRYPOINT的参数
> CMD ["-u"]

> ENTRYPOINT ps -a || ENTRYPOINT ["/bin/bash", "-c", "ps -a"]

> docker run container

> ps -a -u #最终命令

* 当有ENTRYPOINT，且docker run containerId 后面有参数的时候，CMD使用上面的第2种形式，但是会无效，docker run 后面的值会成为ENTRYPOINT的参数

> CMD ["-u"]

> ENTRYPOINT ps -a || ENTRYPOINT ["/bin/bash", "-c", "ps -a"]

> docker run container -t

> ps -a -t #最终命令

* 简而言之，CMD很多时候相当于一个默认值或者默认命令的作用

* VOLUMN 指的是目录