package dbcommon

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

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

func BatchInsertGithub(gts []GithubTrending) {
	db, err := gorm.Open("mysql", connectStr)
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	for _, gt := range gts {
		db.Where(GithubTrending{FullName: gt.FullName}).Assign(gt).FirstOrCreate(&gt)
	}
}
