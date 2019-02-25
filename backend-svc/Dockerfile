FROM alpine:latest
MAINTAINER cookeem cookeem@qq.com
# 让alpine支持运行golang应用
RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2
RUN mkdir -p /gohub-trending
COPY dist/ /gohub-trending/frontend-svc/dist/
COPY backend /gohub-trending/
WORKDIR /gohub-trending
CMD ./backend
