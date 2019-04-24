package models

import (
	"time"

	"github.com/astaxie/beego/orm"
	"github.com/astaxie/beego/validation"
	"github.com/gogather/com"
)

type User struct {
	Id          int `orm:"auto"`
	Account     string
	Password    string
	UserProfile *UserProfile `orm:"null;rel(one);on_delete(set_null)"`
	Created     time.Time    `orm:"auto_now_add;type(datetime)"`
	Changed     time.Time    `orm:"auto_now_add;type(datetime)"`
}

type UserProfile struct {
	Id       int
	Realname string `orm:"null"`
	Username string
	Sex      bool `orm:"null"`
	Phone    string
	Email    string
	Address  string
	Hobby    string    `orm:"null"`
	Birth    time.Time `orm:"null;type(date)"`
	Intro    string    `orm:"null"`
	Province string
	City     string
	CoverUrl string
	Pet      []*Pet `orm:"null;reverse(many)"`
	User     *User  `orm:"reverse(one)"`
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

func register(Account string, Password string) error {
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

func UpdatePro(id int, updPro UserProfile) error {
	o := orm.NewOrm()
	pro := UserProfile{Id: id}

	pro.CoverUrl = updPro.CoverUrl
	pro.Address = updPro.Address
	pro.Realname = updPro.Realname
	pro.Username = updPro.Username
	pro.Birth = updPro.Birth
	pro.Hobby = updPro.Hobby
	pro.Sex = updPro.Sex
	pro.Intro = updPro.Intro
	pro.Email = updPro.Email
	pro.Phone = updPro.Phone
	pro.User.Changed = time.Now()
	_, err := o.Update(&pro)
	return err
}

func CheckLog(Account string, Password string) (err error, user *User) {
	o := orm.NewOrm()
	pwdmd5 := com.Md5(Password)

	user = &User{Account: Account, Password: pwdmd5}

	qs := o.QueryTable(user)
	err = qs.Filter("Account", Account).Filter("Password", pwdmd5).One(user)

	return err, user
}

func GetUserByAccount(account string) (err error, user *User) {
	o := orm.NewOrm()
	user = new(User)
	qs := o.QueryTable(user)
	err = qs.Filter("Account", account).One(user)
	return err, user
}
