# tcp 协议

[tcp原理参考链接](http://www.ruanyifeng.com/blog/2017/06/tcp-protocol.html)

[tcp原理参考链接](https://www.cnblogs.com/buxiangxin/p/8336022.html)


### tcp三次握手

client -> server
* SYN = 1
* seq = n

![数据包](../img/DUCFE8STNJN~D`B425KD06J.png)


server(syn_rec) -> client
* SYN = 1
* ACK = 1
* ack number = n(seq) + 1
* seq = m

![数据包](../img/sdfsfdfsfsfsgdfg.png)

client(establish) -> server
* ack number = m(seq) + 1
* ACK = 1

![数据包](../img/sfsdffdsf.png)


