package model

type TransactionDetail struct {
	TransactionHeaderId string
	ProductId           string
	// TransactionHeader *TransactionHeader `json:"TransactionHeader"`
	// Product           *Product           `json:"Product"`
	Quantity int `json:"quantity"`
}
