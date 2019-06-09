package models

import (
	"github.com/astaxie/beego/orm"
)

type Address struct {
	Id            int `orm:"auto" json:"addressId"`
	Realname      string
	Phone         string
	AddressForLoc string
	UserProfile   *UserProfile `orm:"rel(fk)"`
}

func init() {
	orm.RegisterModel(new(Address))
}

func AddAddress(adduserid int, addAddress AddressRecv) error {
	o := orm.NewOrm()
	address := new(Address)
	userpro := UserProfile{Id: adduserid}

	err := o.Read(&userpro)
	if err != nil {
		return err
	}

	address.Phone = addAddress.Phone
	address.Realname = addAddress.Realname
	address.AddressForLoc = addAddress.AddressForLoc

	address.UserProfile = &userpro

	_, err1 := o.Insert(address)
	// _, err2 := o.Update(&userpro)
	if err1 != nil {
		return err1
	}
	// if err2 != nil {
	// 	return err2
	// }
	return nil

}

func UpdateAddress(addAddress AddressRecv) error {
	o := orm.NewOrm()
	address := &Address{Id: addAddress.Id}
	errRead := o.Read(address)
	if errRead != nil {
		return errRead
	}

	address.Phone = addAddress.Phone
	address.Realname = addAddress.Realname
	address.AddressForLoc = addAddress.AddressForLoc
	_, err := o.Update(address)
	return err
}

func GetAddressListByUid(Uid interface{}) (error, []*Address) {
	o := orm.NewOrm()
	var addresses []*Address
	_, err := o.QueryTable("address").Filter("UserProfile", Uid.(int)).RelatedSel().All(&addresses)
	return err, addresses
}

func RemoveAddress(Aid interface{}) error {
	o := orm.NewOrm()
	address := Address{Id: Aid.(int)}
	_, err := o.Delete(&address)
	return err
}
