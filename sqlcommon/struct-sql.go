package sqlcommon

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type User struct {
	gorm.Model
	Username string
	Password string
}

type Review struct {
	gorm.Model
	Nid     int
	Uid     int
	Content string
}

type News struct {
	gorm.Model
	Nid      int
	Title    string
	Abstract string
}

const connectStr = "hluser:hlpasswd@/headline?charset=utf8"

func CreateTables() {
	db, err := gorm.Open("mysql", connectStr)
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	db.AutoMigrate(&User{})
	db.AutoMigrate(&Review{})
	db.AutoMigrate(&News{})

	// Create
	db.Create(&User{Username: "cookeem", Password: "haha"})

	// Read
	var user User
	db.First(&user, 1)                         // find user with id 1
	db.First(&user, "username = ?", "cookeem") // find user with username cookeem

	// Update - update user's price to 2000
	// db.Model(&user).Update("password", "hehe")

	// Delete - delete user
	// db.Delete(&user)
}
