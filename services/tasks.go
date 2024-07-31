package services

import (
	"database/sql"
	"fmt"
	"strings"
	"time"
)

type TaskPost struct {
	Id          string    `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Duration    string    `json:"duration"`
	Category    string    `json:"category"`
	Created_at  time.Time `json:"created_at"`
}

type TaskService struct {
	dbConn *sql.DB
}

func NewTaskService(dbConn *sql.DB) *TaskService {
	return &TaskService{dbConn: dbConn}
}

// func (t *Task) Validate() []error {
// TODO: handle validation of fields

// return nil
// }

func (s *TaskService) InsertTasks(tasks []TaskPost) error {
	var valuesStrings []string
	var valueArgs []any

	for _, task := range tasks {
		valuesStrings = append(valuesStrings, "(?, ?, ?, ?, ?)")
		valueArgs = append(valueArgs, task.Id)
		valueArgs = append(valueArgs, task.Title)
		valueArgs = append(valueArgs, task.Description)
		valueArgs = append(valueArgs, task.Duration)
		valueArgs = append(valueArgs, task.Category)
	}

	stmt := fmt.Sprintf("INSERT OR REPLACE INTO tasks (id, title, description, duration, category) VALUES %s", strings.Join(valuesStrings, ","))
	_, err := s.dbConn.Exec(stmt, valueArgs...)
	if err != nil {
		return err
	}

	return nil
}
