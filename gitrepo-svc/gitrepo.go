package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"gohub-trending/dbcommon"
	"io/ioutil"
	"net/http"
	"strconv"
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

func requestSearchGitRepos(topics string, perPage int, page int) {
	var ts []string
	for _, s := range strings.Split(topics, " ") {
		s = strings.Trim(s, " ")
		if s != "" {
			ts = append(ts, "topic:"+s)
		}
	}
	q := strings.Join(ts, "+")
	fmt.Println(q)
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
	fmt.Println(prettyJson.String())
}

func main() {
	dbcommon.CreateTables()

	requestSearchGitRepos("tensorflow", 20, 1)
	// user, errmsg := dbcommon.CreateUser("cookeem", "password")
	// fmt.Println(user, errmsg)

	// uid, errmsg := dbcommon.LoginUser("cookeem", "password1")
	// fmt.Println(uid, errmsg)

	// user2, errmsg := dbcommon.GetUser(2)
	// fmt.Println(user2, errmsg)

	// errmsg = dbcommon.UpdateUser(2, "passwordx")
	// fmt.Println(errmsg)

	// rid, errmsg := dbcommon.CreateReview(1, 1, "orz ###@@@# ")
	// fmt.Println(rid, errmsg)

	// errmsg = dbcommon.DeleteReview(1)
	// fmt.Println(errmsg)

	// rs, errmsg := dbcommon.ListReviews(1)
	// fmt.Println(rs, errmsg)

	// grs, errmsg := dbcommon.ListGitRepos("", 2, 2)
	// fmt.Println(grs, errmsg)

	// gr, errmsg := dbcommon.GetGitRepo(2)
	// fmt.Println(gr, errmsg)
}
