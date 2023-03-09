package model

type Product struct {
	ID          string `json:"id"`
	ProductName string `json:"ProductName"`
	CategoryID  string
	// ProductCategory    *Category `json:"ProductCategory"`
	ProductImage       string `json:"ProductImage"`
	ProductDescription string `json:"ProductDescription"`
	ProductPrice       int    `json:"ProductPrice"`
	ProductStock       int    `json:"ProductStock"`
	ShopId             string
}
