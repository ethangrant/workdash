package main

import (
	"net/http"

	"github.com/ethangrant/workdash/api"
)

func main() {
	dbConn := dbInit()
	http.HandleFunc("POST /api/V1/tasks/", api.PostTasks(dbConn))
	http.ListenAndServe(":8090", nil)
}
