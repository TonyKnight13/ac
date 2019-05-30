package controllers

import (
	. "actest/models"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/utils/pagination"
)

type ListPetController struct {
	BaseController
}

func (lp *ListPetController) Get() {
	lp.Data["IsPetmatch"] = true
	page, err1 := lp.GetInt("p") //参照beegoblog，但是反复看了几个小时也没搞明白这个p从何而来，这几行都是为了获取表单参数
	speci := lp.GetString("speci")
	variety := lp.GetString("variety")
	keywords := lp.GetString("keywords")
	district := lp.GetString("district")

	if err1 != nil {
		page = 1
	}

	offset, err2 := beego.AppConfig.Int("pageoffset")
	if err2 != nil {
		offset = 40
	}

	condMap := make(map[string]string)
	condMap["now"] = "petmatch"
	condMap["speci"] = speci
	condMap["keywords"] = keywords
	condMap["variety"] = variety
	condMap["district"] = district

	countPet := CountPet(condMap)

	paginator := pagination.SetPaginator(lp.Ctx, offset, countPet)
	_, _, pet := ListPet(condMap, page, offset)

	// _, _, specival := DistinctNum("speci")
	// _, _, varietyval := DistinctNum("variety")
	// _, _, specivalue := DistinctNum("")

	lp.Data["paginator"] = paginator
	lp.Data["pet"] = pet
	// lp.Data["speci"] = specival
	// lp.Data["variety"] = varietyval
	lp.TplName = "petmatch.html"
}
