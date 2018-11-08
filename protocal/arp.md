# arp 协议

[报文分析参考链接](https://blog.csdn.net/daidi1989/article/details/49923831)

![xp的ip和mac](../img/1541401875(1).jpg)

![win7的ip和mac](../img/1541402030(1).jpg)

![arp报文格式](../img/1541402782(1).jpg)

![arp报文格式](../img/1541404691(1).jpg)


* 先查询自己本机上的arp缓存表，如果有就直接发送

* 如果没有，则发送开始广播，其他主机收到后，不符合则扔掉，符合则回复


