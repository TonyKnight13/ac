package models

import (
	"encoding/base64"
	"io/ioutil"
	"time"

	"github.com/astaxie/beego"

	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/validation"
	"github.com/gogather/com"
)

type User struct {
	Id          int `orm:"auto" json:"userId"`
	Account     string
	Password    string
	Identity    int          //0:普通用户 1:商家 2:医方 3:医院 4：殡葬公司
	UserProfile *UserProfile `orm:"null;rel(one);on_delete(set_null)"`
	Created     time.Time    `orm:"auto_now_add;type(datetime)"`
	Changed     time.Time    `orm:"auto_now_add;type(datetime)"`
}

type UserProfile struct {
	Id        int    `json:"userId"`
	Realname  string `orm:"null"`
	Username  string
	Identity  int  //0:普通用户 1:商家 2:医方 3:医院 4：殡葬公司
	Sex       byte `orm:"null"`
	Phone     string
	Email     string    `orm:"null"`
	Hobby     string    `orm:"null"`
	Birth     time.Time `orm:"null;type(date)"`
	Intro     string    `orm:"null"`
	Province  string
	City      string       `orm:"null"`
	CoverUrl  string       `orm:"type(text)" json:"Img"`
	Special   string       `orm:"null"`
	Addresses []*Address   `orm:"null;reverse(many)"`
	Articles  []*Article   `orm:"null;reverse(many)"`
	Orders    []*Order     `orm:"null;reverse(many)"`
	Goods     []*GoodsInfo `orm:"null;reverse(many)"`
	Pet       []*Pet       `orm:"null;reverse(many)"`
	User      *User        `orm:"reverse(one)"`
}

func init() {
	orm.RegisterModel(new(User), new(UserProfile))
}

func (u *User) TableName() string {
	return "user"
}

func (up *UserProfile) TableName() string {
	return "user_profile"
}

func Register(Account string, Password string, Identity int) error {
	o := orm.NewOrm()
	vaild := validation.Validation{}

	pwdmd5 := com.Md5(Password)

	user := &User{Account: Account, Password: pwdmd5}
	userpro := new(UserProfile)

	// 查询是否有重复的账号
	qs := o.QueryTable("user")
	err := qs.Filter("Account", Account).One(user)
	if err == nil {
		return err
	}

	userpro.User = user
	userpro.Identity = Identity
	user.Identity = Identity
	if v := vaild.Email(Account, "Email"); !v.Ok {
		userpro.Phone = Account
	} else {
		userpro.Email = Account
	}

	ImgString, _ := ioutil.ReadFile("./data/default/default.jpg")
	userpro.CoverUrl = "data:image/jpeg;base64," + base64.StdEncoding.EncodeToString(ImgString)

	user.Created = time.Now()
	user.Changed = time.Now()
	user.UserProfile = userpro

	_, err1 := o.Insert(userpro)
	if err1 != nil {
		return err1
	}

	_, err2 := o.Insert(user)
	if err2 != nil {
		return err2
	}
	return nil
}

func UpdatePro(id int, updPro UserInfoRecv) error {
	o := orm.NewOrm()

	var pro UserProfile
	var user User
	errUserProfile := o.QueryTable("user_profile").Filter("id", id).One(&pro)
	errUser := o.QueryTable("user").Filter("id", id).One(&user)

	if errUserProfile != nil {
		return errUserProfile
	}

	if errUser != nil {
		return errUser
	}

	pro.Special = updPro.Special
	pro.CoverUrl = updPro.Img
	pro.Realname = updPro.Realname
	pro.Username = updPro.Username
	pro.Province = updPro.Province
	// pro.Birth = updPro.Birth
	pro.Hobby = updPro.Hobby
	pro.Sex = byte(updPro.Sex)
	pro.Intro = updPro.Intro
	// pro.Email = updPro.Email
	pro.Phone = updPro.Phone

	user.Changed = time.Now()
	_, err1 := o.Update(&pro)
	_, err2 := o.Update(&user)
	if err1 != nil {
		return err1
	}
	if err2 != nil {
		return err2
	}

	return nil
}

func CheckLog(Account string, Password string) (err error, user *User) {
	o := orm.NewOrm()
	pwdmd5 := com.Md5(Password)

	user = &User{Account: Account, Password: pwdmd5}

	qs := o.QueryTable(user)
	err = qs.Filter("Account", Account).Filter("Password", pwdmd5).One(user)

	return err, user
}

func GetUserByAccount(account interface{}) (err error, user *User) {
	o := orm.NewOrm()
	user = new(User)
	qs := o.QueryTable(user)
	err = qs.Filter("Account", account).One(user)

	return err, user
}

func GetUserProById(uid interface{}) (error, *UserProfile) {
	o := orm.NewOrm()
	userPro := &UserProfile{Id: uid.(int)}
	err := o.Read(userPro)
	return err, userPro
}

func ChangePwd(userid interface{}, pwd string) error {
	o := orm.NewOrm()
	user := User{Id: userid.(int)}
	errRead := o.Read(&user)
	if errRead != nil {
		return errRead
	}
	pwdmd5 := com.Md5(pwd)
	user.Password = pwdmd5
	user.Changed = time.Now()
	_, err := o.Update(&user)
	return err
}

func GetUserListByIdentity(Identity int) (error, []*UserProfile) {
	var userPros []*UserProfile
	o := orm.NewOrm()
	_, err1 := o.QueryTable("user_profile").Filter("identity", Identity).All(&userPros)
	return err1, userPros
}

func SelecrDoc(docSelectRecv DocsSelectRecv) (error, []*UserProfile) {
	o := orm.NewOrm()
	beego.Info(docSelectRecv)
	var userInfos []*UserProfile
	cond := orm.NewCondition()
	cond = cond.And("identity", 2)
	cond1 := cond.AndCond(SetPageCond("special", docSelectRecv.Special)).AndCond(SetPageCond("province", docSelectRecv.Area))
	qs := o.QueryTable("user_profile")
	qs = qs.SetCond(cond1)
	_, err := qs.All(&userInfos)
	return err, userInfos
}
