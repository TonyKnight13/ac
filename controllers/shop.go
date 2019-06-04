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
	c.Mapping("GoodsListSelect", c.GoodsListSelect)
	c.Mapping("OrderAdd", c.OrderAdd)
	c.Mapping("OrderList", c.OrderList)
	c.Mapping("OrderDel", c.OrderDel)
}

// @router /shop/navList [get]
func (c *ShopController) ShopList() {
	var Available byte
	Available = 1
	err, goodsList := GetGoodsList(Available)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "获取商城列表失败"}
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1, "data": goodsList}
	c.ServeJSON()
}

// @router /shop/goodsListSelect [post]
func (c *ShopController) GoodsListSelect() {
	var goodsSelectRecv GoodsSelectRecv
	json.Unmarshal(c.Ctx.Input.RequestBody, &goodsSelectRecv)
	err, goodsInfos := SelectGoods(goodsSelectRecv)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "商城列表筛选失败"}
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1, "data": goodsInfos}
	c.ServeJSON()
}

// @router /shop/goodsDetail [get]
func (c *ShopController) GoodsDetail() {
	var goodsId int
	json.Unmarshal(c.Ctx.Input.RequestBody, &goodsId)
	beego.Info(goodsId)
	err, goodsInfo := GetGoodsByGid(goodsId)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "商品详情查看失败"}
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
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "订单添加失败"}
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1}
	c.ServeJSON()
}

// @router /shop/orderList [get]
func (c *ShopController) OrderList() {
	uid := c.GetSession("userId")
	err, orders := GetOrderListByUid(uid)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "订单列表查看失败"}
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1, "data": orders}
	c.ServeJSON()
}

// @router /shop/orderDel[get]
func (c *ShopController) OrderDel() {
	var orderId int
	err := RemoveOrder(orderId)
	if err != nil {
		c.Data["json"] = map[string]interface{}{"code": 0, "message": "订单删除失败"}
		beego.Info(err)
	}
	c.Data["json"] = map[string]interface{}{"code": 1}
	c.ServeJSON()
}
