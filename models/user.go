package models

import (
	"time"

	"github.com/astaxie/beego"

	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/validation"
	"github.com/gogather/com"
)

type User struct {
	Id          int `orm:"auto"`
	Account     string
	Password    string
	Identity    int          //0:普通用户 1:商家 2:医方
	UserProfile *UserProfile `orm:"null;rel(one);on_delete(set_null)"`
	Created     time.Time    `orm:"auto_now_add;type(datetime)"`
	Changed     time.Time    `orm:"auto_now_add;type(datetime)"`
}

type UserProfile struct {
	Id        int
	Realname  string `orm:"null"`
	Username  string
	Sex       byte `orm:"null"`
	Phone     string
	Email     string
	Hobby     string    `orm:"null"`
	Birth     time.Time `orm:"null;type(date)"`
	Intro     string    `orm:"null"`
	Province  string
	City      string
	CoverUrl  string `type(text)`
	Special   string
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

	user := &User{Account: Account, Password: pwdmd5, Identity: Identity}
	userpro := new(UserProfile)

	// 查询是否有重复的账号
	qs := o.QueryTable("user")
	err := qs.Filter("Account", Account).One(user)
	if err == nil {
		return err
	}

	userpro.User = user
	if v := vaild.Email(Account, "Email"); !v.Ok {
		userpro.Phone = Account
	} else {
		userpro.Email = Account
	}

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

	if user.Identity == 2 {
		pro.Special = updPro.Special
	}

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

func ChangePwd(userid interface{}, pwd string) error {
	o := orm.NewOrm()
	user := User{Id: userid.(int)}
	pwdmd5 := com.Md5(pwd)
	user.Password = pwdmd5
	user.Changed = time.Now()
	_, err := o.Update(&user)
	return err
}

func GetUserListByIdentity(Identity int) (error, []*UserProfile) {
	var userPros []*UserProfile
	var users []*User
	o := orm.NewOrm()
	_, err1 := o.QueryTable("user").Filter("identity", Identity).All(&users)
	if err1 != nil {
	}
	for _, user := range users {
		userPros = append(userPros, user.UserProfile)
	}
	beego.Info(userPros)
	return err1, userPros
}

func SelecrDoc(docSelectRecv DocsSelectRecv) (error, []*UserInfoRecv) {
	o := orm.NewOrm()
	var userInfos []*UserInfoRecv
	cond := orm.NewCondition()

	cond1 := cond.AndCond(SetPageCond("special", docSelectRecv.special)).AndCond(SetPageCond("province", docSelectRecv.area))
	qs := o.QueryTable("user_profile")
	qs = qs.SetCond(cond1)
	_, err := qs.All(&userInfos)
	return err, userInfos
}
