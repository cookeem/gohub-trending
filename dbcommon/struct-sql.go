package dbcommon

import (
	"fmt"
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
}

type Review struct {
	Rid       int    `gorm:"PRIMARY_KEY;AUTO_INCREMENT;"`
	Nid       int    `gorm:"not null;default:0"`
	Uid       int    `gorm:"not null;default:0"`
	Content   string `gorm:"type:varchar(200);not null;default:''"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type GithubTrending struct {
	Gid             int    `gorm:"PRIMARY_KEY;AUTO_INCREMENT;"`
	FullName        string `gorm:"type:varchar(100);PRIMARY_KEY;not null;default:''"`
	Description     string `gorm:"type:varchar(200);not null;default:''"`
	Language        string `gorm:"type:varchar(20);not null;default:''"`
	HtmlUrl         string `gorm:"type:varchar(200);not null;default:''"`
	StargazersCount int    `gorm:"not null;default:0"`
	WatchersCount   int    `gorm:"not null;default:0"`
	ForksCount      int    `gorm:"not null;default:0"`
	OpenIssuesCount int    `gorm:"not null;default:0"`
	CreatedAt       time.Time
	UpdatedAt       time.Time
	PushedAt        time.Time
}

const connectStr = "gituser:gitpassword@/github?charset=utf8mb4&parseTime=true"

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
	if !db.HasTable(&GithubTrending{}) {
		db.AutoMigrate(&GithubTrending{})
	}

	user1 := User{
		Username: "haijian",
		Password: "mypassword",
	}
	user2 := User{
		Username: "cookeem",
		Password: "mypassword",
	}

	// Create
	if db.Where(&User{Username: user1.Username}).RecordNotFound() {
		db.Create(&user1)
	}
	if db.Where(&User{Username: user2.Username}).RecordNotFound() {
		db.Create(&user2)
	}

	// find all
	var users []User
	db.Find(&users)
	for index, user := range users {
		fmt.Printf("%+v -> %+v\n", index, user)
	}

	// Read
	// db.Where(&User{Username: user2.Username}).First(&user)
	// fmt.Println(user)

	// Update - update user's price to 2000
	// db.Model(&user).Update("password", "hehe")

	// Delete - delete user
	// db.Delete(&user)
}
