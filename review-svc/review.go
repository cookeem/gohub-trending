package main

import (
	"fmt"
	"net/http"
	"strconv"

	"gohub-trending/common"
	"gohub-trending/dbcommon"

	"github.com/gin-gonic/gin"
)

func createReview(c *gin.Context) {
	gidStr := c.DefaultPostForm("gid", "")
	content := c.DefaultPostForm("content", "")

	errmsg := ""
	errorRet := 1
	msg := ""
	rid := 0
	user := dbcommon.User{}

	userToken := c.Request.Header.Get("x-user-token")
	httpStatus := http.StatusForbidden

	ut := common.VerifyTokenString(userToken, common.GlobalConfig.Jwt.Secret)
	if ut.Uid == 0 {
		errmsg = "user not login yet"
	} else {
		if len(content) == 0 {
			errmsg = "please input review content"
		} else {
			gid, err := strconv.Atoi(gidStr)
			if err != nil {
				errmsg = "gitrepo id incorrect"
			} else {
				rid, errmsg = dbcommon.CreateReview(ut.Uid, gid, content)
			}
		}
	}

	if errmsg == "" {
		msg = "new review succeed"
		errorRet = 0
		httpStatus = http.StatusOK
		userToken, _ = common.CreateTokenString(user.Username, user.Uid, common.GlobalConfig.Jwt.Secret, 15*60)
	} else {
		msg = errmsg
		userToken = ""
	}
	data := map[string]interface{}{
		"error": errorRet,
		"msg":   msg,
		"rid":   rid,
	}
	c.Header("x-user-token", userToken)
	c.JSON(httpStatus, data)
}

func deleteReview(c *gin.Context) {
	ridStr := c.DefaultPostForm("rid", "")

	errmsg := ""
	errorRet := 1
	msg := ""
	user := dbcommon.User{}

	userToken := c.Request.Header.Get("x-user-token")
	httpStatus := http.StatusForbidden

	ut := common.VerifyTokenString(userToken, common.GlobalConfig.Jwt.Secret)
	if ut.Uid == 0 {
		errmsg = "user not login yet"
	} else {
		rid, err := strconv.Atoi(ridStr)
		if err != nil {
			errmsg = "review id incorrect"
		} else {
			errmsg = dbcommon.DeleteReview(ut.Uid, rid)
		}
	}

	if errmsg == "" {
		msg = "delete review succeed"
		errorRet = 0
		httpStatus = http.StatusOK
		userToken, _ = common.CreateTokenString(user.Username, user.Uid, common.GlobalConfig.Jwt.Secret, 15*60)
	} else {
		msg = errmsg
		userToken = ""
	}
	data := map[string]interface{}{
		"error": errorRet,
		"msg":   msg,
	}
	c.Header("x-user-token", userToken)
	c.JSON(httpStatus, data)
}

func listReviews(c *gin.Context) {
	gidStr := c.Params.ByName("gid")

	errmsg := ""
	errorRet := 1
	msg := ""
	user := dbcommon.User{}
	reviews := make([]map[string]interface{}, 0)
	var reviewsObj map[dbcommon.Review]dbcommon.User

	userToken := c.Request.Header.Get("x-user-token")
	httpStatus := http.StatusForbidden

	ut := common.VerifyTokenString(userToken, common.GlobalConfig.Jwt.Secret)
	if ut.Uid == 0 {
		errmsg = "user not login yet"
	} else {
		gid, err := strconv.Atoi(gidStr)
		if err != nil {
			errmsg = "gitrepo id incorrect"
		} else {
			reviewsObj, errmsg = dbcommon.ListReviews(gid)
		}
	}

	if errmsg == "" {
		msg = "list reviews succeed"
		errorRet = 0
		for review, user := range reviewsObj {
			r := make(map[string]interface{})
			r["rid"] = review.Rid
			r["gid"] = review.Gid
			r["uid"] = review.Uid
			r["username"] = user.Username
			r["content"] = review.Content
			r["created_at"] = review.CreatedAt
			reviews = append(reviews, r)
		}
		httpStatus = http.StatusOK
		userToken, _ = common.CreateTokenString(user.Username, user.Uid, common.GlobalConfig.Jwt.Secret, 15*60)
	} else {
		msg = errmsg
		userToken = ""
	}
	data := map[string]interface{}{
		"error":   errorRet,
		"msg":     msg,
		"reviews": reviews,
	}
	c.Header("x-user-token", userToken)
	c.JSON(httpStatus, data)
}

func main() {
	router := gin.New()
	router.Use(common.IstioHeaderPass(), gin.Recovery(), gin.Logger())

	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"error": 1, "msg": "404 page not found"})
	})

	routerReviews := router.Group("/reviews")
	{
		routerReviews.POST("/", createReview)
		routerReviews.DELETE("/", deleteReview)
		routerReviews.GET("/:gid", listReviews)
	}
	router.Run(fmt.Sprintf(":%v", common.GlobalConfig.Reviews.Port))
}
