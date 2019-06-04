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
	c.Mapping("ChangePwd", c.ChangePwd)
	c.Mapping("UserInfoUpdate", c.UserInfoUpdate)
	c.Mapping("GoodsList", c.GoodsList)
	c.Mapping("GoodsUpd", c.GoodsUpdate)
	c.Mapping("GoodsAdd", c.GoodsAdd)
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

		c.Data["json"] = map[string]interface{}{"code": 1, "id": user.Id, "account": user.Account, "identity": user.Identity}
		beego.Info(c.Data["json"])
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
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "注册失败"}
	}
	c.Data["json"] = map[string]interface{}{"code": 1}
	c.ServeJSON()
}

// @router /users/logout [get]
func (c *UserController) Logout() {
	c.DelSession("userLogin")
	c.DelSession("account")
	c.DelSession("userId")
	c.DelSession("userIdentity")
	c.Data["json"] = map[string]interface{}{"code": 1}
	c.ServeJSON()
}

// @router /users/userInfo [get]
func (c *UserController) UserInfo() {
	account := c.GetSession("account")
	_, user := GetUserByAccount(account)
	userProfile := user.UserProfile
	c.Data["json"] = map[string]interface{}{"code": 1, "userProfile": userProfile}
	c.ServeJSON()
}

// @router /users/changePass [post]
func (c *UserController) ChangePwd() {
	userId := c.GetSession("userId")
	var newPwd string
	json.Unmarshal(c.Ctx.Input.RequestBody, &newPwd)
	err := ChangePwd(userId, newPwd)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 1, "message": "修改失败"}
	}
	c.Data["json"] = map[string]interface{}{"code": 1}
	c.ServeJSON()
}

// @router /users/userInfoUpdate [post]
func (c *UserController) UserInfoUpdate() {
	var userInfoRecv UserInfoRecv
	json.Unmarshal(c.Ctx.Input.RequestBody, &userInfoRecv)
	uid := c.GetSession("userId")
	err := UpdatePro(uid.(int), userInfoRecv)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "信息更新失败"}
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1}
	c.ServeJSON()
}

// @router /users/goodsList [get]
func (c *UserController) GoodsList() {
	userIdentity := c.GetSession("userIdentity")
	Uid := c.GetSession("userId")
	if userIdentity.(int) == 0 {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "没有权限"}
	}
	err, goodsList := GetUserGoodsByUid(Uid)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "商品列表获取失败"}
		beego.Info(err)
	}
	// var json map[string]interface{}
	// json["code"] = 1
	// for i, goods := range goodsList {
	// 	json[string(i)] = map[string]interface{}{"goodsId": goods.Id, "goodsName": goods.Name, "goodsKind": goods.Kind, "goodsForpet": goods.Forpet, "goodsPrice": goods.Price, "goodsMadein": goods.Madein, "goodsAvailable": goods.Available, "goodsintro": goods.Intro}
	// }
	c.Data["json"] = map[string]interface{}{"code": 1, "data": goodsList}
	c.ServeJSON()

}

// @router /users/goodsUpdate [post]
func (c *UserController) GoodsUpdate() {
	userIdentity := c.GetSession("userIdentity")
	if userIdentity.(int) == 0 {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "没有权限"}
	}
	var goodsInfoRecv GoodsInfoRecv
	json.Unmarshal(c.Ctx.Input.RequestBody, &goodsInfoRecv)
	Gid := goodsInfoRecv.Id
	//图片更新暂时不做
	err := UpdateGoodsInfo(Gid, goodsInfoRecv)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "更新商品失败"}
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1}
	c.ServeJSON()
}

// @router /users/goodsAdd [post]
func (c *UserController) GoodsAdd() {
	userIdentity := c.GetSession("userIdentity")
	if userIdentity.(int) == 0 {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "没有权限"}
	}
	usrId := c.GetSession("userId")
	var goodsInfoRecv GoodsInfoRecv
	json.Unmarshal(c.Ctx.Input.RequestBody, &goodsInfoRecv)
	var addGoodsImg GoodsImg
	addGoodsImg.ImgUrl = goodsInfoRecv.ImgUrl
	addGoodsImg.Cover = 1
	err := AddGoodsInfo(goodsInfoRecv, addGoodsImg, usrId.(int))
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "添加商品失败"}
		beego.Info((err))
	}
	c.Data["json"] = map[string]interface{}{"code": 1}
	c.ServeJSON()
}
