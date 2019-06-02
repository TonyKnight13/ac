package models

import (
	"github.com/astaxie/beego/orm"
)

func GetGoodsList() (int64, []*GoodsInfo) {
	o := orm.NewOrm()
	var goods []*GoodsInfo
	num, err := o.QueryTable("goodsinfo").All(&goods)
	if err != nil {
	}
	return num, goods
}

// type ItmeList struct {
// 	Name string
// 	Num  int
// }

// func GetShopListItem() {
// 	kindsNum, shopKindsMaps := ShowValues("goods_kind")
// 	var data map[string]interface{}
// 	for _, kindsMap := range shopKindsMaps {
// 		data["kind"] = kindsMap["Name"]
// 	}
// 	petNum, shopPetMaps := ShowValues("pet_speci")
// 	for _, petMap := range shopPetMaps {
// 		data["forpet"] = petMap["Name"]
// 	}
// 	beego.Info(data, kindsNum, petNum)
// }

// func GetDrList() {
// 	madeinNum, shopMadeinMaps := ShowValues("province")
// 	for _, madeinMap := range shopMadeinMaps {
// 		fmt.Println(madeinMap["Name"])
// 	}
// 	petNum, shopPetMaps := ShowValues("pet_speci")
// 	for _, petMap := range shopPetMaps {
// 		fmt.Println(petMap["Name"])
// 	}
// }
