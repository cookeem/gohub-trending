package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"gohub-trending/common"
	"gohub-trending/dbcommon"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func queryContent(url string) (bytearr []byte, err error) {
	timeout := time.Duration(10 * time.Second)
	client := http.Client{
		Timeout: timeout,
	}
	resp, err := client.Get(url)
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

func requestSearchGitRepos(topics string, perPage int, page int) {
	var ts []string
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
	bodyBytes, err := queryContent(url)
	if err != nil {
		return
	}

	var m map[string]interface{}
	err = json.Unmarshal(bodyBytes, &m)
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
	gitrepos, languages, errmsg := dbcommon.SearchGitRepos(grs)
	var mapJson map[string]interface{}
	if errmsg == "" {
		gitreposJson, _ := json.Marshal(gitrepos)
		languagesJson, _ := json.Marshal(languages)
		var a []interface{}
		var arrGitRepos []interface{}
		var arrLanguages []interface{}
		if json.Unmarshal(gitreposJson, &a) == nil {
			for _, v := range a {
				v2 := v.(map[string]interface{})
				delete(v2, "html_url")
				delete(v2, "watchers_count")
				delete(v2, "forks_count")
				delete(v2, "open_issues_count")
				delete(v2, "created_at")
				delete(v2, "updated_at")
				delete(v2, "pushed_at")
				arrGitRepos = append(arrGitRepos, v2)
			}
		}
		if json.Unmarshal(languagesJson, &a) == nil {
			for _, v := range a {
				v2 := v.(map[string]interface{})
				arrLanguages = append(arrLanguages, v2)
			}
		}
		mo := map[string]interface{}{
			"error":     0,
			"msg":       "",
			"languages": arrGitRepos,
			"gitrepos":  arrLanguages,
		}
		mapJson = mo
	} else {
		mo := map[string]interface{}{
			"error":     1,
			"msg":       errmsg,
			"languages": []interface{}{},
			"gitrepos":  []interface{}{},
		}
		mapJson = mo
	}
	byteJson, _ := json.Marshal(mapJson)
	var prettyJson bytes.Buffer
	json.Indent(&prettyJson, byteJson, "", "  ")
	log.Println(prettyJson.String())
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

	ut := common.VerifyTokenString(userToken, common.SecretStr)
	if ut.Uid == 0 {
		errmsg = "user not login yet"
	} else {
		gitrepos, languages, errmsg = dbcommon.ListGitRepos(language, page, perPage)
	}

	if errmsg == "" {
		msg = "list gitrepos succeed"
		errorRet = 0
		httpStatus = http.StatusOK
		userToken, _ = common.CreateTokenString(user.Username, user.Uid, common.SecretStr, 15*60)
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

	ut := common.VerifyTokenString(userToken, common.SecretStr)
	if ut.Uid == 0 {
		errmsg = "user not login yet"
	} else {
		gitrepos, languages, errmsg = dbcommon.ListGitRepos(language, page, perPage)
	}

	if errmsg == "" {
		msg = "list gitrepos succeed"
		errorRet = 0
		httpStatus = http.StatusOK
		userToken, _ = common.CreateTokenString(user.Username, user.Uid, common.SecretStr, 15*60)
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

func main() {
	router := gin.Default()
	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"error": 1, "msg": "404 page not found"})
	})

	routerGitRepos := router.Group("/gitrepos")
	{
		routerGitRepos.PUT("/", listGitRepos)
		routerGitRepos.POST("/", searchGitRepo)
		// routerGitRepos.GET("/:gid", getGitRepo)
	}

	router.Run(":8082")
}
