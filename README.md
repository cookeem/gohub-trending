# go-headlines

> golang github trending demo app


```
frontend -> backend -> gohubtrend-svc (search) -> github.com-> db
                    -> review-svc(create/get/list/delete) -> db
                    -> user-svc(create/get/update/login/logout)
                    -> gohubtrend-svc (get/list) -> db
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