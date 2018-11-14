package sqlcommon

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type User struct {
	gorm.Model
	Uid        int
	Username   string
	Password   string
	Createtime int
}

type Review struct {
	gorm.Model
	Rid        int
	Nid        int
	Uid        int
	Content    string
	Createtime int
}

type News struct {
	gorm.Model
	Nid        int
	Title      string
	Abstract   string
	Createtime int
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
}
