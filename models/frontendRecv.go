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
	UserId    int
	Id        int `json:"goodId"`
	Name      string
	Kind      string `json:"special"`
	Price     float32
	Available int
	Madein    int
	Forpet    string
	Intro     string
	ImgUrl    string
}

type OrderRecv struct {
	Id        int
	RealName  string
	Phone     string
	Address   string
	GoodsList []int
}

type ArticleRecv struct {
	Id      int `json:"articleId"`
	Title   string
	Special string
	Content string
}

type GoodsSelectRecv struct {
	GoodsKind []string
	Forpet    []string
	Madein    int
	OrderBy   string
}

type UserInfoRecv struct {
	Realname string
	Username string
	Sex      int
	Phone    string
	Address  string //医院殡葬
	Province string
	Hobby    string
	Intro    string
	Special  string
	Img      string
}
type DocsSelectRecv struct {
	Special []string `json:"specialcheked"`
	Area    []string `json:"areachecked"`
}

type AddressRecv struct {
	Id            int `json:"addressId"`
	Realname      string
	Phone         string
	AddressForLoc string
}
