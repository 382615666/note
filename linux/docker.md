# docker

### centos 安装docker

1. 先删除已安装docker
> yum remove docker-xxx

2. 配置yum源
> yum install yum-utils

> yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

3. 安装docker
> yum install docker-ce

> systemctl start docker
