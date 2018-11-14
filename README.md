# go-headlines

> golang toutiao.com headlines demo

```
frontend -> backend -> user-svc(create/get/update/login/logout) -> db
                    -> review-svc(create/get/list/delete) -> db
                    -> news-svc (sync) -> toutiao.com
                    -> news-svc (get/list) -> db
```

### user table

```
uid: 用户id
username: 用户名
password: 密码
createtime: 创建时间戳
```

### review table

```
rid: 评论id
nid: 新闻id
uid: 用户id
content: 评论内容
createtime: 创建时间戳
```

### news table

```
nid: 新闻id（来源于toutiao）
title: 标题
abstract: 内容缩写
createtime: 创建时间戳
```
