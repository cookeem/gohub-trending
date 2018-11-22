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
	router := gin.New()
	router.Use(common.IstioHeaderPass(), gin.Recovery(), gin.Logger())

	router.Any("/users/*subpath", ReverseProxy(fmt.Sprintf("%v:%v", common.GlobalConfig.Users.Host, common.GlobalConfig.Users.Port)))
	router.Any("/gitrepos/*subpath", ReverseProxy(fmt.Sprintf("%v:%v", common.GlobalConfig.GitRepos.Host, common.GlobalConfig.GitRepos.Port)))
	router.Any("/reviews/*subpath", ReverseProxy(fmt.Sprintf("%v:%v", common.GlobalConfig.Reviews.Host, common.GlobalConfig.Reviews.Port)))
	router.StaticFS("/frontend", http.Dir("frontend-svc"))

	router.Run(":3000")
}
