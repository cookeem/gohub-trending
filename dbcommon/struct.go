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
	Gid       int    `gorm:"not null;default:0"`
	Uid       int    `gorm:"not null;default:0"`
	Content   string `gorm:"type:varchar(500);not null;default:''"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Adapt struct {
	Aid       int `gorm:"PRIMARY_KEY;AUTO_INCREMENT;"`
	Gid       int `gorm:"not null;default:0"`
	Uid       int `gorm:"not null;default:0"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Follow struct {
	Fid       int `gorm:"PRIMARY_KEY;AUTO_INCREMENT;"`
	Gid       int `gorm:"not null;default:0"`
	Uid       int `gorm:"not null;default:0"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type ReviewOutput struct {
	Review Review
	User   User
}

type GitRepo struct {
	Gid             int       `gorm:"PRIMARY_KEY;AUTO_INCREMENT;" json:"gid"`
	FullName        string    `gorm:"type:varchar(100);PRIMARY_KEY;unique_index;not null;default:''" json:"full_name"`
	Description     string    `gorm:"type:varchar(500);not null;default:''" json:"description"`
	Language        string    `gorm:"type:varchar(50);not null;default:''" json:"language"`
	HtmlUrl         string    `gorm:"type:varchar(200);not null;default:''" json:"html_url"`
	StargazersCount int       `gorm:"not null;default:0" json:"stargazers_count"`
	WatchersCount   int       `gorm:"not null;default:0" json:"watchers_count"`
	ForksCount      int       `gorm:"not null;default:0" json:"forks_count"`
	OpenIssuesCount int       `gorm:"not null;default:0" json:"open_issues_count"`
	ReviewsCount    int       `gorm:"not null;default:0" json:"reviews_count"`
	AdaptsCount     int       `gorm:"not null;default:0" json:"adapts_count"`
	FollowsCount    int       `gorm:"not null;default:0" json:"follows_count"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
	PushedAt        time.Time `json:"pushed_at"`
}

type GitLanguage struct {
	Language   string `gorm:"type:varchar(50);PRIMARY_KEY;unique_index;not null;default:''" json:"language"`
	ReposCount int    `gorm:"not null;default:0" json:"repos_count"`
	TestCount  int    `gorm:"not null;default:0"`
}
