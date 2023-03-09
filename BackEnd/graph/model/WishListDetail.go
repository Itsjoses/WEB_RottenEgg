package model

type WishListDetail struct {
	WishList   *WishList `json:"WishList"`
	Product    *Product  `json:"Product"`
	WishListId string
	ProductId  string
}
