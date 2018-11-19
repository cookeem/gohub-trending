package main

import (
	"gohub-trending/common"
	"gohub-trending/dbcommon"
	"net/http"

	"github.com/gin-gonic/gin"
)

func createUser(c *gin.Context) {
	username := c.DefaultPostForm("username", "")
	password := c.DefaultPostForm("password", "")
	passwordRepeat := c.DefaultPostForm("password_repeat", "")

	errmsg := ""
	errorRet := 1
	msg := ""
	uid := 0

	userToken := ""
	httpStatus := http.StatusForbidden

	if len(username) == 0 {
		errmsg = "please input username"
	} else if len(username) > 12 {
		errmsg = "username too long"
	} else if len(password) == 0 {
		errmsg = "please input password"
	} else if len(password) < 6 || len(password) > 20 {
		errmsg = "password should greater then 6 and less then 20 characters"
	} else if password != passwordRepeat {
		errmsg = "repeact password should be the same as password"
	} else {
		password = common.GetSHA(password)
		uid, errmsg = dbcommon.CreateUser(username, password)
	}
	if errmsg == "" {
		userToken, _ = common.CreateTokenString(username, uid, common.SecretStr, 15*60)
		msg = "create user succeed"
		errorRet = 0
		httpStatus = http.StatusOK
	} else {
		msg = errmsg
	}
	data := map[string]interface{}{
		"error": errorRet,
		"msg":   msg,
		"uid":   uid,
	}
	c.Header("x-user-token", userToken)
	c.JSON(httpStatus, data)
}

func loginUser(c *gin.Context) {
	c.String(http.StatusOK, "Login")
}

func logoutUser(c *gin.Context) {
	c.String(http.StatusOK, "Logout")
}

func getUser(c *gin.Context) {
	c.String(http.StatusOK, "Get")
}

func updateUser(c *gin.Context) {
	c.String(http.StatusOK, "Update")
}

func main() {
	// tokenStr, _ := common.CreateTokenString("cookeem", 1, common.SecretStr, 5)
	// log.Println(tokenStr)
	// time.Sleep(time.Second * 1)
	// claims, err := common.VerifyTokenString(tokenStr, common.SecretStr)
	// log.Println("[DEBUG]", claims.Uid, claims.Username, claims.ExpiresAt, claims.Issuer, err)

	router := gin.Default()
	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"error": 1, "msg": "404 page not found"})
	})

	routerUsers := router.Group("/users")
	{
		routerUsers.POST("/", createUser)
		routerUsers.POST("/login/", loginUser)
		routerUsers.POST("/logout/", logoutUser)
		routerUsers.GET("/", getUser)
		routerUsers.PUT("/", updateUser)
	}

	router.Run(":8080")
}
