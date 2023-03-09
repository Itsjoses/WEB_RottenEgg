package model

type TransactionHeader struct {
	ID     string `json:"id"`
	UserId string
	// User              *User                `json:"User"`
	Status            string               `json:"Status"`
	TransactionDetail []*TransactionDetail `json:"TransactionDetail"`
}
