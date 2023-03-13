package model

type Review struct {
	ID        string `json:"id"`
	ProductId string
	UserId    string
	ShopId    string
	Pros      string `json:"Pros"`
	Cons      string `json:"Cons"`
	Overall   string `json:"Overall"`
	Star      int    `json:"Star"`
}
