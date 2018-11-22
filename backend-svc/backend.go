package main

import (
	"fmt"
	"net/http"
	"net/http/httputil"

	"gohub-trending/common"

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
	router := gin.Default()
	routerUser := router.Group("users")
	{
		target := fmt.Sprintf("%v:%v", common.GlobalConfig.Users.Host, common.GlobalConfig.Users.Port)
		routerUser.Any("/*subpath", ReverseProxy(target))
	}
	routerGitRepo := router.Group("gitrepos")
	{
		target := fmt.Sprintf("%v:%v", common.GlobalConfig.GitRepos.Host, common.GlobalConfig.GitRepos.Port)
		routerGitRepo.Any("/*subpath", ReverseProxy(target))
	}
	routerReview := router.Group("reviews")
	{
		target := fmt.Sprintf("%v:%v", common.GlobalConfig.Reviews.Host, common.GlobalConfig.Reviews.Port)
		routerReview.Any("/*subpath", ReverseProxy(target))
	}
	routerFrontend := router.Group("/frontend")
	{
		routerFrontend.StaticFS("/", http.Dir("frontend-svc"))
	}
	router.Run(":3000")
}
