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