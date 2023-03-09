package graph

//go:generate go run github.com/99designs/gqlgen generate
import (
	"github.com/Itsjose.s/gqlgen-todos/graph/model"
	"gorm.io/gorm"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DB             *gorm.DB
	product        *[]model.Product
	wishlist       *[]model.WishList
	wishlistdetail *[]model.WishListDetail
	followed       *[]model.Followed
}
