package controllers

import (
	. "actest/models"
	"encoding/json"

	"github.com/astaxie/beego"
)

type UserController struct {
	BaseController
}

func (c *UserController) URLMapping() {
	c.Mapping("Login", c.Login)
	c.Mapping("Regist", c.Regist)
	c.Mapping("Logout", c.Logout)
	c.Mapping("UserInfo", c.UserInfo)
}

// @router /users/login [post]
func (c *UserController) Login() {
	var loginRecv LoginRecv
	json.Unmarshal(c.Ctx.Input.RequestBody, &loginRecv)
	beego.Info(string(c.Ctx.Input.RequestBody))
	err, _ := CheckLog(loginRecv.Account, loginRecv.Password)
	if err == nil {
		_, user := GetUserByAccount(loginRecv.Account)

		c.SetSession("userLogin", "1")
		c.SetSession("account", loginRecv.Account)
		c.SetSession("userId", user.Id)
		c.SetSession("userIdentity", user.Identity)

		c.Data["json"] = map[string]interface{}{"code": 1, "message": "贺喜你，登录成功", "id": user.Id, "account": user.Account, "identity": user.Identity, "user": user}
		beego.Info(c.Data["json"])

		uid := c.GetSession("userId")
		beego.Info(uid)
		beego.Info("成功")
	} else {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "登录失败"}
	}
	c.ServeJSON()
}

// @router /users/register [post]
func (c *UserController) Regist() {
	var registRecv RegistRecv
	json.Unmarshal(c.Ctx.Input.RequestBody, &registRecv)
	beego.Info(string(c.Ctx.Input.RequestBody))

	err1 := Register(registRecv.Account, registRecv.Password1, registRecv.Identity)

	if err1 != nil {
		beego.Info(err1)
	}
}

// @router /users/logout [get]
func (c *UserController) Logout() {
	c.DelSession("userLogin")
	c.DelSession("account")
	c.DelSession("userId")
	c.DelSession("userIdentity")
}

// @router /users/userInfo [get]
func (c *UserController) UserInfo() {
	account := c.GetSession("account")
	_, user := GetUserByAccount(account)
	userProfile := user.UserProfile
	c.Data["json"] = map[string]interface{}{"userProfile": userProfile}
	c.ServeJSON()
}

// @router /users/changePass [post]
func (c *UserController) ChangePwd() {
	userId := c.GetSession("userId")
	var newPwd string
	json.Unmarshal(c.Ctx.Input.RequestBody, newPwd)
	err := ChangePwd(userId, newPwd)
	if err != nil {
	}

}

// @router /users/goodsList [get]
func (c *UserController) GoodsList() {

}

// @router /users/goodsUpdate [post]
func (c *UserController) GoodsUpdate() {

}

// @router /users/goodsAdd [post]
func (c *UserController) GoodsAdd() {

}

// type AccountController struct {
// 	BaseController
// }

// func (ac *AccountController) Get() {
// 	Login := ac.isLogin
// 	if Login {
// 		ac.Redirect("/", 302)
// 	} else {
// 		ac.TplName = "login.html"
// 	}
// }

// func (ac *AccountController) Post() {
// 	action := ac.GetString("action")
// 	if action == "login"{
// 		account := ac.GetString("account")
// 		pwd := ac.GetString("password")
// 		// autoLogin := ac.GetString("autoLogin") == "on"

// 		if "" == account {
// 			ac.Data["json"] = map[string]interface{}{"code": 0, "message": "账号不能为空"}
// 			ac.ServeJSON()
// 		}
// 		if "" == pwd {
// 			ac.Data["json"] = map[string]interface{}{"code": 0, "message": "请填写密码"}
// 			ac.ServeJSON()
// 		}

// 		err, user := CheckLog(account, pwd)

// 		if err == nil {
// 			ac.SetSession("userLogin", "1")
// 			ac.SetSession("account",account)
// 			ac.Data["json"] = map[string]interface{}{"code": 1, "message": "贺喜你，登录成功", "user": user}
// 		} else {
// 			ac.Data["json"] = map[string]interface{}{"code": 0, "message": "登录失败"}
// 		}
// 		ac.ServeJSON()
// 	}else if action == "regist"{
// 		// message := ac.GetString("message")
// 		account := ac.GetString("account")
// 		pwd := ac.GetString("password")

// 		err := Register(account, pwd)

// 		if err != nil {
// 			beego.Error(err)
// 		}

// 		ac.Redirect("/", 302)
// 	}
// }

// type LogoutController struct {
// 	BaseController
// }

// func (lout *LogoutController) Get() {
// 	lout.DelSession("userLogin")
// 	lout.DelSession("account")
// 	lout.Redirect("/", 302)
// }
