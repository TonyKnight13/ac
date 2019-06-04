package main

import (
	_ "actest/initial"
	_ "actest/models"
	_ "actest/routers"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

func main() {
	orm.Debug = true
	orm.RunSyncdb("default", false, true)
	beego.Run()
}
