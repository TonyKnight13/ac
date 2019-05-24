package utils

import (
	"github.com/astaxie/beego/orm"
)

type PageOptions struct {
	TableName     string
	Currentpage   int //当前页 ,默认1 每次分页,必须在前台设置新的页数,不设置始终默认1.在控制器中使用方式:cp, _ := this.GetInt("pno")   po.Currentpage = int(cp)
	PageSize      int //页面大小
	LinkItemCount int //生成标签的个数
}

func SetPageCond(title string, list []string, cond *orm.Condition) *orm.Condition {
	listCounts := len(list)
	if listCounts >= 1 {
		for i := 0; i < listCounts; i++ {
			cond.And(title, list[i])
		}
	}
	return cond
}

func GetPageInfo(po *PageOptions, conditions string, titles []string, list []string) (int, orm.QuerySeter) {
	if po.Currentpage <= 1 {
		po.Currentpage = 1
	}
	if po.PageSize == 0 {
		po.PageSize = 10
	}

	titlesCounts := len(titles)
	o := orm.NewOrm()
	cond := orm.NewCondition()

	qs := o.QueryTable(po.TableName)
	for i := 0; i < titlesCounts; i++ {
		cond = cond.AndCond(SetPageCond(titles[i], list, cond))
	}

	qs = qs.SetCond(cond)

	if conditions == "ASC" {
		qs.OrderBy("price")
	}

	if conditions == "DESC" {
		qs.OrderBy("-price")
	}
	itemNum64, _ := qs.Count()
	itemNum := int(itemNum64)
	return itemNum, qs
}
