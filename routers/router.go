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
	beego.Include(
		&controllers.IndexController{},
		&controllers.UserController{},
	)
}
