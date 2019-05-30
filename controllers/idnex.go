package controllers

type IndexController struct {
	BaseController
}

// @router / [get]
func (c *IndexController) Get() {
	c.Data["IsHome"] = true
	c.TplName = "index.html"
}
