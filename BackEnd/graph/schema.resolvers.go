package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.24

import (
	"context"
	"fmt"

	database "github.com/Itsjose.s/gqlgen-todos/Database"
	"github.com/Itsjose.s/gqlgen-todos/graph/model"
	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
	gomail "gopkg.in/gomail.v2"
	"gorm.io/gorm"
)

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUser) (*model.User, error) {
	user := &model.User{
		ID:          uuid.NewString(),
		FirstName:   input.FirstName,
		LastName:    input.LastName,
		Password:    input.Password,
		Email:       input.Email,
		PhoneNumber: input.PhoneNumber,
		Banned:      "unban",
	}

	r.DB.Create(user)
	return user, nil
}

// CreateVoucher is the resolver for the CreateVoucher field.
func (r *mutationResolver) CreateVoucher(ctx context.Context, input model.NewVoucher) (*model.Voucher, error) {
	voucher := &model.Voucher{
		ID:              uuid.NewString(),
		VoucherName:     input.VoucherName,
		VoucherDecPrice: input.VoucherDecPrice,
	}

	r.DB.Create(voucher)
	return voucher, nil
}

// CreateShop is the resolver for the CreateShop field.
func (r *mutationResolver) CreateShop(ctx context.Context, input model.NewShop) (*model.Shop, error) {
	db := database.GetDB()
	var shop model.Shop
	err := db.Model(&shop).Where("shop_email like ?", input.ShopEmail).Take(&shop).Error
	fmt.Println(err)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			shop := &model.Shop{
				ID:           uuid.NewString(),
				ShopName:     input.ShopName,
				ShopEmail:    input.ShopEmail,
				ShopPassword: input.ShopPassword,
				Banned:       "unban",
			}
			r.DB.Create(shop)
			msg := gomail.NewMessage()
			msg.SetHeader("From", "eggbluejackse@gmail.com")
			msg.SetHeader("To", shop.ShopEmail)
			msg.SetHeader("Subject", "Your Shop is Successfuly Created")
			msg.SetBody("text/html", "Congratz my TPA Score is more increase now")

			n := gomail.NewDialer("smtp.gmail.com", 587, "eggbluejackse@gmail.com", "hmcdatmmbhouqbxy")
			if err := n.DialAndSend(msg); err != nil {
				panic(err)
			}
			return shop, nil
		}
	}

	return nil, gqlerror.Errorf("Email is Alredy Exist!")
}

// CreateCategory is the resolver for the CreateCategory field.
func (r *mutationResolver) CreateCategory(ctx context.Context, categoryName string) (*model.Category, error) {
	var category *model.Category
	category = &model.Category{
		ID:           uuid.NewString(),
		CategoryName: categoryName,
	}
	r.DB.Create(category)
	return category, nil
}

// CreateProduct is the resolver for the CreateProduct field.
func (r *mutationResolver) CreateProduct(ctx context.Context, input model.NewProduct) (*model.Product, error) {
	var category1 *model.Category
	r.DB.Where("category_name like ?", input.ProductCategoryName).Take(&category1)
	product := &model.Product{
		ID:          uuid.NewString(),
		ProductName: input.ProductName,
		// ProductCategory: &model.Category{
		// 	ID:           category1.ID,
		// 	CategoryName: category1.CategoryName,
		// },
		ProductImage:       input.ProductImage,
		ProductDescription: input.ProductDescription,
		ProductPrice:       input.ProductPrice,
		ProductStock:       input.ProductStock,
		CategoryID:         category1.ID,
	}

	r.DB.Create(product)
	return product, nil
}

// CreateWishList is the resolver for the CreateWishList field.
func (r *mutationResolver) CreateWishList(ctx context.Context, name string, privacy string, userEmail string) (*model.WishList, error) {
	var user *model.User
	r.DB.Where("email like ?", userEmail).Take(&user)
	wishlist := &model.WishList{
		ID:      uuid.NewString(),
		Name:    name,
		Privacy: privacy,
		UserId:  user.ID,
		// User:    user,
	}
	r.DB.Create(wishlist)
	return wishlist, nil
}

// UpdateWishList is the resolver for the UpdateWishList field.
func (r *mutationResolver) UpdateWishList(ctx context.Context, id string, name string, privacy string) (*model.WishList, error) {
	var wishlist *model.WishList
	r.DB.Where("id like ?", id).Take(&wishlist).Updates(model.WishList{
		Name:    name,
		Privacy: privacy,
	})
	return wishlist, nil
}

// SearchUser is the resolver for the searchUser field.
func (r *mutationResolver) SearchUser(ctx context.Context) (*model.User, error) {
	db := database.GetDB()
	var uer model.User
	db.Model(uer).Find(&uer)
	return &uer, nil
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, email string, password string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	emailerr := db.Model(user).Where("email LIKE ?", email).Take(&user).Error
	if emailerr != nil {
		if emailerr == gorm.ErrRecordNotFound {
			return nil, gqlerror.Errorf("the email is not found!")
		}
	}
	if password == user.Password {
		return &user, nil
	}
	return nil, gqlerror.Errorf("invalid password!")
}

// UpdatePhone is the resolver for the updatePhone field.
func (r *mutationResolver) UpdatePhone(ctx context.Context, email string, phoneNumber string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	err := db.Model(&user).Where("email like ?", email).Updates(model.User{
		PhoneNumber: phoneNumber,
	}).Error
	return &user, err
}

// UpdatePassword is the resolver for the updatePassword field.
func (r *mutationResolver) UpdatePassword(ctx context.Context, email string, currentpassword string, newpassword string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	db.Model(&user).Where("email like ?", email).Take(&user)
	if user.Password != currentpassword {
		return nil, gqlerror.Errorf("invalid password!")
	}
	db.Model(&user).Where("email like ?", email).Updates(model.User{
		Password: newpassword,
	})
	return &user, nil
}

// ChangeBanned is the resolver for the changeBanned field.
func (r *mutationResolver) ChangeBanned(ctx context.Context, banned string, email string) (*model.User, error) {
	db := database.GetDB()
	var users model.User
	db.Model(&users).Where("email like ?", email).Take(&users).Updates(model.User{
		Banned: banned,
	})

	return &users, nil
}

// SendNewsLetter is the resolver for the sendNewsLetter field.
func (r *mutationResolver) SendNewsLetter(ctx context.Context, subject string, content string) ([]*model.User, error) {
	var users []*model.User
	r.DB.Find(&users)
	msg := gomail.NewMessage()
	// smtpServer := "smtp.gmail.com"
	// smtpPort := 587
	// email := "eggbluejackse@gmail.com"
	// password := "eggbluejackSE22"

	// // Set up the message.
	// to := []string{"josesusanto123@gmail.com"}
	// msg := []byte("To: josesusanto123@gmail.com\r\n" +
	// 	"Subject: Test email\r\n" +
	// 	"\r\n" +
	// 	"This is the email body.\r\n")

	// // Send the email.
	// auth := smtp.PlainAuth("", email, password, smtpServer)
	// err := smtp.SendMail(smtpServer+":"+string(smtpPort), auth, email, to, msg)
	// if err != nil {
	// 	fmt.Println(err)
	// }

	userslen := len(users)
	for i := 0; i < userslen; i++ {
		msg.SetHeader("From", "eggbluejackse@gmail.com")
		msg.SetHeader("To", users[i].Email)
		msg.SetHeader("Subject", subject)
		msg.SetBody("text/html", content)

		n := gomail.NewDialer("smtp.gmail.com", 587, "eggbluejackse@gmail.com", "hmcdatmmbhouqbxy")
		if err := n.DialAndSend(msg); err != nil {
			fmt.Println(err)
			panic(err)
		}
	}

	return nil, nil
}

// BannedShop is the resolver for the bannedShop field.
func (r *mutationResolver) BannedShop(ctx context.Context, banned string, email string) (*model.Shop, error) {
	db := database.GetDB()
	var shop model.Shop
	db.Model(&shop).Where("shop_email like ?", email).Take(&shop).Updates(model.Shop{
		Banned: banned,
	})

	return &shop, nil
}

// UpdateBanner is the resolver for the updateBanner field.
func (r *mutationResolver) UpdateBanner(ctx context.Context, banner string, id string) (*model.Shop, error) {
	var shop *model.Shop
	r.DB.Where("id like ?", id).Take(&shop).Updates(model.Shop{
		Banner: banner,
	})
	return shop, nil
}

// ProductCategory is the resolver for the ProductCategory field.
func (r *productResolver) ProductCategory(ctx context.Context, obj *model.Product) (*model.Category, error) {
	var category *model.Category
	return category, r.DB.Where(&model.Category{ID: obj.CategoryID}).Limit(1).Find(&category).Error
}

// WishListDetail is the resolver for the WishListDetail field.
func (r *productResolver) WishListDetail(ctx context.Context, obj *model.Product) ([]*model.WishListDetail, error) {
	panic(fmt.Errorf("not implemented: WishListDetail - WishListDetail"))
}

// Shop is the resolver for the Shop field.
func (r *productResolver) Shop(ctx context.Context, obj *model.Product) (*model.Shop, error) {
	var shop *model.Shop
	return shop, r.DB.Where("id like ?", obj.ShopId).Take(&shop).Error
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	var users []*model.User
	err := r.DB.Find(&users).Error
	return users, err
}

// Product is the resolver for the Product field.
func (r *queryResolver) Product(ctx context.Context) ([]*model.Product, error) {
	var product []*model.Product
	r.DB.Find(&product)
	return product, nil
}

// Category is the resolver for the Category field.
func (r *queryResolver) Category(ctx context.Context) ([]*model.Category, error) {
	var cat []*model.Category
	r.DB.Find(&cat)
	return cat, nil
}

// WishList is the resolver for the WishList field.
func (r *queryResolver) WishList(ctx context.Context, id string) ([]*model.WishList, error) {
	var WishList []*model.WishList
	r.DB.Where("user_id like ?", id).Find(&WishList)
	return WishList, nil
}

// Shop is the resolver for the Shop field.
func (r *queryResolver) Shop(ctx context.Context, id string) (*model.Shop, error) {
	panic(fmt.Errorf("not implemented: Shop - Shop"))
}

// Login is the resolver for the Login field.
func (r *queryResolver) Login(ctx context.Context, email string, password string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	emailerr := db.Model(user).Where("email LIKE ?", email).Take(&user).Error
	if emailerr != nil {
		if emailerr == gorm.ErrRecordNotFound {
			return nil, gqlerror.Errorf("the email is not found!")
		}
	}
	if password == user.Password {
		return &user, nil
	}
	return nil, gqlerror.Errorf("invalid password!")

	// var user *model.User
	// r.DB.Where("email = ?", email).Where("password = ?", password).First(&user)
	// return user, r.DB.Error
}

// GetUser is the resolver for the GetUser field.
func (r *queryResolver) GetUser(ctx context.Context, id string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	db.Model(user).Where("ID LIKE ?", id).Take(&user)
	return &user, nil
}

// GetShop is the resolver for the GetShop field.
func (r *queryResolver) GetShop(ctx context.Context) ([]*model.Shop, error) {
	var shop []*model.Shop
	r.DB.Find(&shop)
	return shop, nil
}

// GetProduct is the resolver for the GetProduct field.
func (r *queryResolver) GetProduct(ctx context.Context, page int) ([]*model.Product, error) {
	allpage := 20
	startindex := (page - 1) * allpage
	endindex := startindex + allpage

	var product []*model.Product
	r.DB.Find(&product)
	if endindex > len(product) && startindex < len(product) {
		endindex = len(product)
	}

	if startindex > len(product) {
		return nil, gqlerror.Errorf("data is already empty!")
	}
	product = product[startindex:endindex]

	return product, nil
}

// ProductDetail is the resolver for the ProductDetail field.
func (r *queryResolver) ProductDetail(ctx context.Context, id string) (*model.Product, error) {
	var pd *model.Product
	r.DB.Where("id like ?", id).Take(&pd)
	return pd, nil
}

// Followed is the resolver for the Followed field.
func (r *userResolver) Followed(ctx context.Context, obj *model.User) ([]*model.Followed, error) {
	var Followed []*model.Followed
	return Followed, r.DB.Where("shop_id like ?", obj.ID).Find(&Followed).Error
}

// User is the resolver for the User field.
func (r *wishListResolver) User(ctx context.Context, obj *model.WishList) (*model.User, error) {
	var user *model.User
	return user, r.DB.Where(&model.User{ID: obj.UserId}).Limit(1).Find(&user).Error
}

// WishListDetails is the resolver for the WishListDetails field.
func (r *wishListResolver) WishListDetails(ctx context.Context, obj *model.WishList) ([]*model.WishListDetail, error) {
	var details []*model.WishListDetail

	return details, r.DB.Where("wish_list_id = ?", obj.ID).Find(&details).Error
}

// Followed is the resolver for the Followed field.
func (r *wishListResolver) Followed(ctx context.Context, obj *model.WishList) ([]*model.Followed, error) {
	panic(fmt.Errorf("not implemented: Followed - Followed"))
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Product returns ProductResolver implementation.
func (r *Resolver) Product() ProductResolver { return &productResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

// User returns UserResolver implementation.
func (r *Resolver) User() UserResolver { return &userResolver{r} }

// WishList returns WishListResolver implementation.
func (r *Resolver) WishList() WishListResolver { return &wishListResolver{r} }

type mutationResolver struct{ *Resolver }
type productResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
type wishListResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//   - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//     it when you're done.
//   - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *wishListResolver) WishListDetail(ctx context.Context, obj *model.WishList) ([]*model.WishListDetail, error) {
	var wishlistdetails []*model.WishListDetail
	return wishlistdetails, r.DB.Where("wish_list_id = ?", obj.ID).Find(&wishlistdetails).Error
}