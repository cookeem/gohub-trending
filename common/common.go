package common

import (
	"errors"
	"fmt"
	"io/ioutil"
	"strings"

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

var ConnStr, _ = GetDBConn()
