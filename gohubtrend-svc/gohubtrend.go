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
		"per_page": "5",
		"q":        "topic:wechat+stars:>=10+pushed:>2018-05-16",
	}
	url := createRequestURL(q)
	fmt.Println(url)
	bodyBytes, err := requestContent(url)
	if err != nil {
		return
	}

	var f map[string]interface{}
	err = json.Unmarshal(bodyBytes, &f)
	var gts []dbcommon.GithubTrending

	items := f["items"].([]interface{})
	for _, v := range items {
		item := v.(map[string]interface{})
		timeformat := "2006-01-02T15:04:05Z"
		ct, err := time.Parse(timeformat, item["created_at"].(string))
		if err != nil {
			ct = time.Now()
		}
		ut, err := time.Parse(timeformat, item["updated_at"].(string))
		if err != nil {
			ut = time.Now()
		}
		pt, err := time.Parse(timeformat, item["pushed_at"].(string))
		if err != nil {
			pt = time.Now()
		}
		gt := dbcommon.GithubTrending{
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
		gts = append(gts, gt)
	}
	dbcommon.BatchInsertGithub(gts)
	fmt.Println("batch insert github records succeed")
}
