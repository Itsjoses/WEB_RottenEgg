package model

type BuildList struct {
	ID string `json:"id"`
	// User            *User              `json:"User"`
	UserId    string
	BuildName string `json:"BuildName"`
	// BuildListDetail []*BuildListDetail `json:"BuildListDetail"`
}
