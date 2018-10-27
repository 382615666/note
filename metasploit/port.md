# port端口扫描

> msfconsole

> set auxiliary/scanner/portscan/syn

> show options

> set RHOSTS 192.168.135.98

> set THREADS 10

> run

![结果](../img/1540626278(1).jpg)

* set auxiliary/scanner/smb/smb_version // 扫描系统版本，语言，计算机名，工作组

* set auxiliary/scanner/ftp/ftp_login // ftp 登录信息扫描

* set auxiliary/scanner/mssql/mssql_login // sql server 登录信息扫描