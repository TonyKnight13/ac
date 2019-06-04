package controllers

import (
	. "actest/models"
	"encoding/json"

	"github.com/astaxie/beego"
)

type ShopController struct {
	BaseController
}

func (c *ShopController) URLMapping() {
	c.Mapping("ShopList", c.ShopList)
	c.Mapping("GoodsDetail", c.GoodsDetail)
	c.Mapping("OrderAdd", c.OrderAdd)
	c.Mapping("OrderList", c.OrderList)
	c.Mapping("OrderDel", c.OrderDel)
}

// @router /shop/navList [get]
func (c *ShopController) ShopList() {
	var forsell byte
	forsell = 1
	err, goodsList := GetGoodsList(forsell)
	if err != nil {
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1, "data": goodsList}
	c.ServeJSON()
}

// @router /shop/goodsListSelect [post]
func (c *ShopController) GoodsListSelect() {

}

// @router /shop/goodsDetail [get]
func (c *ShopController) GoodsDetail() {
	var goodsId int
	json.Unmarshal(c.Ctx.Input.RequestBody, goodsId)
	err, goodsInfo := GetGoodsByGid(goodsId)
	if err != nil {
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1, "data": goodsInfo}
	c.ServeJSON()
}

// @router /shop/cartList [get]
func (c *ShopController) CartList() {

}

// @router /shop/cartAdd [post]
func (c *ShopController) CartAdd() {

}

// @router /shop/cartEdit [post]
func (c *ShopController) CartEdit() {

}

// @router /shop/cartDel [post]
func (c *ShopController) CartDel() {

}

// @router /shop/orderAdd [post]
func (c *ShopController) OrderAdd() {
	uid := c.GetSession("userId")
	var orderRecv OrderRecv
	err := AddOrder(uid.(int), orderRecv)
	if err != nil {
		beego.Info(err)
	}
}

// @router /shop/orderList [get]
func (c *ShopController) OrderList() {
	uid := c.GetSession("userId")
	err, orders := GetOrderListByUid(uid)
	if err != nil {
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1, "data": orders}

}

// @router /shop/orderDel[get]
func (c *ShopController) OrderDel() {
	var orderId int
	err := RemoveOrder(orderId)
	if err != nil {
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1}
}
