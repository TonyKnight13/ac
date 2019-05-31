package models

type RegistRecv struct {
	Account   string
	Password1 string
	Password2 string
	Identity  string
}

type LoginRecv struct {
	Account   string
	Password  string
	AutoLogin string
}
