package main

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"

	"gohub-trending/common"
	"gohub-trending/dbcommon"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func ReverseProxy(target string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		proxy := httputil.ReverseProxy{
			Director: func(req *http.Request) {
				req.URL.Scheme = "http"
				req.URL.Host = target
				req.Host = target
			},
		}
		proxy.ServeHTTP(ctx.Writer, ctx.Request)
	}
}

func main() {
	err := dbcommon.CreateTables()
	if err != nil {
		log.Fatal("database connect error:", err.Error())
		return
	}
	log.Println("[INFO] database initial succeeded")
	router := gin.New()

	if common.GlobalConfig.Backend.CorsAllow {
		// new cors middleware
		config := cors.DefaultConfig()
		config.AllowAllOrigins = true
		config.ExposeHeaders = []string{"x-user-token"}
		config.AllowHeaders = []string{"x-user-token"}
		router.Use(common.IstioHeadersForward(), gin.Recovery(), gin.Logger(), cors.New(config))
	} else {
		router.Use(common.IstioHeadersForward(), gin.Recovery(), gin.Logger())
	}

	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"error": 1, "msg": "404 page not found"})
	})

	// 使用静态文件放在根目录
	router.Use(static.Serve("/", static.LocalFile("./frontend-svc/dist", true)))

	router.Any("/users/*subpath", ReverseProxy(fmt.Sprintf("%v:%v", common.GlobalConfig.Users.Host, common.GlobalConfig.Users.Port)))
	router.Any("/gitrepos/*subpath", ReverseProxy(fmt.Sprintf("%v:%v", common.GlobalConfig.GitRepos.Host, common.GlobalConfig.GitRepos.Port)))
	router.Any("/reviews/*subpath", ReverseProxy(fmt.Sprintf("%v:%v", common.GlobalConfig.Reviews.Host, common.GlobalConfig.Reviews.Port)))

	router.Run(":3000")
}
