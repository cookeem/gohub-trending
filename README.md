# golang github trending demo app

> golang github trending demo app


## 服务架构

```
frontend -> backend -> gitrepo-svc (search) -> github.com-> db
                    -> review-svc(create/delete/list) -> db
                    -> user-svc(create/get/update/login/logout)
                    -> gitrepo-svc (get/list) -> db
```

## 编译说明

```
go get -u -v github.com/jinzhu/gorm
go get -u -v github.com/jinzhu/gorm/dialects/mysql
go get -u -v gopkg.in/yaml.v2
go get -u -v github.com/gin-gonic/gin
go get -u -v github.com/dgrijalva/jwt-go
go get -u -v github.com/gin-contrib/cors

go build backend-svc/backend.go && ./backend
go build user-svc/user.go && ./user
go build gitrepo-svc/gitrepo.go && ./gitrepo
go build review-svc/review.go && ./review
```

## 接口说明

### user-svc 接口说明

#### create: 注册用户 (POST /users)
```
request:
username, password, password_repeat
======
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
}
```

#### login: 用户登录 (POST /users/login)
```
request:
username, password
======
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
}
```

#### logout: 用户注销 (POST /users/logout)
```
request: header x-user-token
======
response:
header: x-user-token // 清除x-user-token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
}
```

#### get: 修改用户信息时获取用户信息 (GET /users)
```
request: header x-user-token
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
}
```

#### update: 更新用户信息 (PUT /users)
```
request: header x-user-token
password_old, password, password_repeat
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
}

```

### review-svc 接口说明

#### create: 发表gitrepo点评 (POST /reviews)
```
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

#### delete: 删除gitrepo点评 (DELETE /reviews)
```
request: header x-user-token
rid
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
}
```

#### list: 获取gitrepo的点评列表 (GET /reviews)
```
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

### gitrepo-svc 接口说明

#### list: 获取gitrepo列表 (PUT /gitrepos)
```
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

#### search: 搜索gitrepo列表，从github拉取信息 (POST /gitrepos)
```
request: header x-user-token
topics, page, per_page
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
        {
            "Gid":59,
            "WatchersCount":3,
            "description":"Ubiquiti UNMS Helm Chart. ",
            "full_name":"valentin2105/unms-chart",
            "language":"",
            "reviews_count":0,
            "stargazers_count":3}
    ]
}
```

#### get: 获取gitrepo详情 (GET /gitrepos/:gid)
```
request: header x-user-token
gid
===
response:
header: x-user-token // jwt token
{
    error: 0,       // 0: 成功，1: 失败
    msg: "返回提示"  // 返回提示
    gitrepo: {
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

## 运行命令，检查数据库

```
docker-compose stop && docker-compose rm -f && docker-compose up -d
docker exec -ti mysql bash

mysql -uroot -p

use github;
show tables;

explain git_repos;

drop table users;drop table reviews;drop table git_repos; drop table git_languages;
```
