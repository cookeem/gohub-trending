# golang github trending demo app

> golang github trending demo app


## 服务架构

```
frontend -> backend -> gitrepo-svc (search) -> github.com-> db
                    -> review-svc(create/delete/list) -> db
                    -> user-svc(create/get/update/login/logout)
                    -> gitrepo-svc (get/list) -> db
```

## 安装依赖

```bash
go get -u -v github.com/jinzhu/gorm
go get -u -v github.com/jinzhu/gorm/dialects/mysql
go get -u -v gopkg.in/yaml.v2
go get -u -v github.com/gin-gonic/gin
go get -u -v github.com/dgrijalva/jwt-go
go get -u -v github.com/gin-contrib/cors
```

## 运行服务

```bash
go build backend-svc/backend.go && ./backend
go build user-svc/user.go && ./user
go build gitrepo-svc/gitrepo.go && ./gitrepo
go build review-svc/review.go && ./review

cd frontend-svc && npm run start
```

## 接口说明

- 外部`github.com`的restfulAPI

  - `github.com`搜索开源项目清单的接口参见文档： https://developer.github.com/v3/search/#search-repositories

  ```bash
  https://api.github.com/search/repositories?q=kubernetes&sort=stars&order=desc
  ```

- `user-svc`接口设计

  - 用户注册

    > `method`: POST

    > `path`: /users/

    > `request params`: username, password, repassword（重复输入新密码）

    > `request header`: N/A

    > `response header`: x-user-token（返回用户的登录jwt）

    > `response body`: error=0表示成功，否则就是失败

    ```json
    {
      "error": 0,
      "msg": "create user succeed"
    }
    ```

  - 用户登录

    > `method`: POST

    > `path`: /users/login

    > `request params`: username, password

    > `request header`: N/A

    > `response header`: x-user-token（返回用户的登录jwt）

    > `response body`: error=0表示成功，否则就是失败

    ```json
    {
      "error": 0,
      "msg": "login succeed"
    }
    ```

  - 用户注销

    > `method`: POST

    > `path`: /users/logout

    > `request params`: N/A

    > `request header`: x-user-token（用户的登录jwt）

    > `response header`: N/A

    > `response body`: error=0表示成功，否则就是失败

    ```json

    {
      "error": 0,
      "msg": "logout succeed"
    }
    ```

  - 修改用户信息时获取用户信息

    > `method`: GET

    > `path`: /users/

    > `request params`: N/A

    > `request header`: x-user-token（用户的登录jwt）

    > `response header`: x-user-token（用户的登录jwt）

    > `response body`: error=0表示成功，否则就是失败

    ```json
    {
      "error": 0,
      "msg": "get login user info succeed"
    }
    ```

  - 修改用户密码

    > `method`: PUT

    > `path`: /users/

    > `request params`: oldpassword, password, repassword

    > `request header`: x-user-token（用户的登录jwt）

    > `response header`: x-user-token（用户的登录jwt）

    > `response body`: error=0表示成功，否则就是失败

    ```json
    {
      "error": 0,
      "msg": "update password succeed"
    }
    ```

- `review-svc`接口设计

  - 发表gitrepo点评

    > `method`: POST

    > `path`: /reviews/

    > `request params`: gid（gitrepo id）, content（评论内容）

    > `request header`: x-user-token（用户的登录jwt）

    > `response header`: x-user-token（用户的登录jwt）

    > `response body`: error=0表示成功，否则就是失败

    ```json
    {
      "error": 0,
      "msg": "new review succeed",
      "rid": 4
    }
    ```

  - 删除gitrepo点评

    > `method`: DELETE

    > `path`: /reviews/

    > `request params`: rid（评论id）

    > `request header`: x-user-token（用户的登录jwt）

    > `response header`: x-user-token（用户的登录jwt）

    > `response body`: error=0表示成功，否则就是失败

    ```json
    {
      "error": 0,
      "msg": "delete review succeed"
    }
    ```

  - 获取gitrepo的点评列表

    > `method`: GET

    > `path`: /reviews/:gid

    > `request params`: gid（gitrepo id）

    > `request header`: x-user-token（用户的登录jwt）

    > `response header`: x-user-token（用户的登录jwt）

    > `response body`: error=0表示成功，否则就是失败

    ```json
    {
      "error": 0,
      "msg": "list reviews succeed",
      "reviews": [
        {
          "content": "hello world",
          "created_at": "2019-01-24T07:15:00Z",
          "gid": 51,
          "rid": 1,
          "uid": 1,
          "username": "cookeem"
        }
      ]
    }
    ```

- `gitrepo-svc`接口设计

  - 获取gitrepo列表

    > `method`: PUT

    > `path`: /gitrepos/

    > `request params`: language, page（第几页）, per_page（每页项目数量）

    > `request header`: x-user-token（用户的登录jwt）

    > `response header`: x-user-token（用户的登录jwt）

    > `response body`: error=0表示成功，否则就是失败

    ```json
    {
      "error": 0,
      "gitrepos": [
        {
          "gid": 51,
          "full_name": "moby/moby",
          "description": "Moby Project - a collaborative project for the container ecosystem to assemble container-based systems",
          "language": "Go",
          "html_url": "https://github.com/moby/moby",
          "stargazers_count": 51968,
          "watchers_count": 51968,
          "forks_count": 15071,
          "open_issues_count": 3576,
          "reviews_count": 1,
          "created_at": "2013-01-18T18:10:57Z",
          "updated_at": "2019-01-25T01:24:13Z",
          "pushed_at": "2019-01-24T02:34:41Z"
        }
      ],
      "languages": [
        {
          "language": "Assembly",
          "repos_count": 1
        }
      ],
      "msg": "list gitrepos succeed"
    }
    ```

  - 搜索gitrepo列表

    > `method`: POST

    > `path`: /gitrepos/

    > `request params`: topics（关键字）, page（第几页）, per_page（每页项目数量）

    > `request header`: x-user-token（用户的登录jwt）

    > `response header`: x-user-token（用户的登录jwt）

    > `response body`: error=0表示成功，否则就是失败

    ```json
    {
      "error": 0,
      "gitrepos": [
        {
          "gid": 106,
          "full_name": "goharbor/harbor",
          "description": "An open source trusted cloudnative registry project that stores, signs, andscans content.",
          "language": "Go",
          "html_url": "https://github.com/goharbor/harbor",
          "stargazers_count": 6741,
          "watchers_count": 6741,
          "forks_count": 1867,
          "open_issues_count": 441,
          "reviews_count": 0,
          "created_at": "2016-01-28T21:10:28Z",
          "updated_at": "2019-01-24T23:34:12Z",
          "pushed_at": "2019-01-24T16:42:29Z"
        }
      ],
      "languages": [
        {
          "language": "Assembly",
          "repos_count": 1
        }
      ],
      "msg": "search gitrepos succeed"
    }
    ```

  - 获取gitrepo详情

    > `method`: GET

    > `path`: /gitrepos/:gid

    > `request params`: gid

    > `request header`: x-user-token（用户的登录jwt）

    > `response header`: x-user-token（用户的登录jwt）

    > `response body`: error=0表示成功，否则就是失败

    ```json
    {
      "error": 0,
      "gitrepo": {
        "gid": 51,
        "full_name": "moby/moby",
        "description": "Moby Project - a collaborative project for the container ecosystem to assemble container-based systems",
        "language": "Go",
        "html_url": "https://github.com/moby/moby",
        "stargazers_count": 51968,
        "watchers_count": 51968,
        "forks_count": 15071,
        "open_issues_count": 3576,
        "reviews_count": 1,
        "created_at": "2013-01-18T18:10:57Z",
        "updated_at": "2019-01-25T01:24:13Z",
        "pushed_at": "2019-01-24T02:34:41Z"
      },
      "msg": "get gitrepo reviews succeed",
      "reviews": [
        {
          "content": "hello world",
          "created_at": "2019-01-24T07:15:00Z",
          "gid": 51,
          "rid": 1,
          "uid": 1,
          "username": "cookeem"
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
