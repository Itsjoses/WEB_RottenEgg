package model

type Address struct {
	Title   string `json:"Title"`
	Address string `json:"address"`
	UserId  string
	// User    *User  `json:"User"`
}
