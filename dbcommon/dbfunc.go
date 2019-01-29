package dbcommon

import (
	"gohub-trending/common"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func CreateTables() (err error) {
	db, err := gorm.Open("mysql", common.ConnStr)
	if err != nil {
		return err
	}
	defer db.Close()

	// 升级数据库结构，支持增加字段
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Review{})
	db.AutoMigrate(&Adapt{})
	db.AutoMigrate(&Follow{})
	db.AutoMigrate(&GitRepo{})
	db.AutoMigrate(&GitLanguage{})

	return err
}

func CreateUser(username string, password string) (uid int, errmsg string) {
	db, err := gorm.Open("mysql", common.ConnStr)
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
		errmsg = "username already exists"
	}
	return uid, errmsg
}

func LoginUser(username string, password string) (uid int, errmsg string) {
	db, err := gorm.Open("mysql", common.ConnStr)
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
	db, err := gorm.Open("mysql", common.ConnStr)
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

func UpdateUser(uid int, password string, passwordOld string) (errmsg string) {
	db, err := gorm.Open("mysql", common.ConnStr)
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
		if user.Password == passwordOld {
			db.Model(&user).Update(User{Password: password})
		} else {
			errmsg = "user old password incorrect"
		}
	}
	return errmsg
}

func CreateReview(uid int, gid int, content string) (rid int, errmsg string) {
	db, err := gorm.Open("mysql", common.ConnStr)
	if err != nil {
		errmsg = "database connect error"
		return rid, errmsg
	}
	defer db.Close()

	var gitrepo GitRepo
	if db.Where(&GitRepo{Gid: gid}).First(&gitrepo).RecordNotFound() {
		errmsg = "gitrepo not exists"
	} else {
		var user User
		if db.Where(&User{Uid: uid}).First(&user).RecordNotFound() {
			errmsg = "user not exists"
		} else {
			review := Review{Gid: gid, Uid: uid, Content: content}
			if err = db.Create(&review).Error; err != nil {
				errmsg = err.Error()
				return uid, errmsg
			}
			db.Model(&gitrepo).Update(GitRepo{ReviewsCount: gitrepo.ReviewsCount + 1})
			rid = review.Rid
		}
	}
	return rid, errmsg
}

func CreateAdapt(uid int, gid int) (aid int, errmsg string) {
	db, err := gorm.Open("mysql", common.ConnStr)
	if err != nil {
		errmsg = "database connect error"
		return aid, errmsg
	}
	defer db.Close()

	var gitrepo GitRepo
	if db.Where(&GitRepo{Gid: gid}).First(&gitrepo).RecordNotFound() {
		errmsg = "gitrepo not exists"
	} else {
		adapt := Adapt{Gid: gid, Uid: uid}
		if db.Where(&adapt).First(&adapt).RecordNotFound() == false {
			errmsg = "already adapted"
		} else {
			if err = db.Create(&adapt).Error; err != nil {
				errmsg = err.Error()
				return uid, errmsg
			} else {
				adaptsCount := 0
				db.Model(&Adapt{}).Where(&Adapt{Gid: gid}).Count(&adaptsCount)
				db.Model(&gitrepo).Update(GitRepo{AdaptsCount: adaptsCount})
			}
			aid = adapt.Aid
		}
	}
	return aid, errmsg
}

func CreateFollow(uid int, gid int) (fid int, errmsg string) {
	db, err := gorm.Open("mysql", common.ConnStr)
	if err != nil {
		errmsg = "database connect error"
		return fid, errmsg
	}
	defer db.Close()

	var gitrepo GitRepo
	if db.Where(&GitRepo{Gid: gid}).First(&gitrepo).RecordNotFound() {
		errmsg = "gitrepo not exists"
	} else {
		follow := Follow{Gid: gid, Uid: uid}
		if db.Where(&follow).First(&follow).RecordNotFound() == false {
			errmsg = "already followed"
		} else {
			if err = db.Create(&follow).Error; err != nil {
				errmsg = err.Error()
				return uid, errmsg
			} else {
				followsCount := 0
				db.Model(&Follow{}).Where(&Follow{Gid: gid}).Count(&followsCount)
				db.Model(&gitrepo).Update(GitRepo{FollowsCount: followsCount})
			}
			fid = follow.Fid
		}
	}
	return fid, errmsg
}

func DeleteReview(uid int, rid int) (errmsg string) {
	db, err := gorm.Open("mysql", common.ConnStr)
	if err != nil {
		errmsg = "database connect error"
		return errmsg
	}
	defer db.Close()

	var r Review
	if db.Where(&Review{Rid: rid}).First(&r).RecordNotFound() {
		errmsg = "review not exists"
	} else {
		var gitrepo GitRepo
		if db.Where(&GitRepo{Gid: r.Gid}).First(&gitrepo).RecordNotFound() {
			errmsg = "gitrepo not exists"
		} else {
			if r.Uid != uid {
				errmsg = "not privilege to delete this review"
			} else if err = db.Delete(&r).Error; err != nil {
				errmsg = "review delete error"
			} else {
				db.Model(&gitrepo).Update(GitRepo{ReviewsCount: gitrepo.ReviewsCount - 1})
			}
		}
	}
	return errmsg
}

func ListReviews(gid int) (reviews []ReviewOutput, errmsg string) {
	reviews = make([]ReviewOutput, 0)
	db, err := gorm.Open("mysql", common.ConnStr)
	if err != nil {
		errmsg = "database connect error"
		return reviews, errmsg
	}
	defer db.Close()

	var rs []Review
	if err := db.Where(&Review{Gid: gid}).Order("rid desc").Find(&rs).Error; err != nil {
		errmsg = "select rs error"
		return reviews, errmsg
	} else {
		for _, r := range rs {
			var u User
			db.Where(&User{Uid: r.Uid}).First(&u)
			reviewOutput := ReviewOutput{}
			reviewOutput.Review = r
			reviewOutput.User = u
			reviews = append(reviews, reviewOutput)
		}
	}
	return reviews, errmsg
}

func ListGitRepos(language string, page int, perPage int) (gitrepos []GitRepo, languages []GitLanguage, errmsg string) {
	gitrepos = make([]GitRepo, 0)
	languages = make([]GitLanguage, 0)
	db, err := gorm.Open("mysql", common.ConnStr)
	if err != nil {
		errmsg = "database connect error"
		return gitrepos, languages, errmsg
	}
	defer db.Close()

	var grWhere GitRepo
	if language != "" {
		grWhere.Language = language
	}
	if err := db.Where(&grWhere).Order("stargazers_count DESC", true).Offset(perPage * (page - 1)).Limit(perPage).Find(&gitrepos).Error; err != nil {
		errmsg = "select gitrepos error"
		return gitrepos, languages, errmsg
	} else if err = db.Find(&languages).Order("repos_count desc").Error; err != nil {
		errmsg = "get languages error"
		return gitrepos, languages, errmsg
	}

	return gitrepos, languages, errmsg
}

func SearchGitRepos(grs []GitRepo) (gitrepos []GitRepo, languages []GitLanguage, errmsg string) {
	gitrepos = make([]GitRepo, 0)
	languages = make([]GitLanguage, 0)
	db, err := gorm.Open("mysql", common.ConnStr)
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
		if db.Where(GitRepo{FullName: gr.FullName}).First(&gr).RecordNotFound() {
			db.Create(&gr)
			gl := GitLanguage{Language: gr.Language}
			db.Where(GitLanguage{Language: gr.Language}).Assign(gr).FirstOrCreate(&gl)
			db.Model(&gl).Update(GitLanguage{ReposCount: gl.ReposCount + 1})
		}
		gitrepos = append(gitrepos, gr)
	}
	return gitrepos, languages, errmsg
}

func GetGitRepo(gid int, uid int) (gitrepo GitRepo, adapt int, follow int, errmsg string) {
	db, err := gorm.Open("mysql", common.ConnStr)
	if err != nil {
		errmsg = "database connect error"
		return gitrepo, adapt, follow, errmsg
	}
	defer db.Close()

	if db.Where(&GitRepo{Gid: gid}).First(&gitrepo).RecordNotFound() {
		errmsg = "gitrepo not exists"
	} else {
		if db.Where(&Adapt{Gid: gid, Uid: uid}).First(&Adapt{}).RecordNotFound() == false {
			adapt = 1
		}
		if db.Where(&Follow{Gid: gid, Uid: uid}).First(&Follow{}).RecordNotFound() == false {
			follow = 1
		}
	}
	return gitrepo, adapt, follow, errmsg
}
