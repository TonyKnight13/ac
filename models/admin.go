package models

import (
	// "regexp"

	// "github.com/astaxie/beego"

	"github.com/astaxie/beego/orm"
)

type PetSpeci struct {
	Id      int
	Name    string
	PetVari []*PetVari `orm:"reverse(many)"`
}

type PetVari struct {
	Id       int
	Name     string
	PetSpeci *PetSpeci `orm:"rel(fk)"`
}

type Province struct {
	Id   int
	Name string
	City []*City `orm:"reverse(many)"`
}

type City struct {
	Id        int
	Id_in_pro int
	Name      string
	Province  *Province `orm:"rel(fk)"`
}

type GoodsKind struct {
	Id   int
	Name string
}

var regStruct map[string]interface{}

func init() {
	orm.RegisterModel(new(PetSpeci), new(PetVari), new(Province), new(City), new(GoodsKind))
}

func ShowValues(tableName string) (int64, []orm.Params) {
	// dbname := beego.AppConfig.String("mysqldb")
	o := orm.NewOrm()
	qs := o.QueryTable(tableName)

	var maps []orm.Params
	num, err := qs.Values(&maps)
	if err != nil {
	}
	return num, maps
}

func ShowValuesList(tableName string) (int64, []orm.ParamsList) {
	o := orm.NewOrm()
	qs := o.QueryTable(tableName)
	var lists []orm.ParamsList
	num, err := qs.ValuesList(&lists)
	if err != nil {
	}
	return num, lists
}
