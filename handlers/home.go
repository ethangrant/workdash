package handlers

import (
	"fmt"
	"html/template"
	"net/http"
)

func Home(templates map[string]*template.Template) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		t, ok := templates["home.html"]
		if !ok {
			fmt.Println("home.html template not found")
			return
		}

		err := t.Execute(w, nil)
		if err != nil {
			http.Error(w, "Error executing template: "+err.Error(), http.StatusInternalServerError)
		}
	}
}