package dbcommon

import (
	"time"

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
	FullName        string `gorm:"type:varchar(100);PRIMARY_KEY;unique_index;not null;default:''"`
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
