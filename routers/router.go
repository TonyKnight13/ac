// @APIVersion 1.0.0
// @Title ac API
// @Description ac API
// @Contact	289992302@qq.com

package routers

import (
	"actest/controllers"

	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.HomeController{})
	beego.Router("/login", &controllers.AccountController{})
	beego.Router("/logout", &controllers.LogoutController{})
	beego.Router("/addpet", &controllers.AddPetController{})
	beego.Router("/404.html", &controllers.BaseController{}, "*:Go404")
}
