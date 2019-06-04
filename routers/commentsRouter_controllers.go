package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

    beego.GlobalControllerRouter["actest/controllers:HospitalController"] = append(beego.GlobalControllerRouter["actest/controllers:HospitalController"],
        beego.ControllerComments{
            Method: "DoctorList",
            Router: `/hospital/docNavList`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:HospitalController"] = append(beego.GlobalControllerRouter["actest/controllers:HospitalController"],
        beego.ControllerComments{
            Method: "DoctorSelect",
            Router: `/hospital/docSelect`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:HospitalController"] = append(beego.GlobalControllerRouter["actest/controllers:HospitalController"],
        beego.ControllerComments{
            Method: "HospitalList",
            Router: `/hospital/hospitalNavList`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:IndexController"] = append(beego.GlobalControllerRouter["actest/controllers:IndexController"],
        beego.ControllerComments{
            Method: "Get",
            Router: `/`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:ShopController"] = append(beego.GlobalControllerRouter["actest/controllers:ShopController"],
        beego.ControllerComments{
            Method: "CartAdd",
            Router: `/shop/cartAdd`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:ShopController"] = append(beego.GlobalControllerRouter["actest/controllers:ShopController"],
        beego.ControllerComments{
            Method: "CartDel",
            Router: `/shop/cartDel`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:ShopController"] = append(beego.GlobalControllerRouter["actest/controllers:ShopController"],
        beego.ControllerComments{
            Method: "CartEdit",
            Router: `/shop/cartEdit`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:ShopController"] = append(beego.GlobalControllerRouter["actest/controllers:ShopController"],
        beego.ControllerComments{
            Method: "CartList",
            Router: `/shop/cartList`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:ShopController"] = append(beego.GlobalControllerRouter["actest/controllers:ShopController"],
        beego.ControllerComments{
            Method: "GoodsDetail",
            Router: `/shop/goodsDetail`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:ShopController"] = append(beego.GlobalControllerRouter["actest/controllers:ShopController"],
        beego.ControllerComments{
            Method: "GoodsListSelect",
            Router: `/shop/goodsListSelect`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:ShopController"] = append(beego.GlobalControllerRouter["actest/controllers:ShopController"],
        beego.ControllerComments{
            Method: "ShopList",
            Router: `/shop/navList`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:ShopController"] = append(beego.GlobalControllerRouter["actest/controllers:ShopController"],
        beego.ControllerComments{
            Method: "OrderAdd",
            Router: `/shop/orderAdd`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:ShopController"] = append(beego.GlobalControllerRouter["actest/controllers:ShopController"],
        beego.ControllerComments{
            Method: "OrderDel",
            Router: `/shop/orderDel[get]`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:ShopController"] = append(beego.GlobalControllerRouter["actest/controllers:ShopController"],
        beego.ControllerComments{
            Method: "OrderList",
            Router: `/shop/orderList`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:UserController"] = append(beego.GlobalControllerRouter["actest/controllers:UserController"],
        beego.ControllerComments{
            Method: "AddAddress",
            Router: `/users/addAddress`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:UserController"] = append(beego.GlobalControllerRouter["actest/controllers:UserController"],
        beego.ControllerComments{
            Method: "AddressList",
            Router: `/users/addressList`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:UserController"] = append(beego.GlobalControllerRouter["actest/controllers:UserController"],
        beego.ControllerComments{
            Method: "ChangePwd",
            Router: `/users/changePass`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:UserController"] = append(beego.GlobalControllerRouter["actest/controllers:UserController"],
        beego.ControllerComments{
            Method: "DelAddress",
            Router: `/users/delAddress`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:UserController"] = append(beego.GlobalControllerRouter["actest/controllers:UserController"],
        beego.ControllerComments{
            Method: "GoodsAdd",
            Router: `/users/goodsAdd`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:UserController"] = append(beego.GlobalControllerRouter["actest/controllers:UserController"],
        beego.ControllerComments{
            Method: "GoodsList",
            Router: `/users/goodsList`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:UserController"] = append(beego.GlobalControllerRouter["actest/controllers:UserController"],
        beego.ControllerComments{
            Method: "GoodsUpdate",
            Router: `/users/goodsUpdate`,
            AllowHTTPMethods: []string{"post"},
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
            Method: "Logout",
            Router: `/users/logout`,
            AllowHTTPMethods: []string{"get"},
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

    beego.GlobalControllerRouter["actest/controllers:UserController"] = append(beego.GlobalControllerRouter["actest/controllers:UserController"],
        beego.ControllerComments{
            Method: "UpdateAddress",
            Router: `/users/updateAddress`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:UserController"] = append(beego.GlobalControllerRouter["actest/controllers:UserController"],
        beego.ControllerComments{
            Method: "UserInfo",
            Router: `/users/userInfo`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:UserController"] = append(beego.GlobalControllerRouter["actest/controllers:UserController"],
        beego.ControllerComments{
            Method: "UserInfoUpdate",
            Router: `/users/userInfoUpdate`,
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["actest/controllers:WikiController"] = append(beego.GlobalControllerRouter["actest/controllers:WikiController"],
        beego.ControllerComments{
            Method: "ArticleList",
            Router: `/baike/experience[get]`,
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

}
