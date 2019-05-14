package models

import (
	"time"

	"github.com/astaxie/beego/orm"
)

type GoodsInfo struct {
	Id          int `orm:"auto"`
	Name        string
	Kind        string //商品种类
	Price       float32
	Available   bool
	Madein      string       //产地
	Forpet      string       //针对宠物类别
	Intro       string       //简介
	Created     time.Time    `orm:"auto_now_add;type(datetime)"`
	Changed     time.Time    `orm:"auto_now_add;type(datetime)"`
	UserProfile *UserProfile `orm:"rel(fk)"` //seller
	GoodsImg    []*GoodsImg  `orm:"null;reverse(many);on_delete(set_null)"`
}

type GoodsImg struct {
	Id        int
	Cover     bool `orm:"default(0)"`
	ImgUrl    string
	GoodsInfo *GoodsInfo `orm:"rel(fk)"`
}

func init() {
	orm.RegisterModel(new(GoodsInfo), new(GoodsImg))
}

func (g *GoodsInfo) TableName() string {
	return "goodsinfo"
}

func (gi *GoodsImg) TableName() string {
	return "goodsimg"
}

/*
AddGoodsInfo
当seller上传商品时调用该函数，因此首先要将在这里作为外键但是是seller主键的Id获取掉
*/

func AddGoodsInfo(addGoodsInfo GoodsInfo, addGoodsIMG GoodsImg, adduserid int) error {
	o := orm.NewOrm()
	o.Using("default")
	goodsinfo := new(GoodsInfo)
	goodsimg := new(GoodsImg)
	var userpro UserProfile
	userpro = UserProfile{Id: adduserid}

	err := o.Read(&userpro)
	if err != nil {
		return err
	}

	goodsimg.ImgUrl = addGoodsIMG.ImgUrl
	goodsimg.Cover = addGoodsIMG.Cover
	goodsimg.GoodsInfo = goodsinfo

	goodsinfo.Name = addGoodsInfo.Name
	goodsinfo.Kind = addGoodsInfo.Kind
	goodsinfo.Price = addGoodsInfo.Price
	goodsinfo.Available = addGoodsInfo.Available
	goodsinfo.Forpet = addGoodsInfo.Forpet
	goodsinfo.Madein = addGoodsInfo.Madein

	goodsinfo.Created = time.Now()
	goodsinfo.Changed = time.Now()

	goodsinfo.UserProfile = &userpro

	_, err1 := o.Insert(goodsinfo)
	_, err2 := o.Insert(goodsimg)
	_, err3 := o.Update(&userpro)

	if err1 != nil {
		return err1
	}
	if err2 != nil {
		return err2
	}
	if err3 != nil {
		return err3
	}
	return nil
}

func UpdateGoodsInfo(id int, updGoods GoodsInfo, updGoodsImg GoodsImg) error {
	o := orm.NewOrm()
	goodsinfo := GoodsInfo{Id: id}
	goodsimg := new(GoodsImg)

	goodsimg.ImgUrl = updGoodsImg.ImgUrl
	goodsimg.Cover = updGoodsImg.Cover
	goodsimg.GoodsInfo = &goodsinfo

	goodsinfo.Intro = updGoods.Intro
	goodsinfo.Forpet = updGoods.Forpet
	goodsinfo.Kind = updGoods.Kind 
	goodsinfo.Available = updGoods.Available
	goodsinfo.Madein = updGoods.Madein
	goodsinfo.Price = updGoods.Price

	goodsinfo.Changed = time.Now()

	_, err := o.Update(&goodsinfo)
	return err
}
