FROM demo-03.local/demo-repo/alpine:latest
MAINTAINER cookeem cookeem@qq.com
# 让alpine支持运行golang应用
RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2
RUN mkdir -p /gohub-trending
COPY gitrepo /gohub-trending/
WORKDIR /gohub-trending
# 让container支持github的证书
RUN apk update \
        && apk upgrade \
        && apk add --no-cache \
        ca-certificates \
        && update-ca-certificates 2>/dev/null || true
CMD ./gitrepo
