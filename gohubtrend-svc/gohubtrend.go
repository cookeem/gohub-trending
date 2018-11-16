package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"gohub-trending/dbcommon"
	"io/ioutil"
	"net/http"
	"strings"
)

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

	var outBuffers bytes.Buffer
	err = json.Indent(&outBuffers, bodyBytes, "", "  ")
	fmt.Println(outBuffers.String())
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

func requestContent(url string) (bytearr []byte, err error) {
	resp, err := http.Get(url)
	if err == nil {
		bytearr, err = ioutil.ReadAll(resp.Body)
	}
	defer resp.Body.Close()
	return bytearr, err
}
