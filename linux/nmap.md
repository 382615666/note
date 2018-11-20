# nmap

[ack和syn扫描参考链接](https://zm10.sm-tc.cn/?src=l4uLj8XQ0IiIiNGShpeenJTKx9GckJLQvo2LlpyTmtDJz9DIydDNz87K0MnIx8rJ0ZeLkg%3D%3D&uid=f252a14a953af4c0be5014df04484ab3&hid=2dbd9899d757d19b73b7a4208a70d44c&pos=1&cid=9&time=1542692951340&from=click&restype=1&pagetype=0000004000000402&bu=ss_doc&query=syn%E5%92%8Cack%E7%9A%84%E6%89%AB%E6%8F%8F%E5%8E%9F%E7%90%86&mode=&v=1&uc_param_str=dnntnwvepffrgibijbprsvdsdichei)

1. connect扫描
    * 常规的tcp的连接
    * 端口关闭的话，server返回RST/ACK数据包，表明端口未开放
    * 缺点：会留下日志痕迹，数据包有可能会被过滤

1. SYN扫描
    * client只发送SYN/ACK
    * 端口开放，server回复ACK，client直接发送RST断开
    * 端口未开放，server直接回复RST

1. NULL扫描
    * client发送无任何标志位的数据包
    * window 无论端口开放/关闭，都会回复RST
    * unix系列遵从RFC 793规定。端口关闭则回复RST，否则不回复

1. FIN扫描
    * 情况与NULL扫描类似,不能用来判断window端口是否开放
    * client发送FIN数据包
    * 端口关闭回复RST
    * 端口开放则不回复

1. ACK扫描
    * client直接发送ACK
    * RST数据包TTL<=64，则表示端口开放，否则端口关闭

1. Xmas-Tree扫描
    * ACK/RST/SYN/URG/PSH/FIN 全部置1
    * window无法判断端口是否开放

1. idle扫描
    * [idle空闲扫描参考链接](https://www.cnblogs.com/daxueba-ITdaren/p/6626325.html)
    * client向A发送数据包，拿到ip id，构造A的数据包发送SYN/ACK给server
    * 端口开放，则server回SYN/ACK，否则回复RST
    * A无法识别数据包，则回复RST给server，ip id + 1
    * client再次发送数据包给A，ip id相差2 则可说明A回复过server，>2 则僵尸机不是很合格
