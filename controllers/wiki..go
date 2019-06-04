package controllers

import (
	. "actest/models"

	"github.com/astaxie/beego"
)

type WikiController struct {
	BaseController
}

func (c *WikiController) URLMapping() {
	c.Mapping(" ArticleList", c.ArticleList)
}

// @router /baike/experience[get]
func (c *WikiController) ArticleList() {
	specialList := GetItemList("pet_speci")
	var data []interface{}
	for _, special := range specialList {
		err, articles := GetArticleListBySpecial(special)
		if err != nil {
			beego.Info(err)
		}
		data = append(data, map[string]interface{}{"special": special, "data": articles})
	}
	c.Data["josn"] = map[string]interface{}{"code": 1, "data": data}
	c.ServeJSON()
}
