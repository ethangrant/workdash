package main

import (
	"fmt"
	"net/http"

	"github.com/ethangrant/workdash/handlers"
)

func main() {
	dbConn := dbInit()
	staticFiles, _ := loadAssets()
	templateFiles, err := loadTemplates()
	if err != nil {
		fmt.Println("Failed to load templates: ", err.Error())
		return
	}

	http.HandleFunc("/", handlers.Home(templateFiles, dbConn))
	http.HandleFunc("/dashboard", handlers.Home(templateFiles, dbConn))

	http.HandleFunc("/postTasks", handlers.PostTasks(templateFiles, dbConn))

	fs := http.FileServer(http.FS(staticFiles))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.ListenAndServe(":8090", nil)
}
