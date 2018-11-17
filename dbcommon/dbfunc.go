package dbcommon

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

const connectStr = "gituser:gitpassword@/github?charset=utf8mb4&parseTime=true"

func CreateTables() (err error) {
	db, err := gorm.Open("mysql", connectStr)
	if err != nil {
		return err
	}
	defer db.Close()

	if !db.HasTable(&User{}) {
		db.AutoMigrate(&User{})
	}
	if !db.HasTable(&Review{}) {
		db.AutoMigrate(&Review{})
	}
	if !db.HasTable(&GitRepo{}) {
		db.AutoMigrate(&GitRepo{})
	}
	if !db.HasTable(&GitLanguage{}) {
		db.AutoMigrate(&GitLanguage{})
	}
	return err
}

func CreateUser(username string, password string) (uid int, errmsg string) {
	db, err := gorm.Open("mysql", connectStr)
	if err != nil {
		errmsg = "database connect error"
		return uid, errmsg
	}
	defer db.Close()

	user := User{Username: username, Password: password}
	if db.Where(&User{Username: username}).First(&user).RecordNotFound() {
		if err = db.Create(&user).Error; err != nil {
			errmsg = err.Error()
			return uid, errmsg
		}
		uid = user.Uid
	} else {
		errmsg = "username already exist"
	}
	return uid, errmsg
}

func LoginUser(username string, password string) (uid int, errmsg string) {
	db, err := gorm.Open("mysql", connectStr)
	if err != nil {
		errmsg = "database connect error"
		return uid, errmsg
	}
	defer db.Close()

	var user User
	if db.Where(&User{Username: username}).First(&user).RecordNotFound() {
		errmsg = "user not exists"
		return uid, errmsg
	} else {
		if user.Password != password {
			errmsg = "password incorrect"
			return uid, errmsg
		} else {
			uid = user.Uid
		}
	}
	return uid, errmsg
}

func GetUser(uid int) (user User, errmsg string) {
	db, err := gorm.Open("mysql", connectStr)
	if err != nil {
		errmsg = "database connect error"
		return user, errmsg
	}
	defer db.Close()

	if db.Where(&User{Uid: uid}).First(&user).RecordNotFound() {
		errmsg = "user not exists"
		return user, errmsg
	}
	return user, errmsg
}

func UpdateUser(uid int, password string) (errmsg string) {
	db, err := gorm.Open("mysql", connectStr)
	if err != nil {
		errmsg = "database connect error"
		return errmsg
	}
	defer db.Close()

	var user User
	if db.Where(&User{Uid: uid}).First(&user).RecordNotFound() {
		errmsg = "user not exists"
		return errmsg
	} else {
		db.Model(&user).Update(User{Password: password})
	}
	return errmsg
}

func SearchGitRepos(grs []GitRepo) (gitrepos []GitRepo, languages []GitLanguage, errmsg string) {
	db, err := gorm.Open("mysql", connectStr)
	if err != nil {
		errmsg = "database connect error"
		return gitrepos, languages, errmsg
	}
	defer db.Close()

	if err = db.Find(&languages).Order("repos_count desc").Error; err != nil {
		errmsg = "get languages error"
		return gitrepos, languages, errmsg
	}

	for _, gr := range grs {
		db.Where(GitRepo{FullName: gr.FullName}).Assign(gr).FirstOrCreate(&gr)
		gitrepos = append(gitrepos, gr)
	}
	return gitrepos, languages, errmsg
}
