package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

    beego.GlobalControllerRouter["actest/controllers:IndexController"] = append(beego.GlobalControllerRouter["actest/controllers:IndexController"],
        beego.ControllerComments{
            Method: "Get",
            Router: `/`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:UserController"] = append(beego.GlobalControllerRouter["actest/controllers:UserController"],
        beego.ControllerComments{
            Method: "Login",
            Router: `/users/login`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:UserController"] = append(beego.GlobalControllerRouter["actest/controllers:UserController"],
        beego.ControllerComments{
            Method: "Regist",
            Router: `/users/register`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

}
