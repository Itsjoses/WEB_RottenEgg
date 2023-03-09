package model

type Review struct {
	ProductId string
	UserId    string
	ShopId    string
	// Product *Product `json:"Product"`
	// User    *User    `json:"User"`
	// Shop    *Shop    `json:"Shop"`
	Note string `json:"Note"`
}
