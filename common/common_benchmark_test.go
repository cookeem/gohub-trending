package common

import (
	"testing"
)

var secretStr = "iZXhwIjoxNTQyODY2ODA0LCJpYXQiOjE1NDI4NjU5MDQsImlzcyI6Imdp"
var expSecs = 15 * 60
var username = "cookeem"
var uid = 1

var tokenStr, err = CreateTokenString(username, uid, secretStr, expSecs)

// 测试CreateTokenString函数的性能
func BenchmarkCreateTokenString(b *testing.B) {
	for i := 0; i < b.N; i++ {
		CreateTokenString(username, uid, secretStr, expSecs)
	}
}

// 测试VerifyTokenString函数的性能
func BenchmarkVerifyTokenString(b *testing.B) {
	for i := 0; i < b.N; i++ {
		VerifyTokenString(tokenStr, secretStr)
	}
}
