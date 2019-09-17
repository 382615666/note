# git

* http协议下输入保存密码和账号，先执行代码，然后在工程再输入一次账号和密码即可，以后则不用在输入
```shell
git config --global credential.helper store
```

* 查看git remote 地址
```shell
git remote -v
```

* 更换远程地址库
```shell
git remote set-url orgin xxx
```

* 拉取和上传大文件
```shell
git config --global http.postBuffer 1048576000
git config --global https.postBuffer 1048576000

// .gitconfig
[http]
        postBuffer = 1048576000

[https]
        postBuffer = 1048576000
```
