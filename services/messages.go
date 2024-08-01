package services

type Message struct {
	Status string `json:"status"`
	Text   string `json:"text"`
}

const (
	SuccessStatus = "Success"
	ErrorStatus   = "Error"
)

func NewSuccessMessage(message string) *Message {
	return &Message{Status: SuccessStatus, Text: message}
}

func NewErrorMessage(message string) *Message {
	return &Message{Status: ErrorStatus, Text: message}
}
