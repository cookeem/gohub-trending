# go-headlines

> golang github trending demo app


```
frontend -> backend -> gitrepo-svc (search) -> github.com-> db
                    -> review-svc(create/list/delete) -> db
                    -> user-svc(create/get/update/login/logout)
                    -> gitrepo-svc (get/list) -> db
```

### user-svc

``` create: 注册用户
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
```

``` login: 用户登录
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
```

``` logout: 用户注销
request:
request: header x-user-token
======
response:
header: x-user-token // 清除x-user-token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
}
```

``` get: 修改用户信息时获取用户信息
request: header x-user-token
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
}
```

``` update: 更新用户信息
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

``` create: 发表gitrepo点评
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
```

``` list: 获取gitrepo的点评列表
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
```

``` delete: 删除点评
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

### gitrepo-svc

``` list: 获取gitrepo列表
request: header x-user-token
language, page, per_page
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
    languages: [
        {
            language: "Java",
            repos_count: 1
        }
    ],
    gitrepos: [
        {
            gid: 1,
            full_name: "cookeem/kubeadm-ha",
            description: "",
            language: "",
            stargazers_count: 1,
            reviews_count: 1
        }
    ]
}
```

``` get: 获取gitrepo详情
request: header x-user-token
gid
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
    gitrepos: {
        gid: 1,
        full_name: "",
        description: "",
        language: "",
        html_url: "",
        stargazers_count: 0,
        watchers_count: 0,
        forks_count: 0,
        open_issues_count: 0,
        reviews_count: 0,
        created_at: "",
        updated_at: "",
        pushed_at: ""
    },
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

``` search: 搜索gitrepo列表，从github拉取信息
request: header x-user-token
language, page, per_page, topic
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
    languages: [
        {
            language: "Java",
            repos_count: 1
        }
    ],
    gitrepos: [
        {
            gid: 1,
            full_name: "cookeem/kubeadm-ha",
            description: "",
            language: "",
            stargazers_count: 1,
            reviews_count: 0
        }
    ]
}
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