# docker

### centos 安装docker

> yum remove docker-xxx #先删除已安装docker

> yum install yum-utils

> yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo #配置yum源

> yum install docker-ce #安装docker

> systemctl start docker #启动docker

> systemctl enable docker #开机启动

> docker run --name xxx -d -p hostport:containerport imagename #启动容器

> docker exec -it containerId #进入容器

