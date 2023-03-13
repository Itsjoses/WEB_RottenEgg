package database

import "github.com/Itsjose.s/gqlgen-todos/graph/model"

func MigrateSeed() {
	db := GetDB()
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.Voucher{})
	db.AutoMigrate(&model.Shop{})
	db.AutoMigrate(&model.Category{})
	db.AutoMigrate(&model.Product{})
	db.AutoMigrate(&model.WishList{})
	db.AutoMigrate(&model.WishListDetail{})
	db.AutoMigrate(&model.Followed{})
	db.AutoMigrate(&model.Review{})
	db.AutoMigrate(&model.Cart{})
	db.AutoMigrate(&model.ReviewQueue{})
	db.AutoMigrate(&model.TransactionHeader{})
	db.AutoMigrate(&model.TransactionDetail{})
	db.AutoMigrate(&model.Address{})
	db.AutoMigrate(&model.BuildListDetail{})
	db.AutoMigrate(&model.BuildList{})
}
