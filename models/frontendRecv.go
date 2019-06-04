package models

type RegistRecv struct {
	Account   string
	Password1 string
	Password2 string
	Identity  int
}

type LoginRecv struct {
	Account   string
	Password  string
	AutoLogin string
}

type GoodsInfoRecv struct {
	Goods  GoodsInfo
	ImgUrl string
}

type OrderRecv struct {
	Id        int
	RealName  string
	Phone     string
	Address   string
	GoodsList []int
}

type ArticleRecv struct {
	Id      int
	Title   string
	Special string
	Content string
}
