package controllers

import (
	. "actest/models"
	"encoding/json"

	"github.com/astaxie/beego"
)

type HospitalController struct {
	BaseController
}

func (c *HospitalController) URLMapping() {

}

// @router /hospital/hospitalNavList [get]
func (c *HospitalController) HospitalList() {
	var identity int
	identity = 2
	err, userPros := GetUserListByIdentity(identity)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "医院列表查看失败"}
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1, "data": userPros}
	c.ServeJSON()
}

// @router /hospital/docNavList [get]
func (c *HospitalController) DoctorList() {
	var identity int
	identity = 2
	err, userPros := GetUserListByIdentity(identity)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "医院列表查看失败"}
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1, "data": userPros}
	c.ServeJSON()
}

// @router /hospital/docSelect [post]
func (c *HospitalController) DoctorSelect() {
	var docsSelectRecv DocsSelectRecv
	json.Unmarshal(c.Ctx.Input.RequestBody, &docsSelectRecv)
	err, docInfos := SelecrDoc(docsSelectRecv)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "医生列表筛选失败"}
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1, "data": docInfos}
	c.ServeJSON()
}
