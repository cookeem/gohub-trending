package main

import (
	"encoding/json"
	"fmt"
	"gohub-trending/dbcommon"
	"io/ioutil"
	"net/http"
	"strings"
	"time"
)

func requestContent(url string) (bytearr []byte, err error) {
	resp, err := http.Get(url)
	if err == nil {
		bytearr, err = ioutil.ReadAll(resp.Body)
	}
	defer resp.Body.Close()
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

func main() {
	dbcommon.CreateTables()
	q := map[string]string{
		"per_page": "10",
		"page":     "1",
		"q":        "topic:wechat+stars:>=10",
	}
	url := createRequestURL(q)
	fmt.Println(url)
	bodyBytes, err := requestContent(url)
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
	dbcommon.SearchGitRepos(grs)
	fmt.Println("batch insert github records succeed")

	user, errmsg := dbcommon.CreateUser("cookeem", "password")
	fmt.Println(user, errmsg)

	uid, errmsg := dbcommon.LoginUser("cookeem", "password1")
	fmt.Println(uid, errmsg)

	user2, errmsg := dbcommon.GetUser(2)
	fmt.Println(user2, errmsg)

	errmsg = dbcommon.UpdateUser(2, "passwordx")
	fmt.Println(errmsg)
}
