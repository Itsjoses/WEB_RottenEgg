package model

type Cart struct {
	// User     *User    `json:"User"`
	// Product  *Product `json:"Product"`
	UserId    string
	ProductId string
	Quantity  int    `json:"Quantity"`
	Status    string `json:"Status"`
}
