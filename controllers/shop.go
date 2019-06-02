package controllers

type ShopController struct {
	BaseController
}

func (c *ShopController) URLMapping() {

}

// @router /shop/navList [get]
func (c *ShopController) ShopList() {

}

// @router /shop/goodsListSelect [post]
func (c *ShopController) GoodsListSelect() {

}

// @router /shop/goodsDetail [get]
func (c *ShopController) GoodsDetail() {

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

}

// @router /shop/orderList [get]
func (c *ShopController) OrderList() {

}

// @router /shop/orderDel[get]
func (c *ShopController) OrderDel() {

}
