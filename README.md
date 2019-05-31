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

## 服务器地址
http://localhost:8080

## 接口
### 注册
*输入：*   
account //用户名  
password1  //密码   
password2  //确认密码  
identity  //身份标签


*输出：*  
msg

### 登录  
*输入：*   
account, //用户名  
password //密码  

*输出：*  
account, //用户名  
password //密码  
identity //身份标签  
userId


