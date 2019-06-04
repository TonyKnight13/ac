package models

import (
	"github.com/astaxie/beego/orm"
)

type PageOptions struct {
	Currentpage   int //当前页 ,默认1 每次分页,必须在前台设置新的页数,不设置始终默认1.在控制器中使用方式:cp, _ := this.GetInt("pno")   po.Currentpage = int(cp)
	PageSize      int //页面大小
	LinkItemCount int //生成标签的个数
}

func SetPageCond(title string, list []string) *orm.Condition {
	cond := orm.NewCondition()
	listCounts := len(list)
	if listCounts >= 1 {
		for i := 0; i < listCounts; i++ {
			cond.Or(title, list[i])
		}
	}
	return cond
}
