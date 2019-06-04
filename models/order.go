package models

import (
	"time"

	"github.com/astaxie/beego/orm"
)

type Order struct {
	Id          int `orm:auto`
	RealName    string
	Phone       string
	Address     string
	Created     time.Time    `orm:"auto_now_add;type(datetime)"`
	Goods       []*GoodsInfo `orm:"rel(m2m);on_delete(set_null)"`
	UserProfile *UserProfile `orm:"rel(fk)"`
}

func init() {
	orm.RegisterModel(new(Order))
}

func AddOrder(adduserid int, addOrder OrderRecv) error {
	o := orm.NewOrm()
	order := new(Order)
	var userpro UserProfile

	m2m := o.QueryM2M(&order, "Goods")

	userpro = UserProfile{Id: adduserid}
	err := o.Read(&userpro)
	if err != nil {
		return err
	}

	var goodsM2M []*GoodsInfo

	for _, gid := range addOrder.GoodsList {
		goods := GoodsInfo{Id: gid}
		goodsM2M = append(goodsM2M, &goods)
	}
	_, errM2M := m2m.Add(goodsM2M)
	if errM2M != nil {
		return errM2M
	}

	order.RealName = addOrder.RealName
	order.Phone = addOrder.Phone
	order.Address = addOrder.Address

	order.Created = time.Now()

	order.UserProfile = &userpro

	_, err1 := o.Insert(order)
	_, err2 := o.Update(&userpro)
	if err1 != nil {
		return err1
	}
	if err2 != nil {
		return err2
	}
	return nil
}

func RemoveOrder(Oid interface{}) error {
	o := orm.NewOrm()
	order := Order{Id: Oid.(int)}
	_, err := o.Delete(&order)
	return err
}

func GetOrderListByUid(Uid interface{}) (error, []*Order) {
	o := orm.NewOrm()
	var orders []*Order
	_, err := o.QueryTable("order").Filter("UserProfile", Uid.(int)).RelatedSel().All(&orders)
	return err, orders
}
