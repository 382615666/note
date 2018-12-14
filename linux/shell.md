# shell编程基础

> #!/bin/bash #第一行指定解释器来执行此脚本

> yourname="test" #'='两边不能有空格

> $yourname ${yourname} #输出变量

> "aaaa\"aaa" #双引号里面允许出现单个双引号，需要用反编译符号

> "aaa"bbb"aa" #允许出现成对双引号，用来拼接字符串

> 'aaaaa$yourname' #单引号里面的所有东西都是原样输出，反编译单个或者两个单引号也不允许

> 'aaa '$yourname' bbbb' #拼接字符串 双单引号会输出变量  aaa test bbb

> array=("abc" 1 2 3) #定义数组

> ${array[*]} ${array[@]} #数组所有元素

> ${#array[*]} ${#array[@]} ${#array[n]} #数组长度 数组第n+1个元素的长度

> \# #单行注释

> :<<! code...code ! #多行注释

> /root/a.sh a b c d e f
* $0:/roo/a.sh #当前执行的命令，包括路径
* $1: a #第一个参数
* $@ | $*: a b c d e f #所有参数，当用双引号使用"$*" || "${array[*]}"的时候，$*代表只有一个参数，数组中也一样，即："a b c d e f"
* $#: 5 #参数个数





