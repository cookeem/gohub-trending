package main

import (
	"gohub-trending/common"
)

func main() {
	connStr, err := common.GetDBConn()
	if err != nil {
		println(err.Error)
	} else {
		println(connStr)
	}
}
