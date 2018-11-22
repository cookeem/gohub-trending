package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
	"time"

	"gohub-trending/common"
	"gohub-trending/dbcommon"

	"github.com/gin-gonic/gin"
)

func queryContent(url string, headers map[string]string) (bytearr []byte, err error) {
	timeout := time.Duration(10 * time.Second)
	client := http.Client{
		Timeout: timeout,
	}
	req, _ := http.NewRequest("GET", url, nil)
	for k, v := range headers {
		req.Header.Set(k, v)
	}
	resp, err := client.Do(req)
	if err == nil {
		bytearr, err = ioutil.ReadAll(resp.Body)
		defer resp.Body.Close()
	}
	return bytearr, err
}

func createRequestURL(params map[string]string) string {
	if params["per_page"] == "" {
		params["per_page"] = "10"
	}
	if params["page"] == "" {
		params["page"] = "1"
	}
	if params["sort"] == "" {
		params["sort"] = "stars"
	}
	if params["order"] == "" {
		params["order"] = "desc"
	}
	var querys []string
	for k, v := range params {
		querys = append(querys, fmt.Sprintf("%v=%v", k, v))
	}
	queryString := strings.Join(querys, "&")
	url := fmt.Sprintf("https://api.github.com/search/repositories?%v", queryString)
	return url
}

func requestSearchGitRepos(topics string, perPage int, page int) (gitrepos []dbcommon.GitRepo, languages []dbcommon.GitLanguage, errmsg string) {
	var ts []string
	gitrepos = make([]dbcommon.GitRepo, 0)
	for _, s := range strings.Split(topics, " ") {
		s = strings.Trim(s, " ")
		if s != "" {
			ts = append(ts, "topic:"+s)
		}
	}
	q := strings.Join(ts, "+")
	if perPage <= 0 {
		perPage = 10
	}
	if page <= 0 {
		page = 1
	}
	mapQuerys := map[string]string{
		"per_page": strconv.Itoa(perPage),
		"page":     strconv.Itoa(page),
		"q":        q,
	}
	url := createRequestURL(mapQuerys)
	bodyBytes, err := queryContent(url, map[string]string{})
	if err != nil {
		errmsg = err.Error()
		return gitrepos, languages, errmsg
	}

	var m map[string]interface{}
	err = json.Unmarshal(bodyBytes, &m)
	if err != nil {
		errmsg = err.Error()
		return gitrepos, languages, errmsg
	}
	var grs []dbcommon.GitRepo

	items := m["items"].([]interface{})
	for _, v := range items {
		item := v.(map[string]interface{})
		timeformat := "2006-01-02T15:04:05Z"
		ct, err := time.Parse(timeformat, item["created_at"].(string))
		if err != nil {
			ct, _ = time.Parse("2006-01-02", "1970-01-01")
		}
		ut, err := time.Parse(timeformat, item["updated_at"].(string))
		if err != nil {
			ut, _ = time.Parse("2006-01-02", "1970-01-01")
		}
		pt, err := time.Parse(timeformat, item["pushed_at"].(string))
		if err != nil {
			pt, _ = time.Parse("2006-01-02", "1970-01-01")
		}
		if item["full_name"] == nil {
			item["full_name"] = ""
		}
		if item["description"] == nil {
			item["description"] = ""
		}
		if item["language"] == nil {
			item["language"] = ""
		}
		if item["html_url"] == nil {
			item["html_url"] = ""
		}
		if item["stargazers_count"] == nil {
			item["stargazers_count"] = 0
		}
		if item["watchers_count"] == nil {
			item["watchers_count"] = 0
		}
		if item["forks_count"] == nil {
			item["forks_count"] = 0
		}
		if item["open_issues_count"] == nil {
			item["open_issues_count"] = 0
		}
		gr := dbcommon.GitRepo{
			FullName:        item["full_name"].(string),
			Description:     item["description"].(string),
			Language:        item["language"].(string),
			HtmlUrl:         item["html_url"].(string),
			StargazersCount: int(item["stargazers_count"].(float64)),
			WatchersCount:   int(item["watchers_count"].(float64)),
			ForksCount:      int(item["forks_count"].(float64)),
			OpenIssuesCount: int(item["open_issues_count"].(float64)),
			CreatedAt:       ct,
			UpdatedAt:       ut,
			PushedAt:        pt,
		}
		grs = append(grs, gr)
	}
	gitrepos, languages, errmsg = dbcommon.SearchGitRepos(grs)
	return gitrepos, languages, errmsg
}

func listGitRepos(c *gin.Context) {
	language := c.DefaultPostForm("language", "")
	pageStr := c.DefaultPostForm("page", "1")
	perPageStr := c.DefaultPostForm("per_page", "10")

	page, err := strconv.Atoi(pageStr)
	if err != nil {
		page = 1
	}
	perPage, err := strconv.Atoi(perPageStr)
	if err != nil {
		perPage = 10
	}
	if page < 1 {
		page = 1
	}
	if perPage < 1 {
		perPage = 10
	}

	errmsg := ""
	errorRet := 1
	msg := ""
	user := dbcommon.User{}
	gitrepos := make([]dbcommon.GitRepo, 0)
	languages := make([]dbcommon.GitLanguage, 0)

	userToken := c.Request.Header.Get("x-user-token")
	httpStatus := http.StatusForbidden

	ut := common.VerifyTokenString(userToken, common.GlobalConfig.Jwt.Secret)
	if ut.Uid == 0 {
		errmsg = "user not login yet"
	} else {
		gitrepos, languages, errmsg = dbcommon.ListGitRepos(language, page, perPage)
	}

	if errmsg == "" {
		msg = "list gitrepos succeed"
		errorRet = 0
		httpStatus = http.StatusOK
		userToken, _ = common.CreateTokenString(user.Username, user.Uid, common.GlobalConfig.Jwt.Secret, 15*60)
	} else {
		msg = errmsg
		userToken = ""
	}
	data := map[string]interface{}{
		"error":     errorRet,
		"msg":       msg,
		"languages": languages,
		"gitrepos":  gitrepos,
	}
	c.Header("x-user-token", userToken)
	c.JSON(httpStatus, data)
}

func searchGitRepos(c *gin.Context) {
	topics := c.DefaultPostForm("topics", "")
	pageStr := c.DefaultPostForm("page", "1")
	perPageStr := c.DefaultPostForm("per_page", "10")

	page, err := strconv.Atoi(pageStr)
	if err != nil {
		page = 1
	}
	perPage, err := strconv.Atoi(perPageStr)
	if err != nil {
		perPage = 10
	}
	if page < 1 {
		page = 1
	}
	if perPage < 1 {
		perPage = 10
	}

	errmsg := ""
	errorRet := 1
	msg := ""
	user := dbcommon.User{}
	gitrepos := make([]dbcommon.GitRepo, 0)
	languages := make([]dbcommon.GitLanguage, 0)

	userToken := c.Request.Header.Get("x-user-token")
	httpStatus := http.StatusForbidden

	if topics == "" {
		errmsg = "please input your topics"
	} else {
		ut := common.VerifyTokenString(userToken, common.GlobalConfig.Jwt.Secret)
		if ut.Uid == 0 {
			errmsg = "user not login yet"
		} else {
			gitrepos, languages, errmsg = requestSearchGitRepos(topics, perPage, page)
		}

		if errmsg == "" {
			msg = "search gitrepos succeed"
			errorRet = 0
			httpStatus = http.StatusOK
			userToken, _ = common.CreateTokenString(user.Username, user.Uid, common.GlobalConfig.Jwt.Secret, 15*60)
		} else {
			msg = errmsg
			userToken = ""
		}
	}

	data := map[string]interface{}{
		"error":     errorRet,
		"msg":       msg,
		"languages": languages,
		"gitrepos":  gitrepos,
	}
	c.Header("x-user-token", userToken)
	c.JSON(httpStatus, data)
}

func getGitRepo(c *gin.Context) {
	gidStr := c.Params.ByName("gid")

	errmsg := ""
	errorRet := 1
	msg := ""
	user := dbcommon.User{}
	gitrepo := dbcommon.GitRepo{}
	reviews := make([]interface{}, 0)

	userToken := c.Request.Header.Get("x-user-token")
	httpStatus := http.StatusForbidden

	gid, err := strconv.Atoi(gidStr)
	if err != nil {
		errmsg = "gitrepo id incorrect"
	} else {
		ut := common.VerifyTokenString(userToken, common.GlobalConfig.Jwt.Secret)
		if ut.Uid == 0 {
			errmsg = "user not login yet"
		} else {
			gitrepo, errmsg = dbcommon.GetGitRepo(gid)
		}

		if errmsg == "" {
			headers := map[string]string{
				"x-user-token": userToken,
			}
			bs, err := queryContent(fmt.Sprintf("http://%v:%v/reviews/%v", common.GlobalConfig.Reviews.Host, common.GlobalConfig.Reviews.Port, gid), headers)
			if err != nil {
				errmsg = "query reviews service error"
			} else {
				var mapReviews map[string]interface{}
				err = json.Unmarshal(bs, &mapReviews)
				if err != nil {
					errmsg = "reviews service parse error"
				} else {
					if mapReviews["error"] == 1 {
						errmsg = mapReviews["msg"].(string)
					} else {
						reviews = mapReviews["reviews"].([]interface{})
						msg = "get gitrepo reviews succeed"
						errorRet = 0
						httpStatus = http.StatusOK
						userToken, _ = common.CreateTokenString(user.Username, user.Uid, common.GlobalConfig.Jwt.Secret, 15*60)
					}
				}
			}
		} else {
			msg = errmsg
			userToken = ""
		}
	}

	data := map[string]interface{}{
		"error":   errorRet,
		"msg":     msg,
		"gitrepo": gitrepo,
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

	routerGitRepos := router.Group("/gitrepos")
	{
		routerGitRepos.PUT("/", listGitRepos)
		routerGitRepos.POST("/", searchGitRepos)
		routerGitRepos.GET("/:gid", getGitRepo)
	}
	router.Run(fmt.Sprintf(":%v", common.GlobalConfig.GitRepos.Port))
}
