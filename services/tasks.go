package services

import(
	"time"
)

type Task struct {
	id int64
	title string
	desc string
	duration string
	category string
	created_at time.Time
}

func (t *Task) Validate() []error {
	// TODO: handle validation of fields

	return nil
}

func InsertTasks([]Task) {
	
}