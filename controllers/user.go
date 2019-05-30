package controllers

import (
	. "actest/models"
	"encoding/json"

	"github.com/astaxie/beego"
)

type UserController struct {
	BaseController
}

type Regist struct {
	Account   string
	password1 string
	password2 string
	Identity  string
}

func (c *UserController) URLMapping() {
	c.Mapping("Login", c.Login)
	c.Mapping("Regist", c.Regist)
}

// @router /users/login [post]
func (c *UserController) Login() {

}

// @router /users/register [post]
func (c *UserController) Regist() {
	var regist Regist
	json.Unmarshal(c.Ctx.Input.RequestBody, &regist)
	beego.Info(string(regist.Identity))

	err1 := Register(regist.Account, regist.password1, regist.Identity)
	if err1 != nil {
		beego.Info(err1)
	}
	c.Redirect("/", 302)
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
