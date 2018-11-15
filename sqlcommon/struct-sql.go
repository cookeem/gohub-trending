package sqlcommon

import (
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type User struct {
	Uid       int    `gorm:"PRIMARY_KEY;AUTO_INCREMENT;"`
	Username  string `gorm:"type:varchar(12);unique_index;not null;default:''"`
	Password  string `gorm:"type:varchar(50);not null;default:''"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

type Review struct {
	Rid       int    `gorm:"PRIMARY_KEY;AUTO_INCREMENT;"`
	Nid       int    `gorm:"not null;default:0"`
	Uid       int    `gorm:"not null;default:0"`
	Content   string `gorm:"type:varchar(200);not null;default:''"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

type News struct {
	Nid       int    `gorm:"primary_key;not null;"`
	Title     string `gorm:"type:varchar(200);not null;default:''"`
	Abstract  string `gorm:"type:varchar(200);not null;default:''"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

const connectStr = "hluser:hlpasswd@/headline?charset=utf8"

func CreateTables() {
	db, err := gorm.Open("mysql", connectStr)
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	if !db.HasTable(&User{}) {
		db.AutoMigrate(&User{})
	}
	if !db.HasTable(&Review{}) {
		db.AutoMigrate(&Review{})
	}
	if !db.HasTable(&News{}) {
		db.AutoMigrate(&News{})
	}

	// Create
	db.Create(&User{Username: "haijian", Password: "mypassword"})

	// Read
	var user User
	db.First(&user, 1)                         // find user with id 1
	db.First(&user, "username = ?", "cookeem") // find user with username cookeem

	// Update - update user's price to 2000
	// db.Model(&user).Update("password", "hehe")

	// Delete - delete user
	// db.Delete(&user)
}
