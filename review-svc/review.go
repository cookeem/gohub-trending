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

	userToken := c.Request.Header.Get("x-user-token")
	httpStatus := http.StatusForbidden

	ut := common.VerifyTokenString(userToken, common.GlobalConfig.Jwt.Secret)
	if ut.Uid == 0 {
		errorRet = 2
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
		userToken, _ = common.CreateTokenString(ut.Username, ut.Uid, common.GlobalConfig.Jwt.Secret, common.GlobalConfig.Jwt.Expires)
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

	userToken := c.Request.Header.Get("x-user-token")
	httpStatus := http.StatusForbidden

	ut := common.VerifyTokenString(userToken, common.GlobalConfig.Jwt.Secret)
	if ut.Uid == 0 {
		errorRet = 2
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
		userToken, _ = common.CreateTokenString(ut.Username, ut.Uid, common.GlobalConfig.Jwt.Secret, common.GlobalConfig.Jwt.Expires)
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
	reviews := make([]map[string]interface{}, 0)
	reviewsObj := make([]dbcommon.ReviewOutput, 0)

	userToken := c.Request.Header.Get("x-user-token")
	httpStatus := http.StatusForbidden

	ut := common.VerifyTokenString(userToken, common.GlobalConfig.Jwt.Secret)
	if ut.Uid == 0 {
		errorRet = 2
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
		if len(reviewsObj) == 0 {
			msg = "no more reviews"
		} else {
			msg = "list reviews succeed"
		}
		errorRet = 0
		for _, reviewOutput := range reviewsObj {
			r := make(map[string]interface{})
			r["rid"] = reviewOutput.Review.Rid
			r["gid"] = reviewOutput.Review.Gid
			r["uid"] = reviewOutput.Review.Uid
			r["username"] = reviewOutput.User.Username
			r["content"] = reviewOutput.Review.Content
			r["created_at"] = reviewOutput.Review.CreatedAt
			reviews = append(reviews, r)
		}
		httpStatus = http.StatusOK
		userToken, _ = common.CreateTokenString(ut.Username, ut.Uid, common.GlobalConfig.Jwt.Secret, common.GlobalConfig.Jwt.Expires)
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
	router.Use(common.IstioHeadersForward(), gin.Recovery(), gin.Logger())

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
