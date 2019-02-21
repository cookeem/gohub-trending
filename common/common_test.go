package common

import (
	"testing"
)

type testObj struct {
	username string
	uid      int
}

func TestCreateTokenString(t *testing.T) {
	secretStr := "iZXhwIjoxNTQyODY2ODA0LCJpYXQiOjE1NDI4NjU5MDQsImlzcyI6Imdp"
	expSecs := 15 * 60
	// 测试用例清单
	testCases := []struct {
		name   string
		given  testObj
		expect testObj
	}{
		{
			name:   "english-username",
			given:  testObj{username: "cookeem", uid: 1},
			expect: testObj{username: "cookeem", uid: 1},
		},
		{
			name:   "chinese-username",
			given:  testObj{username: "小明", uid: 2},
			expect: testObj{username: "小明", uid: 2},
		},
		{
			name:   "negative-uid",
			given:  testObj{username: "haijian", uid: -1},
			expect: testObj{username: "haijian", uid: -1},
		},
	}
	//对测试用例进行遍历
	for _, tc := range testCases {
		// 测试CreateTokenString是否正常输出jwt
		token, err := CreateTokenString(tc.given.username, tc.given.uid, secretStr, expSecs)
		if err != nil {
			t.Errorf("testcase %q: expected %v, got %v", tc.name, tc.expect, err)
		} else {
			t.Logf("testcase %q: create token: %v", tc.name, token)
			// 验证CreateTokenString输出的jwt是否能够通过VerifyTokenString函数正常校验
			ut := VerifyTokenString(token, secretStr)
			if ut.Username != tc.expect.username || ut.Uid != tc.expect.uid {
				t.Errorf("testcase %q: expected %v, got %v", tc.name, tc.expect, testObj{username: ut.Username, uid: ut.Uid})
			}
		}
	}
}
