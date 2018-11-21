package main

import (
	"fmt"
	"gohub-trending/common"
	"gohub-trending/dbcommon"

	"github.com/gin-gonic/gin"
)

func main() {
	dbcommon.CreateTables()
	router := gin.Default()
	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"error": 1, "msg": "404 page not found"})
	})

	// routerUsers := router.Group("/users")
	// {
	// 	routerUsers.POST("/", createUser)
	// 	routerUsers.POST("/login/", loginUser)
	// 	routerUsers.POST("/logout/", logoutUser)
	// 	routerUsers.GET("/", getUser)
	// 	routerUsers.PUT("/", updateUser)
	// }
	router.Run(fmt.Sprintf(":%v", common.GlobalConfig.Backend.Port))
}
