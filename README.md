# go-headlines

> golang github trending demo app


```
frontend -> backend -> gohubtrend-svc (search) -> github.com-> db
                    -> review-svc(create/list/delete) -> db
                    -> user-svc(create/get/update/login/logout)
                    -> gohubtrend-svc (get/list) -> db
```

### user-svc

```
create: 注册用户
###############
request:
username, password
======
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
    uid: 1,         // 失败返回0
}

login: 用户登录
###############
request:
username, password
======
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
    uid: 1,         // 失败返回0
}

logout: 用户注销
###############
request:
request: header x-user-token
======
response:
header: x-user-token // 清除x-user-token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
}

get: 修改用户信息时获取用户信息
###############
request: header x-user-token
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
}

update: 更新用户信息
###############
request: header x-user-token
password_current, password_new, password_repeat
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
}

```

### review-svc
```
create: 点评github-repo
###############
request: header x-user-token
gid, content
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
    rid: 0,         // 失败返回0
}

list: 获取github-repo的点评列表
###############
request: header x-user-token
gid
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
    reviews: [
        {
            rid: 1,
            gid: 1,
            uid: 1,
            username: "cookeem",
            content: "content",
            created_at: "2012-01-10 12:12:12",
        }
    ]
}

delete: 删除点评
###############
request: header x-user-token
gid
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
}
```

### gohubtrend-svc
-> gohubtrend-svc (get/list) -> db
```
list: 获取github-repo列表
###############
request: header x-user-token
language, page
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
    reviews: [
        {
            rid: 1,
            gid: 1,
            uid: 1,
            username: "cookeem",
            content: "content",
            created_at: "2012-01-10 12:12:12",
        }
    ]
}
```

### users table

```
uid: 用户id
username: 用户名
password: 密码
created_at: 创建时间
updated_at: 更新时间
```

### reviews table

```
rid: 评论id
nid: 新闻id
uid: 用户id
content: 评论内容
created_at: 创建时间
updated_at: 更新时间
```

### github_trendings table

```
gid: github trending id
full_name: 全名
description: 描述
language: 语言
html_url: url
stargazers_count: 星星数
watchers_count: watcher数
forks_count: fork数
open_issues_count: 打开的issue数
created_at: 创建时间
updated_at: 更新时间
pushed_at: 推送时间
```

```
curl -H "Accept: application/vnd.github.mercy-preview+json" \
'https://api.github.com/search/repositories?per_page=10&page=1&sort=stars&order=desc&q=topic:wechat+stars:>=10+pushed:>2018-05-16' | jq ".items[] | {full_name, description, language, stargazers_count, watchers_count, forks_count, open_issues_count, created_at, updated_at, pushed_at, html_url}"
```

```
docker-compose stop && docker-compose rm -f && docker-compose up -d
docker exec -ti mysql bash

mysql -uroot -p

use github;
show tables;

explain github_trendings;

drop table users;
drop table reviews;
drop table github_trendings;

```