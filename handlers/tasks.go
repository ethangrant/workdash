package handlers

import (
	"html/template"
	"net/http"
)

func PostTasks(templates map[string]*template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		// handle post data
	}
}