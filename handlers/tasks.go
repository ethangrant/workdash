package handlers

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"

	"github.com/ethangrant/workdash/services"
)

func PostTasks(templates map[string]*template.Template, dbConn *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		var tasks []services.TaskPost

		err := json.NewDecoder(req.Body).Decode(&tasks)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}

		taskService := services.NewTaskService(dbConn)
		err = taskService.InsertTasks(tasks)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Tasks have been saved!")
	}
}
