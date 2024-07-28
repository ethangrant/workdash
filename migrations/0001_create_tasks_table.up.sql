CREATE TABLE IF NOT EXISTS tasks (
			id INTEGER NOT NULL PRIMARY KEY,
			title TEXT NOT NULL,
			desc TEXT,
			duration INTEGER,
            category TEXT
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)