# 搭建VPN

[参考地址](https://www.cnblogs.com/CoveredWithDust/p/7967036.html)

> yum install pptpd

> vim /etc/pptpd.conf

* localip 192.168.0.1 (服务器的内网ip)
* remoteip 192.168.0.214,192.168.0.145-245 (分配给客户端的ip)

> vim /etc/ppp/option.pptpd

* ms-dns 8.8.8.8
* ms-dns 8.8.4.4

> vim /etc/ppp/chap-secrets

* 账号 服务名 密码 ip地址
* test pptpd 123 *

> vim /etc/sysctl.conf
* net.ipv4.ip_forward=1
> sysctl -p

> touch /usr/lib/firewalld/services/pptpd.xml

```

<?xml version="1.0" encoding="utf-8"?>

<service>

       <short>pptpd</short>

       <description>PPTP</description>

       <port protocol="tcp" port="1723"/>

</service>

```

> firewall-cmd --permanent --zone=public --add-service=pptpd

> firewall-cmd --add-masquerade

> firewall-cmd --permanent --zone=public --add-port=47/tcp

> firewall-cmd --permanent --zone=public --add-port=1723/tcp

> firewall-cmd --permanent --direct --add-rule ipv4 filter INPUT 0 -p gre -j ACCEPT

> firewall-cmd --permanent --direct --add-rule ipv4 filter OUTPUT 0 -p gre -j ACCEPT

> firewall-cmd --permanent --direct --add-rule ipv4 filter FORWARD 0 -i ppp+ -o eth0 -j ACCEPT

> firewall-cmd --permanent --direct --add-rule ipv4 filter FORWARD 0 -i eth0 -o ppp+ -j ACCEPT

> firewall-cmd --permanent --direct --passthrough ipv4 -t nat -I POSTROUTING -o eth0 -j MASQUERADE -s 192.168.0.0/24

* 如果网速慢，则可使用下面的命令
> firewall-cmd --permanent --direct --add-rule ipv4 filter FORWARD 0 -p tcp -i ppp+ -j TCPMSS --syn --set-mss 1356

> firewall-cmd --reload

> systemctl restart pptpd

#### 个人经验

* 由于是小白，如何判断问题所在很重要，分享下个人经验

* centos7 里面可能使用的是firewalld，而不是iptables

* 先关掉防火墙，直接配置pptpd，进行拨号，可让配置先正确

* 在开启防火墙，则可让防火墙正确

* 不单单网卡需要开启路由转发，防火墙也必须开启路由转发（可能不叫这个词）
