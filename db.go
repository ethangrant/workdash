package main

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/sqlite3"

	_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/golang-migrate/migrate/v4/source/github"
	_ "github.com/mattn/go-sqlite3"
)

const dbFile string = "/tmp/workdash.db"

func dbInit() *sql.DB {
	createSqliteFile()
	conn := connect();
	runMigrations(conn);

	return conn
}

func createSqliteFile() {
	_, err := os.Stat(dbFile)
	if err != nil {
		file, err := os.Create(dbFile)
		if err != nil {
			fmt.Println("Failed to create sqlite db: ", err.Error())
			os.Exit(1)
		}
		file.Close()
	}
}

func connect() (*sql.DB) {
	c, err := sql.Open("sqlite3", dbFile)
	if err != nil {
		fmt.Println("Failed to connect to database: ", err.Error())
		os.Exit(1)
	}

	return c
}

func runMigrations(conn *sql.DB) {
	driver, err := sqlite3.WithInstance(conn, &sqlite3.Config{})
	if err != nil {
		fmt.Println("Migrations failed: " , err.Error())
		os.Exit(1)
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://migrations",
		"sqlite3",
		driver,
	)

	if err != nil {
		fmt.Println("Migrations failed: " , err.Error())
		os.Exit(1)
	}

	m.Up()
}