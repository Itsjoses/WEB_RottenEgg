package model

type ReviewQueue struct {
	ID        string `json:"Id"`
	UserId    string
	ProductId string
	// User     *User    `json:"User"`
	// Product  *Product `json:"Product"`
	Quantity int `json:"Quantity"`
}
