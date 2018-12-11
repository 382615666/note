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

> docker commit -a author -m message containerId repository:tag path

> docker build -f ../Dockerfile -t repository:tag path

* Dockerfile 中的 COPY 相对路径 容器路径 #相对路径是指docker build命令所在的目录