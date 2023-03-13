package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.24

import (
	"context"

	database "github.com/Itsjose.s/gqlgen-todos/Database"
	"github.com/Itsjose.s/gqlgen-todos/graph/model"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

// Shopget is the resolver for the Shopget field.
func (r *queryResolver) Shopget(ctx context.Context, id string) (*model.Shop, error) {
	var shop *model.Shop
	r.DB.Where("id like ?", id).Take(&shop)
	return shop, nil
}

// CategoryGet is the resolver for the CategoryGet field.
func (r *queryResolver) CategoryGet(ctx context.Context, id string) ([]*model.Product, error) {
	var category []*model.Category
	r.DB.Model(&category).Find(&category)
	var productget []*model.Product
	for i := 0; i < len(category); i++ {
		var product *model.Product
		err := r.DB.Where("shop_id = ? and category_id = ?", id, category[i].ID).Take(&product).Error
		if err == nil {
			productget = append(productget, product)
		}
	}

	return productget, nil
}

// ProductRecommended is the resolver for the ProductRecommended field.
func (r *queryResolver) ProductRecommended(ctx context.Context, id string) ([]*model.Product, error) {
	var product []*model.Product
	r.DB.Where("shop_id like ?", id).Find(&product).Limit(5)
	return product, nil
}

// LoginShop is the resolver for the LoginShop field.
func (r *queryResolver) LoginShop(ctx context.Context, shopEmail string, shopPassword string) (*model.Shop, error) {
	db := database.GetDB()
	var shop model.Shop
	emailerr := db.Model(shop).Where("shop_email LIKE ?", shopEmail).Take(&shop).Error
	if emailerr != nil {
		if emailerr == gorm.ErrRecordNotFound {
			return nil, gqlerror.Errorf("the email is not found!")
		}
	}
	if shopPassword == shop.ShopPassword {
		return &shop, nil
	}
	return nil, gqlerror.Errorf("invalid password!")
}

// Product is the resolver for the Product field.
func (r *shopResolver) Product(ctx context.Context, obj *model.Shop) ([]*model.Product, error) {
	var Product []*model.Product
	return Product, r.DB.Where("shop_id like ?", obj.ID).Find(&Product).Error
}

// Review is the resolver for the Review field.
func (r *shopResolver) Review(ctx context.Context, obj *model.Shop) ([]*model.Review, error) {
	var review []*model.Review
	return review, r.DB.Where("shop_id like ?", obj.ID).Find(&review).Error
}

// Shop returns ShopResolver implementation.
func (r *Resolver) Shop() ShopResolver { return &shopResolver{r} }

type shopResolver struct{ *Resolver }
