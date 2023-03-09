package model

type Followed struct {
	User       *User     `json:"User"`
	WishList   *WishList `json:"WishList"`
	UserId     string
	WishListId string
}
