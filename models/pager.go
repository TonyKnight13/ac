package models

type PageOptions struct {
	Currentpage   int //当前页 ,默认1 每次分页,必须在前台设置新的页数,不设置始终默认1.在控制器中使用方式:cp, _ := this.GetInt("pno")   po.Currentpage = int(cp)
	PageSize      int //页面大小
	LinkItemCount int //生成标签的个数
}

func GetPageInfo(tableName string, currentpage int, pagesize int, conditions []string) (int int) {
	if currentpage <= 1 {
		currentpage = 1
	}
	if pagesize == 0 {
		pagesize = 20
	}

}
