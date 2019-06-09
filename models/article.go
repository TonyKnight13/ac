package models

import (
	"time"

	"github.com/astaxie/beego/orm"
)

type Article struct {
	Id          int `orm:"auto"`
	Title       string
	Special     string
	Content     string `orm:"type(text)"`
	ViewNum     int
	LikeNum     int
	Img         string       `orm:"type(text)"`
	Created     time.Time    `orm:"auto_now_add;type(datetime)"`
	Changed     time.Time    `orm:"auto_now_add;type(datetime)"`
	UserProfile *UserProfile `orm:"rel(fk)"` //author

}

func init() {
	orm.RegisterModel(new(Article))
}

func AddArticle(addUserid int, addArticle ArticleRecv) error {
	o := orm.NewOrm()

	userpro := &UserProfile{Id: addUserid}
	article := new(Article)
	err := o.Read(userpro)
	if err != nil {
		return err
	}

	article.Title = addArticle.Title
	article.Special = addArticle.Special
	article.Content = addArticle.Content
	article.Img = addArticle.Img

	article.Created = time.Now()
	article.Changed = time.Now()

	article.UserProfile = userpro

	_, err1 := o.Insert(article)
	_, err2 := o.Update(userpro)

	if err1 != nil {
		return err1
	}
	if err2 != nil {
		return err2
	}
	return nil
}

func GetArticleListBySpecial(special string) (error, []*Article) {
	o := orm.NewOrm()
	var articles []*Article
	_, err := o.QueryTable("article").Filter("special", special).All(&articles)
	return err, articles
}
