package models

import (
	"time"

	"github.com/astaxie/beego/orm"
)

type Pet struct {
	Id          int
	Name        string
	Speci       string
	Variety     string
	Sex         bool
	Birth       time.Time `orm:"null;type(date)"`
	Intro       string    `orm:"null"`
	Partner     bool
	Created     time.Time    `orm:"auto_now_add;type(datetime)"`
	Changed     time.Time    `orm:"auto_now_add;type(datetime)"`
	UserProfile *UserProfile `orm:"rel(fk)"`
	PetImg      []*PetImg    `orm:"null;reverse(many);on_delete(set_null)"`
}

type PetImg struct {
	Id     int
	Cover  bool   `orm:"default(0)"`
	ImgURL string `orm:"column(imgURL)"`
	Pet    *Pet   `orm:"rel(fk)"`
}

func init() {
	orm.RegisterModel(new(Pet), new(PetImg))
}

func (p *Pet) TableName() string {
	return "pet"
}

func (pi *PetImg) TableName() string {
	return "petImg"
}

// 添加宠物信息
func AddPetInfo(addPet Pet, addPetIMG PetImg, adduserid int) error {
	o := orm.NewOrm()
	o.Using("default")
	pet := new(Pet)
	petimg := new(PetImg)
	var userpro UserProfile
	userpro = UserProfile{Id: adduserid}

	err := o.Read(&userpro)
	if err != nil {
		return err
	}

	petimg.ImgURL = addPetIMG.ImgURL
	petimg.Cover = addPetIMG.Cover
	petimg.Pet = pet

	pet.Birth = addPet.Birth
	pet.Name = addPet.Name
	pet.Sex = addPet.Sex
	pet.Speci = addPet.Speci
	pet.Variety = addPet.Variety
	pet.Intro = addPet.Intro
	pet.Partner = addPet.Partner

	pet.Created = time.Now()
	pet.Changed = time.Now()

	pet.UserProfile = &userpro

	_, err1 := o.Insert(pet)
	_, err2 := o.Insert(petimg)
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

// 更新宠物信息
func UpdatePetInfo(id int, updPI Pet, updPetIMG PetImg) error {
	o := orm.NewOrm()
	pet := Pet{Id: id}
	petimg := new(PetImg)

	petimg.ImgURL = updPetIMG.ImgURL
	petimg.Cover = updPetIMG.Cover
	petimg.Pet = &pet

	pet.Birth = updPI.Birth
	pet.Name = updPI.Name
	pet.Sex = updPI.Sex
	pet.Speci = updPI.Speci
	pet.Partner = updPI.Partner
	pet.Intro = updPI.Intro
	pet.Variety = updPI.Variety

	pet.Changed = time.Now()

	_, err := o.Update(&pet)
	return err
}

// 函数作用:对页面的选择结果进行筛选
func ListPet(condMap map[string]string, page int, offset int) (num int64, err error, petarr []Pet) {
	o := orm.NewOrm()
	qs := o.QueryTable("pet")
	cond := orm.NewCondition()

	if condMap["district"] != "" {
		cond = cond.And("uarea", condMap["district"])
	}
	if condMap["speci"] != "" {
		cond = cond.And("speci", condMap["speci"])
	}
	if condMap["variety"] != "" {
		cond = cond.And("variety", condMap["variety"])
	}
	if condMap["keywords"] != "" {
		cond = cond.Or("keywords__icontains", condMap["keywords"])
	}

	qs = qs.SetCond(cond)
	if page < 1 {
		page = 1
	}
	if offset < 1 {
		offset = 40
	}

	start := (page - 1) * offset
	var pets []Pet
	num, err1 := qs.Limit(offset, start).All(&pets)
	return num, err1, pets
}

// 函数作用:对页筛选结果进行计数
func CountPet(condMap map[string]string) int64 {
	o := orm.NewOrm()
	qs := o.QueryTable("pet")
	cond := orm.NewCondition()

	// if condMap["now"] == "petmatch"{
	// 	if condMap["Partner"] == "0" {
	// 		cond = cond.And("")
	// 	}
	// }
	if condMap["district"] != "" {
		cond = cond.And("uarea", condMap["district"])
	}
	if condMap["speci"] != "" {
		cond = cond.And("speci", condMap["speci"])
	}
	if condMap["variety"] != "" {
		cond = cond.And("variety", condMap["variety"])
	}
	if condMap["keywords"] != "" {
		cond = cond.Or("keywords__icontains", condMap["keywords"])
	}

	num, _ := qs.SetCond(cond).Count()
	return num
}
