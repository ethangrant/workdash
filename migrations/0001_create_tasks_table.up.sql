CREATE TABLE IF NOT EXISTS tasks (
			id TEXT NOT NULL PRIMARY KEY,
			title TEXT NOT NULL,
			description TEXT,
			duration INTEGER,
            category TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)