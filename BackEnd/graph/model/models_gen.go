// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model

type Category struct {
	ID           string `json:"id"`
	CategoryName string `json:"CategoryName"`
}

type NewProduct struct {
	ProductName         string `json:"ProductName"`
	ProductCategoryName string `json:"ProductCategoryName"`
	ProductImage        string `json:"ProductImage"`
	ProductDescription  string `json:"ProductDescription"`
	ProductPrice        int    `json:"ProductPrice"`
	ProductStock        int    `json:"ProductStock"`
}

type NewShop struct {
	ShopName     string `json:"ShopName"`
	ShopEmail    string `json:"ShopEmail"`
	ShopPassword string `json:"ShopPassword"`
}

type NewUser struct {
	FirstName   string `json:"first_name"`
	LastName    string `json:"last_name"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	PhoneNumber string `json:"phone_number"`
}

type NewVoucher struct {
	VoucherName     string `json:"VoucherName"`
	VoucherDecPrice int    `json:"VoucherDecPrice"`
}

type ReviewInput struct {
	ProductID string `json:"ProductId"`
	UserID    string `json:"UserId"`
	ShopID    string `json:"ShopId"`
	Note      string `json:"Note"`
	Star      int    `json:"Star"`
}

type Shop struct {
	ID           string     `json:"id"`
	ShopName     string     `json:"ShopName"`
	ShopEmail    string     `json:"ShopEmail"`
	ShopPassword string     `json:"ShopPassword"`
	Banned       string     `json:"banned"`
	Banner       string     `json:"banner"`
	Product      []*Product `json:"Product"`
}

type User struct {
	ID          string      `json:"id"`
	FirstName   string      `json:"first_name"`
	LastName    string      `json:"last_name"`
	Email       string      `json:"email"`
	Password    string      `json:"password"`
	PhoneNumber string      `json:"phone_number"`
	Banned      string      `json:"banned"`
	Followed    []*Followed `json:"Followed"`
}

type Voucher struct {
	ID              string `json:"id"`
	VoucherName     string `json:"VoucherName"`
	VoucherDecPrice int    `json:"VoucherDecPrice"`
}
