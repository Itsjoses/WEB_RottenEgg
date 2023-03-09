package database

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func GetDB() *gorm.DB {

	if db == nil {
		dsn := "host=localhost user=postgres password=SLC22-2 dbname=TPA_Web_100 port=5432 sslmode=disable TimeZone=Asia/Shanghai"
		tempdb, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			panic(err)
		}
		db = tempdb
	}

	return db
}

// func CreateSchema(db *pg.DB) error {
// 	fmt.Println("asd")
// 	models := []interface{}{
// 		(*model.Genre)(nil),
// 	}

// 	for _, model := range models {
// 		err := db.Model(model).CreateTable(&orm.CreateTableOptions{
// 			IfNotExists: true,
// 		})
// 		if err != nil {
// 			return err
// 		}
// 	}
// 	return nil
// }

// func GetDB() *pg.DB {
// 	data := &pg.Options{
// 		Addr:     ":5432",
// 		User:     "postgres",
// 		Password: "SLC22-2",
// 		Database: "TPA_WEB",
// 	}

// 	var db *pg.DB = pg.Connect(data)
// 	if db == nil {
// 		fmt.Printf("Database connect. \n")
// 	}

// 	fmt.Printf("Connect. \n")
// 	if err := CreateSchema(db); err != nil {
// 		fmt.Println(err)
// 	}

// 	return db
// }
