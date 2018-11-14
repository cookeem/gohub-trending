package common

type User struct {
	Uid        int
	Username   string
	Password   string
	Createtime int
}

type Review struct {
	Rid        int
	Nid        int
	Uid        int
	Content    string
	Createtime int
}

type News struct {
	Nid        int
	Title      string
	Abstract   string
	Createtime int
}
