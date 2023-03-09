package model

type WishList struct {
	ID      string `json:"id"`
	Name    string `json:"Name"`
	Privacy string `json:"Privacy"`
	UserId  string
	// User    *User `json:"User"`
}
