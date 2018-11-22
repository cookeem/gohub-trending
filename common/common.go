package common

import (
	"crypto/sha1"
	"encoding/base64"
	"errors"
	"fmt"
	"io/ioutil"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	yaml "gopkg.in/yaml.v2"
)

type AppConfig struct {
	Mysql struct {
		Host     string   `yaml:"host"`
		Port     int      `yaml:"port"`
		Database string   `yaml:"database"`
		User     string   `yaml:"user"`
		Password string   `yaml:"password"`
		Params   []string `yaml:"params"`
	} `yaml:"mysql"`
	Jwt struct {
		Secret string `yaml:"secret"`
	} `yaml:"jwt"`
	Backend struct {
		Port int `yaml:"port"`
	} `yaml:"backend"`
	Users struct {
		Host string `yaml:"host"`
		Port int    `yaml:"port"`
	} `yaml:"users"`
	GitRepos struct {
		Host string `yaml:"host"`
		Port int    `yaml:"port"`
	} `yaml:"gitrepos"`
	Reviews struct {
		Host string `yaml:"host"`
		Port int    `yaml:"port"`
	} `yaml:"reviews"`
}

type UserToken struct {
	Username string `json:"username"`
	Uid      int    `json:"uid"`
	jwt.StandardClaims
}

func GetConfig() (conf AppConfig, err error) {
	bs, err := ioutil.ReadFile("config.yaml")
	if err == nil {
		err = yaml.Unmarshal(bs, &conf)
	}
	return conf, err
}

func GetDBConn() (dbstr string, err error) {
	conf, err := GetConfig()
	if err != nil || conf.Mysql.Database == "" {
		err = errors.New("read config file failed")
	} else {
		paramsStr := strings.Join(conf.Mysql.Params, "&")
		dbstr = fmt.Sprintf("%s:%s@tcp(%s:%v)/%s?%s", conf.Mysql.User, conf.Mysql.Password, conf.Mysql.Host, conf.Mysql.Port, conf.Mysql.Database, paramsStr)
	}
	return dbstr, err
}

func GetJwtSecret() (secret string, err error) {
	conf, err := GetConfig()
	if err != nil || conf.Mysql.Database == "" {
		err = errors.New("read config file failed")
	} else {
		secret = conf.Jwt.Secret
	}
	return secret, err
}

func GetSHA(strInput string) (strOutput string) {
	hasher := sha1.New()
	hasher.Write([]byte(strInput))
	strOutput = base64.URLEncoding.EncodeToString(hasher.Sum(nil))
	return strOutput
}

func CreateTokenString(username string, uid int, secretStr string, expSecs int) (string, error) {
	var claims UserToken
	claims.Username = username
	claims.Uid = uid
	claims.IssuedAt = time.Now().Unix()
	claims.ExpiresAt = time.Now().Add(time.Second * time.Duration(expSecs)).Unix()
	claims.Issuer = "gitrepo"
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secretStr))
}

func VerifyTokenString(tokenStr string, secretStr string) (claims *UserToken) {
	token, err := jwt.ParseWithClaims(tokenStr, &UserToken{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretStr), nil
	})
	if err == nil {
		claims, _ = token.Claims.(*UserToken)
	} else {
		var ut UserToken
		claims = &ut
	}
	return claims
}

func IstioHeadersForward() gin.HandlerFunc {
	return func(c *gin.Context) {
		istioHeaders := []string{
			"x-request-id",
			"x-b3-traceid",
			"x-b3-spanid",
			"x-b3-parentspanid",
			"x-b3-sampled",
			"x-b3-flags",
			"x-ot-span-context",
		}
		for _, ih := range istioHeaders {
			c.Header(ih, c.Request.Header.Get(ih))
		}
	}
}

var ConnStr, _ = GetDBConn()

var SecretStr, _ = GetJwtSecret()

var GlobalConfig, _ = GetConfig()
