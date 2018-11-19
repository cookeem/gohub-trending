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
	yaml "gopkg.in/yaml.v2"
)

type AppConfig struct {
	Mysql struct {
		Host     string   `yaml:"host"`
		Port     string   `yaml:"port"`
		Database string   `yaml:"database"`
		User     string   `yaml:"user"`
		Password string   `yaml:"password"`
		Params   []string `yaml:"params"`
	} `yaml:"mysql"`
	Jwt struct {
		Secret string `yaml:"secret"`
	} `yaml:"jwt"`
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
	claims.Username = "cookeem"
	claims.Uid = 1
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

var ConnStr, _ = GetDBConn()

var SecretStr, _ = GetJwtSecret()
