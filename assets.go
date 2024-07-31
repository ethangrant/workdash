package main

import (
	"embed"
	"io/fs"
)

//go:embed all:static
var assets embed.FS

func loadAssets() (fs.FS, error) {
	return fs.Sub(assets, "static")
}
