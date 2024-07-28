package main

import (
	"embed"
	"html/template"
	"io/fs"
	"strings"
)

//go:embed views/layouts/*.html views/partials/*.html views/pages/*.html
var templateFiles embed.FS

func loadTemplates() (map[string]*template.Template, error) {
	templates := make(map[string]*template.Template)

	fs.WalkDir(templateFiles, ".", func(path string, d fs.DirEntry, err error) error {
		if d.IsDir() {
			return nil
		}

		if !strings.Contains(path, "views/pages") {
			return nil
		}

		template, err := template.ParseFS(templateFiles, path, "views/layouts/*.html", "views/partials/*.html")
		if err != nil {
			return err
		}

		templates[d.Name()] = template

		return nil
	})

	return templates, nil
}