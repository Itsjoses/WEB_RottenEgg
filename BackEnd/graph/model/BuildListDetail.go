package model

// type BuildListDetail struct {
// 	// ID       *BuildList `json:"id"`
// 	BuildID string
// 	// Product  *Product `json:"Product"`
// 	ProductId string
// 	Quantity  int `json:"Quantity"`
// }

type BuildListDetail struct {
	// BuildList *BuildList `json:"BuildList"`
	// Product   *Product   `json:"Product"`
	BuildListId string
	ProductId   string
	Quantity    int `json:"Quantity"`
}
