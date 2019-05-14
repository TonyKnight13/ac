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
	Id       int
	Kindname string
}

var regStruct map[string]interface{}

func init() {
	orm.RegisterModel(new(PetSpeci), new(PetVari), new(Province), new(City), new(GoodsKind))
}

func ShowValues(tableName string) interface{} {
	// dbname := beego.AppConfig.String("mysqldb")
	o := orm.NewOrm()
	qs := o.QueryTable(tableName)

	var maps []orm.Params
	_, err := qs.Values(&maps)
	if err != nil {
	}
	return maps
	// 得到一张表的所有内容，并且以键值对的结构存储，键：字段名；值：该字段所有值的数组
	// 这10行代码是用来正则来做表名的转换，因为beego的orm对于"aaBb"这种命名的字符串会自动在数据库那里转为”aa_Bb“,而后面为了查列名用了原生的sql语句，
	// 没有使用orm，所以要对传入的表名进行转换，即在合适的位置添加"_"

	// reg1 := regexp.MustCompile(`[A-Z]+`)
	// regstrings := reg1.FindAllString(tableName, -1)
	// regstringsLen := len(regstrings)
	// rstr := regstrings[regstringsLen-1]
	// rchs := string(rstr[0])

	// reg2 := regexp.MustCompile(rstr)
	// rep := "_"+rchs
	// rep += "${1}"
	// tbnameforRaw := reg2.ReplaceAllString(tableName, rep)

	// var vmap map[string]interface{}
	// vmap = make(map[string]interface{}) //初始化

	// var list orm.ParamsList
	// var fieldList orm.ParamsList
	// _, err1 := o.Raw("select COLUMN_NAME from information_schema.columns where table_name= ? and table_schema= ? ", tbnameforRaw, dbname).ValuesFlat(&fieldList)
	// if err1 != nil {
	// }

	// for _, v := range fieldList {
	// 	filed := v.(string)
	// 	_, err2 := qs.ValuesFlat(&list, filed)
	// 	if err2 == nil {
	// 		vmap[filed] = list
	// 	}
	// }
	// return vmap

}
