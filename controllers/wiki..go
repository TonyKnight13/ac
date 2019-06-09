package controllers

import (
	. "actest/models"
	"encoding/json"

	"github.com/astaxie/beego"
)

type WikiController struct {
	BaseController
}

func (c *WikiController) URLMapping() {
	c.Mapping("ArticleList", c.ArticleList)
	c.Mapping("AddArticle", c.AddArticle)
}

// @router /baike/experience [get]
func (c *WikiController) ArticleList() {
	specialList := GetItemList("pet_speci")
	var data []interface{}
	for _, special := range specialList {
		err, articles := GetArticleListBySpecial(special)
		beego.Info(articles)
		if err != nil {
			beego.Info(err)
		}
		data = append(data, map[string]interface{}{"Special": special, "data": articles})
	}
	c.Data["json"] = map[string]interface{}{"code": 1, "data": data}
	c.ServeJSON()
}

// @router /baike/addArticle [post]
func (c *WikiController) AddArticle() {
	uid := c.GetSession("userId")
	var addArticle ArticleRecv
	json.Unmarshal(c.Ctx.Input.RequestBody, &addArticle)
	beego.Info(addArticle)
	err := AddArticle(uid.(int), addArticle)
	if err != nil {
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1}
	c.ServeJSON()
}
