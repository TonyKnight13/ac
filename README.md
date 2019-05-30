# **爱宠社区** test分支—测试版本 



## 项目主体目录结构

├── conf

│   └── app.conf

├── controllers

│   ├── admin

│   └── default.go

├── main.go

├── models

│   └── models.go

├── static

│   ├── css

│   ├── ico

│   ├── img

│   └── js

└── views

├── utils *工具箱（函数库）*

├── initial *初始化*


## 项目主题色
**FFB90F**

## HTML页面命名
* 主页: home.html
* 婚介: petmatch.html

*登录 注册页面是准备重做的，暂时不管*

## name对照
* 账户 account
* 密码 pwd
* 用户名 uname

<!-- build 打包 -->
前端每修改一次就要重新打包
打包时先注释main.js里的mock.js
打包 npm run build